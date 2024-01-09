"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { ResponsePrompt } from "@/types/Prompt";

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: ResponsePrompt[];
  handleTagClick: (tagName: string) => {};
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState<ResponsePrompt[]>([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<
    string | number | NodeJS.Timeout | undefined
  >(undefined);
  const [searchedResults, setSearchedResults] = useState<ResponsePrompt[]>([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const { data } = await response.json();
    setAllPosts(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompt = (searchText: string) => {
    const regx = new RegExp(searchText, "i");
    return allPosts.filter(
      (post) =>
        regx.test(post.creator.username) ||
        regx.test(post.tag) ||
        regx.test(post.prompt)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompt(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    const searchResult = filterPrompt(tagName);
    setSearchedResults(searchResult);
    return true;
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
