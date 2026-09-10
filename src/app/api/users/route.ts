import { db } from "@/src/db/index";
import { users } from "@/src/db/schema";
import { CreateUserSchema } from "@/src/schemas/user.schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function GET() {
    try {
        const result = await db.select().from(users);
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.json({ error: 'Error retrieving users', e });
    };
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const authSchema = CreateUserSchema.safeParse(body);

        if (authSchema.success) {
            const passwordHash = await bcrypt.hash(body.password, 10)
            const result = await db.insert(users).values({
                name: body.name,
                email: body.email,
                password: passwordHash
            });
            return NextResponse.json(result, { status:201 })
        } else {
            return NextResponse.json({ error: 'Invalid data!', status: 400 });
        }
    } catch (e) {
        return NextResponse.json({ error: 'Error add users', e });
    }
}