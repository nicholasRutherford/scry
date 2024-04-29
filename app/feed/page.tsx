// app/feed/page.tsx
import React from "react";
import ViewQuestion from "@/components/question/view_question";
import { Question } from "@prisma/client/edge";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
export const revalidate = 0; // why??

const prisma = new PrismaClient().$extends(withAccelerate());

async function getRecentQuestions(): Promise<Question[]> {
  try {
    const questions = await prisma.question.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });
    console.log("questions received:", questions.length);
    return questions;
  } catch (error) {
    console.error("Error fetching recent questions:", error);
    return [];
  }
}

async function FeedPage() {
  const questions = await getRecentQuestions();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recent Questions</h1>
      {questions.map((question) => (
        <div key={question.id} className="mb-4">
          <ViewQuestion question={question} />
        </div>
      ))}
    </div>
  );
}

export default FeedPage;
