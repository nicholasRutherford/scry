/*
  Warnings:

  - You are about to drop the column `userId` on the `Prediction` table. All the data in the column will be lost.
  - You are about to drop the column `answer` on the `Question` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[questionId,profileId]` on the table `Prediction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_authorId_fkey";

-- DropIndex
DROP INDEX "Prediction_questionId_userId_key";

-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "userId",
ADD COLUMN     "amountLost" INTEGER,
ADD COLUMN     "amountWon" INTEGER,
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answer",
ADD COLUMN     "resolution" BOOLEAN;

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userName" TEXT,
    "cachedProfit" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Prediction_questionId_profileId_key" ON "Prediction"("questionId", "profileId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
