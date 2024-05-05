"use client";
import React, { useState, useEffect } from "react";
import { Question, Prediction } from "@prisma/client/edge";
import { useRouter } from "next/navigation";
import { getWinLossAmounts } from "@/lib/prediction-math";
import { Slider } from "@nextui-org/react";

interface PredictionSliderProps {
  question: Question;
  prediction: Prediction | null;
}

interface BetData {
  winAmount: number;
  lossAmount: number;
}

const PredictionSlider: React.FC<PredictionSliderProps> = ({
  question,
  prediction,
}) => {
  const [betAmount, setBetAmount] = useState(prediction?.prediction || 0.5);
  const [disabled, setDisabled] = useState(false);
  const [betData, setBetData] = useState<BetData>({
    winAmount: 0,
    lossAmount: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const { winAmount, lossAmount } = getWinLossAmounts(betAmount);
    setBetData({ winAmount, lossAmount });
  }, [betAmount]);

  const handlePlaceBet = async () => {
    setDisabled(true);
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
        setDisabled(false);
        console.log("New prediction created:", newPrediction);
        // router.push("/feed");
        // TODO: Handle success, e.g., show a success message or update the UI
      } else {
        setDisabled(false);
        console.error("Error creating prediction:", response.statusText);
        // TODO: Handle error, e.g., show an error message
      }
    } catch (error) {
      setDisabled(false);
      console.error("Error creating prediction:", error);
      // TODO: Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Slider
          label={`Predicting: ${betAmount >= 0.5 ? "YES" : "NO"}`}
          size="lg"
          step={0.02}
          maxValue={0.91}
          minValue={0.09}
          color={betAmount >= 0.5 ? "success" : "warning"}
          fillOffset={0.5}
          defaultValue={1.5}
          className="max-w-md"
          formatOptions={{ signDisplay: "always" }}
          onChange={(value) => setBetAmount(value as number)}
          onChangeEnd={() => handlePlaceBet()}
          value={betAmount}
          startContent={<p>NO</p>}
          endContent={<p>YES</p>}
          isDisabled={disabled}
          getValue={(betAmount) =>
            `+${betData.winAmount} if correct / -${betData.lossAmount} if wrong`
          }
          marks={[
            {
              value: 0.1,
              label: "Never",
            },
            {
              value: 0.25,
              label: "Rare",
            },

            {
              value: 0.4,
              label: "Unlikely",
            },
            {
              value: 0.6,
              label: "Likely",
            },
            {
              value: 0.75,
              label: "Often",
            },
            {
              value: 0.9,
              label: "Guaranteed",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PredictionSlider;
