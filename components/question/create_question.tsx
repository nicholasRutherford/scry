"use client";
import React, { useState } from "react";

const CreateQuestion: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make API request to create the question
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        // Question created successfully, navigate to the question list page
        console.log("Question created successfully");
      } else {
        // Handle error if the API request fails
        console.error("Failed to create question");
      }
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-bold">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 font-bold">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded"
      >
        Create Question
      </button>
    </form>
  );
};

export default CreateQuestion;
