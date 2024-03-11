import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const project = await prisma.projects.findUnique({
    select: {
      id: true,
      name: true,
      tasks: true,
    },
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(project, { status: 200 });
};


export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const projectId = Number(params.id);

  try {
    await prisma.$transaction([
      prisma.checklists.deleteMany({
        where: {
          task: {
            projectId: projectId,
          },
        },
      }),
      prisma.tasks.deleteMany({
        where: {
            projectId: projectId,
        },
      }),
      prisma.projects.delete({
        where: {
          id: projectId,
        },
      }),
    ]);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error deleting project and associated data:', error);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};