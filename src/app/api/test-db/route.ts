import { db } from "@/src/db/index";
import { users } from "@/src/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await db.select().from(users);
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.json({ error: 'Error ao buscar usuários', e });
    };
};