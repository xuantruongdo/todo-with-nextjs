import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

export const GET = async (req: any) => {
  const url = new URL(req.url!);
  const searchParams = new URLSearchParams(url.searchParams);

  const name = searchParams.get("name");
  const assigneeId = searchParams.get("assigneeId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "5");

  try {
    const where: any = {};

    if (name) {
      where.name = { contains: name };
    }

    if (assigneeId) {
      where.assigneeId = { equals: Number(assigneeId) };
    }
    if (from && to) {
      where.deadline = {
        gte: new Date(from),
        lte: new Date(to),
      };
    }

    const totalCount = await prisma.todos.count({
      where: where,
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    const todos = await prisma.todos.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        deadline: true,
        assignee: true,
        assigneeId: true,
      },
      where: where,
      orderBy: {
        id: "desc",
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return NextResponse.json({ todos, totalPages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching todos:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const todo = await prisma.todos.create({
      data: {
        name: body.name,
        deadline: body.deadline,
        status: "Open",
        assigneeId: body.assigneeId,
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
