import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { IUpdateTask } from "@/types/task.interface";
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
        projectId: true,
        checklists: true,
        assignees: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
        createdBy: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        createdId: true,
        createdAt: true,
      },
      where: {
        id: Number(params.id),
      },
    });
    
    if (!task) {
      return NextResponse.json({ message: 'Task ID does not exist' }, { status: 400 }); 
    }
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Error when fetching task by ID" });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: IUpdateTask = await request.json();
  const taskId = Number(params.id);

  try {
    await prisma.$transaction([
      prisma.tasks.update({
        where: { id: taskId },
        data: {
          name: body.name,
          status: body.status,
          deadline: new Date(body.deadline),
        },
      }),
      prisma.assignees.deleteMany({
        where: { taskId },
      }),

      prisma.assignees.createMany({
        data: body.assigneeIds.map((id: number) => ({
          userId: id,
          taskId: Number(taskId),
        })),
      }),
    ]);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Error when updating task" });
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
      prisma.assignees.deleteMany({
        where: {
          taskId: taskId,
        },
      }),
      prisma.tasks.delete({
        where: {
          id: taskId,
        },
      }),
    ]);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Error when deleting task" });
  }
};
