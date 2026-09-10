import { db } from "@/src/db/index";
import { users } from "@/src/db/schema";
import { CreateUserSchema } from "@/src/schemas/users.schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const numericId = parseInt(id, 10);

    if (Number.isNaN(numericId)) {
        return NextResponse.json({ message: 'Id need to be a number' }, { status: 400 });
    }


    try {
        const result = await db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            createdAt: users.createdAt
        }).from(users).where(eq(users.id, numericId));

        if (result.length === 0) {
            return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.json({ error: 'Error retrieving users', e });
    };
};

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const numericId = parseInt(id, 10);

    if (Number.isNaN(numericId)) {
        return NextResponse.json(
            { message: "Id needs to be a number" },
            { status: 400 }
        );
    }

    try {
        const body = await request.json();

        if (Object.keys(body).length === 0) {
            return NextResponse.json(
                { message: "Add any data for update" },
                { status: 400 }
            );
        }

        const PatchUserSchema = CreateUserSchema.partial();
        const authSchema = PatchUserSchema.safeParse(body);

        if (!authSchema.success) {
            return NextResponse.json(
                { error: "Invalid data", details: authSchema.error.issues },
                { status: 400 }
            );
        }

        const data = authSchema.data;

        const updateData: {
            name?: string;
            email?: string;
            password?: string;
        } = {};

        if (data.name !== undefined) {
            updateData.name = data.name;
        }

        if (data.email !== undefined) {
            updateData.email = data.email;
        }

        if (data.password !== undefined) {
            updateData.password = await bcrypt.hash(data.password, 10);
        }

        const result = await db.update(users).set(updateData).where(eq(users.id, numericId)).returning({
                id: users.id,
                name: users.name,
                email: users.email,
                createdAt: users.createdAt
            });

        if (result.length === 0) {
            return NextResponse.json(
                { message: "User does not exist" },
                { status: 404 }
            );
        }

        return NextResponse.json(result);
    } catch (e) {
        if (e instanceof Error && (e as any).cause?.code === "23505") {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: "Error updating user" },
            { status: 500 }
        );
    }
};

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const numericId = parseInt(id, 10);

    if (Number.isNaN(numericId)) {
        return NextResponse.json({ message: 'Id need to be a number' }, { status: 400 });
    }

    try {
        const deletedUser = await db.delete(users).where(eq(users.id, numericId));

        if (deletedUser.rowCount === 0) {
            return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
        }

        return NextResponse.json(deletedUser);
    } catch (e) {
        return NextResponse.json({ error: 'Error deleting user', e });
    };
};