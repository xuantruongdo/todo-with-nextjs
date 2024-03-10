import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const task = await prisma.tasks.findUnique({
      select: {
        id: true,
        name: true,
        status: true,
        deadline: true,
        user: true,
        userId: true,
        projectId: true,
        checklists: true,
      },
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await request.json();
    const task = await prisma.tasks.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name: body.name,
        status: body.status,
        deadline: new Date(body.deadline),
        userId: Number(body.userId),
      },
    });
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const taskId = Number(params.id);
    await prisma.$transaction([
      prisma.checklists.deleteMany({
        where: {
          taskId: taskId,
        },
      }),
      prisma.tasks.deleteMany({
        where: {
          id: taskId,
        },
      }),
    ]);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};
