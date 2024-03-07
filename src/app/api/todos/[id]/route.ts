import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) => {
    const body = await request.json()
    const todo = await prisma.todos.update({
        where: {
            id: Number(params.id)
        },
        data: {
            name: body.name,
            status: body.status,
            deadline: body.deadline,
            assigneeId: body.assigneeId
        }
    })
    return NextResponse.json(todo, {status: 200});
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const todo = await prisma.todos.delete({
        where:{
            id: Number(params.id)
        }
    });
    return NextResponse.json(todo, {status: 200});
}