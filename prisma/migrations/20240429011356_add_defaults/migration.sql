-- AlterTable
ALTER TABLE "Prediction" ALTER COLUMN "isCorrect" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "answer" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'live';
