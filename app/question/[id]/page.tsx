import React from "react";
import { Question } from "@prisma/client/edge";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import PredictQuestion from "@/components/question/predict-question";

const prisma = new PrismaClient().$extends(withAccelerate());

async function getQuestionById(id: string): Promise<Question | null> {
  try {
    const question = await prisma.question.findUnique({
      where: { id },
    });
    return question;
  } catch (error) {
    console.error("Error fetching question:", error);
    return null;
  }
}

const QuestionPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const question = await getQuestionById(params.id);

  if (!question) {
    return <div>Question not found</div>;
  }

  return <PredictQuestion question={question} />;
};

export default QuestionPage;
