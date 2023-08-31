import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import restaurantList from "../utils/mockData";



const RestaurantList = () => {

  let [list, setList] = useState(restaurantList)

  const filterData = () => {
    list = list?.filter(item => item?.data?.avgRating > 4.0)
    // setList(newData)
  }

  console.log(list, 'LOST')
  return (
    <>
      <div className="filter">
        <button className="filter-btn" onClick={() => {
          const filteredList = list?.filter(item => item?.data?.avgRating > 4)
          setList(filteredList)

        }}>
          Top Rated Restaurant
        </button>
      </div>
      <div className="restaurant-list">
        {list?.map((restaurant) => {
          return <RestaurantCard {...restaurant.data} key={restaurant.data.id} />;
        })}
      </div>
    </>
  );
}
export default RestaurantList