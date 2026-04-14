"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Activity, Phone, MessageSquare, Video } from "lucide-react";

const StatsPage = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // localStorage থেকে টাইমলাইন ডেটা নেওয়া
    const timeline = JSON.parse(localStorage.getItem("timeline") || "[]");
    setTotal(timeline.length);
    
    // টাইপ অনুযায়ী ডেটা ফিল্টার এবং কাউন্ট (Requirement C1)
    const counts = timeline.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));

    setData(chartData);
  }, []);

  // ফিগমা ডিজাইন অনুযায়ী কালার প্যালেট
  const COLORS = ["#166534", "#1e40af", "#6b21a8", "#9a3412"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Friendship Analytics</h1>
        <p className="text-gray-500">Visualizing your connection history</p>
      </div>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* পাই চার্ট সেকশন (Requirement C1) */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[450px]">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Activity className="text-green-700" size={20} /> Interaction Distribution
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* ডান পাশের সামারি কার্ডস */}
          <div className="space-y-4">
            <div className="bg-green-800 text-white p-6 rounded-3xl shadow-lg shadow-green-100">
              <p className="text-green-200 text-sm font-medium">Total Interactions</p>
              <h2 className="text-4xl font-bold mt-1">{total}</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {data.map((item, index) => (
                <div key={item.name} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                    <div>
                      <p className="font-bold text-gray-800">{item.name}s</p>
                      <p className="text-xs text-gray-400">Logged History</p>
                    </div>
                  </div>
                  <span className="text-2xl font-black text-gray-200">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Activity className="text-gray-300" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">No Stats Available Yet</h2>
          <p className="text-gray-400 max-w-xs mx-auto mt-2">
            Start logging interactions from the friend details page to see your analytics!
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsPage;