import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { getHashPassword } from "@/helpers/hashPassword";
import { IRegister } from "@/types/auth.interface";
const prisma = new PrismaClient();

export const GET = async (req: NextApiRequest) => {
  try {
    const url = new URL(req.url!);
    const searchParams = new URLSearchParams(url.searchParams);

    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "100");

    const totalCount = await prisma.users.count();

    const totalPages = Math.ceil(totalCount / pageSize);

    const users = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
      },
      orderBy: {
        id: "desc",
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return NextResponse.json({ users, totalPages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const body: IRegister = await request.json();
    const existUser = await prisma.users.findUnique({
      where: {
        email: body.email,
      },
    });
    if (existUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 }); 
    }

    const user = await prisma.users.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: getHashPassword(body.password),
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
