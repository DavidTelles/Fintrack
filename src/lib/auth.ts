import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function getAuthenticatedUser(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (token) {
        try {
            const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secretKey);
            return payload;
        } catch {
            return null;
        };
    };

    return null;
};

export async function requireAdmin(request: NextRequest) {
    const user = await getAuthenticatedUser(request);

    if (user?.role === "admin") {
        return user;
    }

    if (!user) {
        return null
    }

    return null
}