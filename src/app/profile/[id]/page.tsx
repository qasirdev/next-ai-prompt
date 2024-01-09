"use client";
import Profile from "@/components/Profile";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const { id: cusomerId } = useParams();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${cusomerId}/posts`);
      const { data } = await response.json();

      setUserPosts(data);
    };

    if (cusomerId) fetchPosts();
  }, [cusomerId]);

  return (
    <Profile
      name={userName?.toString() || ""}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};
export default UserProfile;
