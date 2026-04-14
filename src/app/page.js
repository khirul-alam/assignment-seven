import Banner from "@/components/Banner";
import FriendsGrid from "@/components/FriendsGrid";
// import FriendList from "@/components/FriendList"; // পরবর্তী কাজ

export default function Home() {
  return (
    <div>
      <Banner />
      {/* এরপর আমরা ফ্রেন্ড লিস্ট সেকশনটি তৈরি করবো */}
      <FriendsGrid />
    </div>
  );
}