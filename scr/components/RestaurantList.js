import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { swiggy_api_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";




const RestaurantList = () => {

  const [allRestaurants, setAllRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("")
  const [copyRestaurant, setCopyRestaurant] = useState([])
  const onlineStatus = useOnlineStatus()

  const filterData = () => {
    list = list?.filter(item => item?.data?.avgRating > 4.0)
    // setList(newData)
  }

  async function getRestaurants() {
    // handle the error using try... catch
    try {
      const response = await fetch(swiggy_api_URL);
      const json = await response.json();

      // initialize checkJsonData() function to check Swiggy Restaurant data
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {

          // initialize checkData for Swiggy Restaurant data
          let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);

      // update the state variable restaurants with Swiggy API data
      setAllRestaurants(resData);
      setCopyRestaurant(resData)
      // setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRestaurants()
  }, [])
 
  if (onlineStatus === false) {
    return <h1>Looks Like you're offline!! Please Check your internet connection</h1>
  }

  return allRestaurants?.length === 0 ? <Shimmer />
    :
    (
      <>
        <div className="filter">
          <div className="search">
            <input type="text" className="search-box" value={searchText} onChange={(e) => {
              setSearchText(e.target.value)
            }} />
            <button onClick={() => {
              const filterRestaurant = copyRestaurant?.filter((res) =>
                res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
              )
              setAllRestaurants(filterRestaurant)
            }}>Search</button>
          </div>
          <button className="filter-btn" onClick={() => {
            const filteredList = list?.filter(item => item?.data?.avgRating > 4)
            setList(filteredList)

          }}>
            Top Rated Restaurant
          </button>
        </div>
        <div className="restaurant-list">
          {allRestaurants?.map((restaurant) => {
            return (
              <Link key={restaurant?.info?.id} to={`/restaurants/${restaurant?.info?.id}`}>
                <RestaurantCard  {...restaurant?.info} />
              </Link>
            )
          })}
        </div>
      </>
    );
}
export default RestaurantList