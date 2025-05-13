import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

//購入履歴検索
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId;

  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
      },
    });
    return NextResponse.json(purchases);
  } catch (err) {
    console.log(err);
  }
}
