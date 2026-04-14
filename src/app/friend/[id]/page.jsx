"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import friendsData from "@/data/friends.json";
import {
  Phone,
  MessageSquare,
  Video,
  Mail,
  Calendar,
  Target,
  Clock,
  BellRing,
  Archive,
  Trash2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const FriendDetails = () => {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const foundFriend = friendsData.find((f) => f.id === parseInt(id));
    setFriend(foundFriend);
  }, [id]);

  if (!friend)
    return (
      <div className="text-center py-20 font-bold">
        Loading Friend Details...
      </div>
    );

  // বাটন ক্লিক করলে টাইমলাইন আপডেট এবং টোস্ট দেখানোর ফাংশন
  const handleCheckIn = (type) => {
    const newEntry = {
      id: Date.now(),
      friendName: friend.name,
      type: type,
      date: new Date().toLocaleDateString(),
    };

    // লোকাল স্টোরেজে এন্ট্রি সেভ করা
    const existingTimeline = JSON.parse(
      localStorage.getItem("timeline") || "[]",
    );
    localStorage.setItem(
      "timeline",
      JSON.stringify([newEntry, ...existingTimeline]),
    );

    // টোস্ট নোটিফিকেশন 
    toast.success(`${type} with ${friend.name} logged!`);
  };

  const statusColors = {
    overdue: "bg-red-100 text-red-700",
    "almost due": "bg-orange-100 text-orange-700",
    "on-track": "bg-green-100 text-green-700",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Toaster position="top-center" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* বাম কলাম: Friend Info Card (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm text-center">
            <img
              src={friend.picture}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-50"
            />
            <h2 className="text-2xl font-bold">{friend.name}</h2>
            <div
              className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase mt-2 ${statusColors[friend.status]}`}
            >
              {friend.status}
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {friend.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] bg-gray-100 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-500 mt-6 text-sm leading-relaxed">
              {friend.bio}
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-gray-600">
              <Mail size={16} /> <span className="text-sm">{friend.email}</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-3 mt-8">
              <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                <BellRing size={18} /> Snooze 2 Weeks
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                <Archive size={18} /> Archive
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-red-100 text-red-500 rounded-xl hover:bg-red-50 transition">
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
        </div>

        {/* ডান কলাম: Stats & Actions (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          {/* ১. Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <Clock className="text-blue-500 mb-2" />
              <p className="text-2xl font-bold">{friend.days_since_contact}</p>
              <p className="text-xs text-gray-400 uppercase">
                Days Since Contact
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <Target className="text-purple-500 mb-2" />
              <p className="text-2xl font-bold">{friend.goal} Days</p>
              <p className="text-xs text-gray-400 uppercase">Goal</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <Calendar className="text-green-500 mb-2" />
              <p className="text-2xl font-bold">{friend.next_due_date}</p>
              <p className="text-xs text-gray-400 uppercase">Next Due Date</p>
            </div>
          </div>

          {/* ২. Relationship Goal Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-bold">Relationship Goal</h3>
              <p className="text-sm text-gray-500">
                You aim to contact {friend.name} every {friend.goal} days.
              </p>
            </div>
            <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold">
              Edit
            </button>
          </div>

          {/* ৩. Quick Check-In Card (Interaction Buttons) */}
          <div className="bg-green-800 p-8 rounded-3xl text-white">
            <h3 className="text-xl font-bold mb-2">Quick Check-In</h3>
            <p className="text-green-100 mb-6 text-sm">
              Did you reach out today? Log it below.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleCheckIn("Call")}
                className="flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition"
              >
                <Phone /> <span className="text-xs">Call</span>
              </button>
              <button
                onClick={() => handleCheckIn("Text")}
                className="flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition"
              >
                <MessageSquare /> <span className="text-xs">Text</span>
              </button>
              <button
                onClick={() => handleCheckIn("Video")}
                className="flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition"
              >
                <Video /> <span className="text-xs">Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetails;
