import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await request.json();
    const checklist = await prisma.checklists.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title: body.title,
        checked: body.checked,
      },
    });
    return NextResponse.json(checklist, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Error when updating checklist" });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const checklist = await prisma.checklists.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(checklist, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Error when deleting checklist" });
  }
};
