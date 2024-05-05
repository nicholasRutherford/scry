import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  const profileId = session?.user?.profileId;
  if (!profileId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const prisma = new PrismaClient().$extends(withAccelerate());

  try {
    const { questionId, prediction } = await request.json();

    const upsertedPrediction = await prisma.prediction.upsert({
      where: {
        questionId_profileId: {
          questionId,
          profileId: profileId,
        },
      },
      create: {
        questionId,
        profileId: profileId,
        prediction,
      },
      update: {
        prediction,
      },
    });

    return NextResponse.json(upsertedPrediction, { status: 200 });
  } catch (error) {
    console.error("Error upserting prediction:", error);
    return NextResponse.json(
      { error: "Failed to upsert prediction" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
