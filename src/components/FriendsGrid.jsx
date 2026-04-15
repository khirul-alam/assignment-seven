"use client";
import { useState, useEffect } from "react";
import friendsData from "@/data/friends.json"; 
import FriendCard from "./FriendCard";

const FriendsGrid = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // লোডিং অ্যানিমেশন দেখানোর জন্য সামান্য ডিলে 
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading your friends...</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Friends</h2>
            
          </div>
          <span className="text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-lg">
            {friends.length} Total
          </span>
        </div>

        {/* ৪-কলাম গ্রিড লেআউট */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FriendsGrid;