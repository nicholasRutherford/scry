import React from "react";
import { Question, Prediction } from "@prisma/client/edge";
import Link from "next/link";
import PredictionSlider from "./prediction-slider";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";

interface QuestionDisplayProps {
  question: Question;
  prediction: Prediction | null;
}

const ViewQuestion: React.FC<QuestionDisplayProps> = ({
  question,
  prediction,
}) => {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <Link href={`/question/${question.id}`}>
          <h2 className="text-lg font-bold ">{question.title}</h2>
        </Link>
      </CardHeader>
      <CardBody>
        <p className="text-small">{question.description}</p>

        <PredictionSlider question={question} prediction={prediction} />
      </CardBody>
    </Card>
  );
};

export default ViewQuestion;
