import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Filter = {
  name?: Object;
  status?: Object;
  deadline?: Object;
}
export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const url = new URL(request.url!);
    const searchParams = new URLSearchParams(url.searchParams);
    const page = Number(searchParams.get("page") || "1");
    const pageSize = Number(searchParams.get("pageSize") || "3");
    const name = searchParams.get("name");
    const status = searchParams.get("status");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const where: Filter = {};

    if (name) {
      where.name = { contains: name };
    }
    if (status) {
      where.status = { equals: status };
    }
    if (from && to) {
      where.deadline = {
        gte: new Date(from),
        lte: new Date(to),
      };
    }

    const totalCount = await prisma.tasks.count({
      where: {
        ...where,
        projectId: Number(params.id),
      },
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    const tasks = await prisma.tasks.findMany({
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
        ...where,
        projectId: Number(params.id),
      },
      orderBy: {
        id: "desc",
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return NextResponse.json({ tasks, totalPages, message: "Oke" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
};
