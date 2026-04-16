import Link from "next/link";
import { Clock, Mail } from "lucide-react";

const FriendCard = ({ friend }) => {
  // স্ট্যাটাস অনুযায়ী কালার সেট করা
  const statusColors = {
    overdue: "bg-red-100 text-red-700 border-red-200",
    "almost due": "bg-orange-100 text-orange-700 border-orange-200",
    "on-track": "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <Link href={`/friend/${friend.id}`}>
      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col items-center text-center">
        
        {/* প্রোফাইল পিকচার */}
        <div className="relative mb-4">
          <img
            src={friend.picture}
            alt={friend.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-50 group-hover:ring-green-100 transition-all"
          />
        </div>

        {/* নাম ও ইমেইল */}
        <h3 className="text-lg font-bold text-gray-800 mb-1">{friend.name}</h3>
        <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
          <Mail size={12} /> {friend.email}
        </p>

        {/* ডেস সিন্স কন্টাক্ট */}
        <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-4 bg-gray-50 px-3 py-1 rounded-full">
          <Clock size={14} />
          <span>{friend.days_since_contact} days ago</span>
        </div>

        {/* (Tags) */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {friend.tags.map((tag, index) => (
            <span key={index} className="text-[10px] uppercase font-bold tracking-wider text-gray-400 border border-gray-200 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>

        {/*(Status Badge) */}
        <div className={`mt-auto w-full py-2 rounded-xl text-xs font-bold uppercase tracking-widest border ${statusColors[friend.status]}`}>
          {friend.status}
        </div>
      </div>
    </Link>
  );
};

export default FriendCard;