"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Activity } from "lucide-react";

const StatsPage = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

   useEffect(() => {
    if (typeof window !== "undefined") {
    const timeline = JSON.parse(localStorage.getItem("timeline") || "[]");
    setTotal(timeline.length);
    
    const counts = timeline.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));

    setData(chartData);
  }
}, []);

  
  // ফিগমা ডিজাইন অনুযায়ী কালার প্যালেট
  const COLORS = ["#166534", "#1e40af", "#6b21a8", "#9a3412"];

  return (
    /* পুরো পেজটিকে gray background এবং full height দেওয়া */
    <div className="min-h-screen bg-gray-50 py-12">
      
      {/* Container class যা কন্টেন্টকে মাঝখানে রাখবে এবং max-width নিয়ন্ত্রণ */}
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900">Friendship Analytics</h1>
          
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* পাই চার্ট সেকশন  */}
            <div className="lg:col-span-8 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm h-[500px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                  <Activity className="text-green-700" size={20} /> By Interaction Type
                </h3>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full uppercase">
                  Live Data
                </span>
              </div>
              
              <ResponsiveContainer width="100%" height="300">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* ডান পাশের সামারি কার্ডস */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-green-800 text-white p-8 rounded-[32px] shadow-xl shadow-green-100">
                <p className="text-green-200 text-sm font-medium uppercase tracking-wider">Total Interactions</p>
                <h2 className="text-5xl font-black mt-2">{total}</h2>
                <div className="mt-4 pt-4 border-t border-green-700">
                  
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {data.map((item, index) => (
                  <div key={item.name} className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center group hover:border-green-200 transition-all">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-3 h-3 rounded-full shadow-sm" 
                        style={{backgroundColor: COLORS[index % COLORS.length]}}
                      ></div>
                      <div>
                        <p className="font-bold text-gray-900">{item.name}s</p>
                        
                      </div>
                    </div>
                    <span className="text-3xl font-black text-gray-100 group-hover:text-green-800 transition-colors">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-gray-100 shadow-sm">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Activity className="text-gray-200" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">No Stats Available Yet</h2>
            <p className="text-gray-400 max-w-sm mx-auto mt-3">
              We need some data to generate insights. Go to a friend's details page and log some calls or texts!
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
            <p className="text-gray-300 text-[20px] font-medium">Stats updated automatically based on your timeline.</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;