import React, { useState, useEffect } from "react";


//importing other components
import Loading from "./Loading";
import Card from "./Card";


export default function Hero() {
   const [posts, setPost] = useState([]);


   //useEffect runs on page mount fetching posts from jsonplaceholder/posts 
   //returns a new object that fetches a specific user from the users endpoint
   //maps over every single comment with the newly added user object into state

   useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const fetchedData = await response.json();
        const posts = await Promise.all(fetchedData.map(async (post) => {
           return {"title":post.title, "body":post.body, "user": await fetchUser(post.userId)}  
        }));

        setPost(posts);
      }
      
      const fetchUser = async (id) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const fetchedData = await response.json();
        const user = {"user":fetchedData.name, "catchphrase":fetchedData.company.catchPhrase}
        return user;
      }

      fetchData();
   },[]) 
   
  

  return (
    <div>
        {posts ? posts.map((elem, index) => {
           return <Card key={index}{...elem}/> 
        }) : <Loading /> }
    </div>
  );
}
