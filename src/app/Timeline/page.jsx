"use client";
import { useState, useEffect } from "react";
import { Phone, MessageSquare, Video, Calendar, Filter } from "lucide-react";

const TimelinePage = () => {
  const [timeline, setTimeline] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // localStorage থেকে ডেটা নিয়ে আসা
    const savedTimeline = JSON.parse(localStorage.getItem("timeline") || "[]");
    setTimeline(savedTimeline);
  }, []);

  // ফিল্টার লজিক 
  const filteredTimeline = filter === "All" 
    ? timeline 
    : timeline.filter(item => item.type === filter);

  // টাইপ অনুযায়ী আইকন সেট করা
  const getIcon = (type) => {
    switch (type) {
      case "Call": return <Phone size={18} className="text-green-600" />;
      case "Text": return <MessageSquare size={18} className="text-blue-600" />;
      case "Video": return <Video size={18} className="text-purple-600" />;
      default: return <Calendar size={18} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Timeline</h1>
          <p className="text-gray-500">History of your recent interactions</p>
        </div>

        {/* ফিল্টার বাটন  */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          {["All", "Call", "Text", "Video"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === item ? "bg-white text-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredTimeline.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">No interactions found yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTimeline.map((entry) => (
            <div key={entry.id} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center justify-between hover:border-green-200 transition">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  {getIcon(entry.type)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{entry.type} with {entry.friendName}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar size={14} /> {entry.date}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded">
                Completed
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelinePage;