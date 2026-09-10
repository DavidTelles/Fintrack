import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { LoginSchema } from "@/src/schemas/users.schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { SignJWT } from "jose"
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const body = await request.json();
    const authSchema = LoginSchema.safeParse(body);
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    if(!authSchema.success) {
        return NextResponse.json({ error: 'Invalid login data' }, { status: 400 })
    }

    try {
        const result = await db.select().from(users).where(eq(users.email, authSchema.data.email));
        const user = result[0];
        
        if(result.length == 0) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
        }
        
        const passowrdMatchs = await bcrypt.compare(authSchema.data.password, user.password)
        if (!passowrdMatchs) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
        }

        const token = await new SignJWT({
            userId: user.id,
            email: user.email,
        })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret)

        const response = NextResponse.json({ message: 'Login successful' }, { status: 200 })
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 604800,
        })

        return response;
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Error internal server' }, {status: 500})
    }
}