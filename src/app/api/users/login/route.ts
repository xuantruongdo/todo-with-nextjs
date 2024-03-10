import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkValidPassword } from "@/helpers/checkValidPassword";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { username, password } = body;
    const user = await prisma.users.findUnique({
      where: {
        email: username,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Account does not exist" },
        { status: 400 }
      );
    }

    if (!checkValidPassword(password, user.password)) {
      return NextResponse.json({ message: "Wrong password" }, { status: 400 });
    }

    const payload = {
      sub: "token login",
      iss: "from server",
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    };

    const secretKey = process.env.JWT_SECRET || "truongdo";
    const expiresIn = process.env.EXPIRESIN_ACCESS || "1h";
    return NextResponse.json(
      {
        access_token: jwt.sign(payload, secretKey, {
          expiresIn: expiresIn,
        }),
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
