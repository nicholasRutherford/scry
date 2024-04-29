import React from "react";
import { Question } from "@prisma/client/edge";
import Link from "next/link";

interface QuestionDisplayProps {
  question: Question;
}

const ViewQuestion: React.FC<QuestionDisplayProps> = ({ question }) => {
  return (
    <div className="border border-gray-300 rounded p-4">
      <Link href={`/question/${question.id}`}>
        <h2 className="text-xl font-bold mb-2">{question.title}</h2>
      </Link>
      <p className="text-gray-600 mb-4">{question.description}</p>
      <div className="text-sm text-gray-500">
        <p>Author ID: {question.authorId}</p>
        <p>Created At: {question.createdAt.toString()}</p>
        <p>Updated At: {question.updatedAt.toString()}</p>
      </div>
    </div>
  );
};

export default ViewQuestion;
