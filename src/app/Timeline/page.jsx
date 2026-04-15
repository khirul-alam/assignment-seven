"use client";
import { useState, useEffect } from "react";
import { Phone, MessageSquare, Video, Calendar, Filter } from "lucide-react";

const TimelinePage = () => {
  const [timeline, setTimeline] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedTimeline = JSON.parse(localStorage.getItem("timeline") || "[]");
    setTimeline(savedTimeline);
  }, []);

  const filteredTimeline = filter === "All" 
    ? timeline 
    : timeline.filter(item => item.type === filter);

  const getIcon = (type) => {
    switch (type) {
      case "Call": return <Phone size={18} className="text-green-600" />;
      case "Text": return <MessageSquare size={18} className="text-blue-600" />;
      case "Video": return <Video size={18} className="text-purple-600" />;
      default: return <Calendar size={18} />;
    }
  };

  return (
    /* পুরো পেজটিকে gray background এবং full height দেওয়া হয়েছে */
    <div className="min-h-screen bg-gray-50 py-12">
      
      {/* Container class যা কন্টেন্টকে মাঝখানে রাখবে */}
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Timeline</h1>
            
          </div>

          {/* ফিল্টার বাটন */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
            {["All", "Call", "Text", "Video"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  filter === item 
                    ? "bg-green-800 text-white shadow-md shadow-green-100" 
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filteredTimeline.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-gray-200 shadow-sm">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
               <Calendar className="text-gray-300" size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">No history found</h2>
            <p className="text-gray-400 mt-2">Start a conversation to see it in your timeline!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTimeline.map((entry) => (
              <div 
                key={entry.id} 
                className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm flex items-center justify-between hover:shadow-md hover:border-green-100 transition-all duration-300 group"
              >
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-green-50 transition-colors">
                    {getIcon(entry.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      {entry.type} with <span className="text-green-800">{entry.friendName}</span>
                    </h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-1">
                      <Calendar size={14} /> {entry.date}
                    </p>
                  </div>
                </div>
                
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Footer spacing */}
        <div className="mt-20 text-center">
            <p className="text-gray-300 text-2xl">End of timeline</p>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;