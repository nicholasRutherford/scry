import React from "react";
import { Question, Prediction } from "@prisma/client/edge";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import PredictQuestion from "@/components/question/prediction-slider";
import { auth } from "@/auth";
import ViewQuestion from "@/components/question/view-question";
import CreatorEdit from "@/components/question/creator-edit";

const prisma = new PrismaClient().$extends(withAccelerate());

async function getQuestionAndPrediction(
  id: string,
  profileId: string | undefined
): Promise<{ question: Question | null; prediction: Prediction | null }> {
  try {
    const result = await prisma.question.findUnique({
      where: { id },
      include: {
        predictions: {
          where: {
            profileId,
          },
          take: 1,
        },
      },
    });

    if (!result) {
      return { question: null, prediction: null };
    }

    const { predictions, ...question } = result;
    const prediction = predictions.length > 0 ? predictions[0] : null;

    return { question, prediction };
  } catch (error) {
    console.error("Error fetching question and prediction:", error);
    return { question: null, prediction: null };
  }
}

const QuestionPage: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const session = await auth();
  const profileId = session?.user?.profileId;

  const { question, prediction } = await getQuestionAndPrediction(
    params.id,
    profileId
  );

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div>
      <ViewQuestion question={question} prediction={prediction} />
      {profileId === question.authorId && <CreatorEdit question={question} />}
    </div>
  );
};

export default QuestionPage;
