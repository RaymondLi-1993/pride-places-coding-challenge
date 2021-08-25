import React, { useState, useEffect } from "react";

//importing other components
import Loading from "./Loading";
import Card from "./Card";

export default function Hero() {
  const [data, setData] = useState(null);


  //useEffect hook to fetch data from API
  useEffect(() => {
    try {
      const fetchData = async () => {
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        let data = await response.json();
        setData(data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if(!data){
      return (
         <Loading /> 
      );
  }

  return (
    <div>
      {data.map((elem, index) => {
         return(
           <Card key={index}/> 
         ) 
      })}
    </div>
  );
}
