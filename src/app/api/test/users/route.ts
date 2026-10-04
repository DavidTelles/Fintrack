import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/src/lib/auth";

const users = [
    {
        "id": 1,
        "name": "david",
        "email": "david@gmail.com",
        "createdAt": "2026-10-04T04:43:13.601Z"
    },
    {
        "id": 2,
        "name": "joao",
        "email": "joao@gmail.com",
        "createdAt": "2026-10-04T04:43:13.601Z"
    },
    {
        "id": 3,
        "name": "angela",
        "email": "angela@gmail.com",
        "createdAt": "2026-10-04T04:43:13.601Z"
    },
]

export async function GET(request: NextRequest) {
    const user = await getAuthenticatedUser(request);

    if (user !== null) {
        try {
            const result = users;
            return NextResponse.json(result);
        } catch (e) {
            console.error(e);

            return NextResponse.json({
                error: "Error retrieving users"
            }, { status: 500 });
        }
    }

    return NextResponse.json({ message: "You need be authenticated to view users!" }, { status: 401 })
};