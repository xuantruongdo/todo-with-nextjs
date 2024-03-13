import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { ICreateCheckList } from "@/types/checklist.interface";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body: ICreateCheckList = await request.json();
    const checklist = await prisma.checklists.create({
      data: {
        title: body.title,
        checked: false,
        taskId: Number(body.taskId),
      },
    });

    return NextResponse.json(checklist, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error when creating checklist" },
      { status: 500 }
    );
  }
};
