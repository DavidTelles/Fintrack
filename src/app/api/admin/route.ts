import { requireAdmin } from "@/src/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const auth = await requireAdmin(request);

    if(auth?.role !== "admin") {
        return NextResponse.json({ message: "you don't have permission!" }, { status: 403 })
    };

    if(!auth) {
        return NextResponse.json({ message: "You need to be authenticated" }, { status: 401 })
    };

    return NextResponse.json({ message: "Sucesfull!" }, {status: 200});
};