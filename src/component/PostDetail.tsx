import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Post {
 objectID: string;
 title: string;
 points: number;
 children: {
   objectID: string;
   text: string;
 }[];
}

const PostDetail = () => {
 const { id } = useParams<{ id: string }>();
 const [post, setPost] = useState<Post | null>(null);

 useEffect(() => {
  const fetchPost = async () => {
    const response = await axios.get(`http://hn.algolia.com/api/v1/items/${id}`);
    setPost(response.data);
  };

  fetchPost();
 }, [id]);

 if (!post) {
  return <div className="flex justify-center items-center h-screen text-3xl font-bold text-gray-600">Loading...</div>;
 }

 return (
  <div className="max-w-4xl mx-auto p-8">
    <h1 className="text-4xl font-semibold text-gray-800">{post.title}</h1>
    <p className="text-xl text-gray-600 mt-4">{post.points} points</p>
    <ul className="mt-8 space-y-4">
      {post.children.map((comment, i) => (
        <li key={comment.objectID} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium text-gray-700">Comment {i+1}</h2>
            <div className="mt-2" dangerouslySetInnerHTML={{ __html: comment.text }} />
        </li>
        
      ))}
    </ul>
  </div>
 );
};

export default PostDetail;
