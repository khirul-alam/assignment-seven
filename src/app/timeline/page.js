"use client";
import { useState, useEffect } from "react";
import { Phone, MessageSquare, Video, Calendar } from "lucide-react";

const TimelinePage = () => {
  const [timeline, setTimeline] = useState([]);
  const [filter, setFilter] = useState("All");
  const [mounted, setMounted] = useState(false); // ✅ hydration fix

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (typeof window === "undefined") return;

    const savedTimeline = JSON.parse(localStorage.getItem("timeline") || "[]");
    setTimeline(savedTimeline);
  }, [mounted]);

  if (!mounted) return null;

  const filteredTimeline =
    filter === "All"
      ? timeline
      : timeline.filter((item) => item.type === filter);

  const getIcon = (type) => {
    switch (type) {
      case "Call":
        return <Phone size={18} className="text-green-600" />;
      case "Text":
        return <MessageSquare size={18} className="text-blue-600" />;
      case "Video":
        return <Video size={18} className="text-purple-600" />;
      default:
        return <Calendar size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">

        <div className="flex justify-between mb-10">
          <h1 className="text-3xl font-black text-black">Timeline</h1>

          <div className="flex gap-2 text-black">
            {["All", "Call", "Text", "Video"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-4 py-2 rounded btn btn-accent ${
                  filter === item ? "bg-green-500 text-white" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filteredTimeline.length === 0 ? (
          <div className="text-center py-20 bg-white rounded">
            <h2>No history found</h2>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTimeline.map((entry) => (
              <div key={entry.id} className="bg-white p-6 rounded flex justify-between">
                <div className="flex gap-4 items-center text-black">
                  {getIcon(entry.type)}
                  <div>
                    <h3 className="font-bold">
                      {entry.type} with {entry.friendName}
                    </h3>
                    <p className="text-sm text-gray-400">{entry.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default TimelinePage;