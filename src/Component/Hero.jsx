import React, { useState, useEffect } from "react";


//importing other components
import Loading from "./Loading";
import Card from "./Card";



export default function Hero() {
   const [posts, setPost] = useState([]);
   const [count, setCount] = useState(12);

   //useEffect runs on page mount fetching posts from jsonplaceholder/posts 
   //maps over every single comment with the newly added user object into state

   useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const fetchedData = await response.json();
        const posts = await Promise.all(fetchedData.map(async (post) => {
           return {"title":post.title, "body":post.body, "user": await fetchUser(post.userId)}  // Had to use promise.all to resolve the entire array of promises and catch the data
        }));

        setPost(posts);
      }
      
    //returns a new object that fetches a specific user using the userId from above
      const fetchUser = async (id) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const fetchedData = await response.json();
        const user = {"user":fetchedData.name, "catchphrase":fetchedData.company.catchPhrase}
        return user;
      }

      fetchData();
   },[]) 

   //Created load more functionality that will increment the count and slice according to the countsize in state
   
   let loadMore = () => {
    setCount(count + 8);
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-200">  
        {posts ? posts.slice(0, count).map((elem, index) => {
           return <Card key={index}{...elem}/> 
        }) : <Loading /> }
        <div className=" w-screen flex items-center p-12">
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-64 h-16 mx-auto"
        onClick={() => loadMore()}
        >Load More</button>
        </div>
       
    </div>
  );
}
