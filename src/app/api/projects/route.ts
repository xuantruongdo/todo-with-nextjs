import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { ICreateProject } from "@/types/project.interface";
const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  try {
    const projects = await prisma.projects.findMany();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const session = await getServerSession(authOptions);
    const body: ICreateProject = await request.json();
    const project = await prisma.projects.create({
      data: {
        name: body.name,
        createdId: Number(session?.user.id)
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
