/*
  Warnings:

  - A unique constraint covering the columns `[questionId,userId]` on the table `Prediction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Prediction_questionId_userId_key" ON "Prediction"("questionId", "userId");
