// app/feed/page.tsx
import React from "react";
import ViewQuestion from "@/components/question/view-question";
import { Question, Prediction } from "@prisma/client/edge";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { auth } from "@/auth";
export const revalidate = 0; // why??

type QuestionWithPrediction = Question & {
  predictions: Prediction[] | null;
};

const prisma = new PrismaClient().$extends(withAccelerate());

async function getRecentQuestions(
  profileId: string | undefined
): Promise<QuestionWithPrediction[]> {
  try {
    const questions = await prisma.question.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
      include: {
        predictions: {
          where: {
            profileId: profileId,
          },
          take: 1,
        },
      },
    });
    return questions;
  } catch (error) {
    console.error("Error fetching recent questions:", error);
    return [];
  }
}

async function FeedPage() {
  const session = await auth();
  const profileId = session?.user?.profileId;
  const questions = await getRecentQuestions(profileId);

  return (
    <div className="flex flex-col m-4">
      <h1 className="text-2xl font-bold mb-4">Recent Questions</h1>
      {questions.map((question) => (
        <div key={question.id} className="mb-4 min-w-6">
          <ViewQuestion
            question={question}
            prediction={question.predictions?.[0] ?? null}
          />
        </div>
      ))}
    </div>
  );
}

export default FeedPage;
