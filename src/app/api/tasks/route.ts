import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { ICreateTask } from "@/types/task.interface";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const session = await getServerSession(authOptions);
    const body: ICreateTask = await request.json();
    const task = await prisma.tasks.create({
      data: {
        name: body.name,
        deadline: body.deadline,
        status: "Open",
        projectId: Number(body.projectId),
        createdId: Number(session?.user.id),
        assignees: {
          createMany: {
            data: body.assigneeIds.map((id: number) => ({
              userId: id,
            })),
          },
        },
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error when creating task" },
      { status: 500 }
    );
  }
};
