"use client";
import React, { useState, useEffect } from "react";
import { Question } from "@prisma/client/edge";
import { useRouter } from "next/navigation";
import { getWinLossAmounts } from "@/lib/prediction-math";

interface PredictQuestionProps {
  question: Question;
}

interface BetData {
  winAmount: number;
  lossAmount: number;
}

const PredictQuestion: React.FC<PredictQuestionProps> = ({ question }) => {
  const [betAmount, setBetAmount] = useState(0.5);
  const [betData, setBetData] = useState<BetData>({
    winAmount: 0,
    lossAmount: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const { winAmount, lossAmount } = getWinLossAmounts(betAmount);
    setBetData({ winAmount, lossAmount });
  }, [betAmount]);

  const handleBetAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBetAmount(Number(event.target.value));
  };

  const handlePlaceBet = async () => {
    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: question.id,
          prediction: betAmount,
        }),
      });

      if (response.ok) {
        const newPrediction = await response.json();
        console.log("New prediction created:", newPrediction);
        router.push("/feed");
        // TODO: Handle success, e.g., show a success message or update the UI
      } else {
        console.error("Error creating prediction:", response.statusText);
        // TODO: Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error("Error creating prediction:", error);
      // TODO: Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
      <p className="text-gray-600 mb-4">{question.description}</p>
      <div className="mb-4">
        <label htmlFor="betAmount" className="block mb-2">
          Bet Amount:
        </label>
        <input
          type="range"
          id="betAmount"
          min="0.1"
          max="0.9"
          step="0.02"
          value={betAmount}
          onChange={handleBetAmountChange}
          className="w-full"
        />
        <p>Selected Bet Amount: {betAmount}</p>
        <p>Potential Win Amount: {betData.winAmount}</p>
        <p>Potential Loss Amount: {betData.lossAmount}</p>
      </div>
      <button
        onClick={handlePlaceBet}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Place Prediction!
      </button>
    </div>
  );
};

export default PredictQuestion;
