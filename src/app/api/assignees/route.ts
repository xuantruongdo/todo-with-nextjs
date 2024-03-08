import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
const prisma = new PrismaClient();

interface IRequest {
  name: string;
  email: string;
}

export const GET = async (req: any) => {
  try {
    const url = new URL(req.url!);
    const searchParams = new URLSearchParams(url.searchParams);

    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "100");

    const totalCount = await prisma.assignees.count();

    const totalPages = Math.ceil(totalCount / pageSize);

    const assignees = await prisma.assignees.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        id: 'desc'
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return NextResponse.json({ assignees, totalPages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching assignees:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const body: IRequest = await request.json();
    const assignee = await prisma.assignees.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });
    return NextResponse.json(assignee, { status: 201 });
  } catch (error) {
    console.error("Error fetching assignees:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
