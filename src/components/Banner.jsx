"use client";
import { UserPlus, Users, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";

const Banner = () => {
  // কার্ডগুলোর জন্য ডামি ডেটা (তুমি এগুলো প্রোফাইল লিস্ট থেকে ক্যালকুলেট করতে পারো)
  const stats = [
    { label: "Total Friends", value: "10", icon: <Users size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "On Track", value: "3", icon: <CheckCircle size={20} />, color: "text-green-600", bg: "bg-green-50" },
    { label: "Need Attention", value: "6", icon: <AlertCircle size={20} />, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Interactions", value: "12", icon: <MessageSquare size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* টাইটেল ও সাবটাইটেল */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto mb-8">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        {/* Add a Friend বাটন */}
        <button className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-medium transition-all shadow-md active:scale-95 mb-16">
          <UserPlus size={20} />
          Add a Friend
        </button>

        {/* ৪টি সামারি কার্ড (Summary Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className={`inline-flex p-3 rounded-xl ${stat.bg} ${stat.color} mb-4`}>
                {stat.icon}
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Banner;