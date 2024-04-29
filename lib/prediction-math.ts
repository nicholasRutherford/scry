export interface BetData {
  winAmount: number;
  lossAmount: number;
}

export const getWinLossAmounts = (p: number): BetData => {
  const minPayout = 10;
  const maxPayout = 50;
  // Ensure p is greater than 0.5
  if (p <= 0.5) {
    p = 1 - p;
  }

  // Calculate the scale based on the desired range (10 to 50)
  const scale = Math.log(maxPayout / minPayout);
  // Shift the probability to center around 0
  const shiftedP = p - 0.5;

  // Calculate the win amount based on the shifted probability and scale
  const winAmount = Math.round(minPayout * Math.exp(shiftedP * scale));
  // Calculate the loss amount based on the win amount and probability

  const lossAmount = Math.round((winAmount * p) / (1 - p));
  return { winAmount, lossAmount };
};
