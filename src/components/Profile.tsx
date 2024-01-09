import React from "react";
import PromptCard from "./PromptCard";
import { ResponsePrompt } from "@/types/Prompt";

interface Props {
  name: string;
  desc: string;
  data: ResponsePrompt[];
  handleEdit?: (post: ResponsePrompt) => {};
  handleDelete?: (post: ResponsePrompt) => {};
}

const Profile = ({ name, desc, data, handleEdit, handleDelete }: Props) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
