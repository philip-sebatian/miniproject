import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookiesStore = cookies();
    const token = cookiesStore.get("OutsiteJWT");

    if (!token) {
        return NextResponse.json(
            { message: "unauthorized" },
            { status: 401 }
        );
    }

    const { value } = token;
    const secret = process.env.JWT_SECRET;

    try {
        const decoded = verify(value, secret);
        return NextResponse.json(
            { message: "authorized", user: decoded.userName },
            { status: 200 }
        );
    } catch (e) {
        console.error("Verification error:", e);
        return NextResponse.json(
            { message: "unauthorized" },
            { status: 201 }
        );
    }
}

export async function POST() {

    cookies().delete("OutsiteJWT");
    return NextResponse.json({ message: "logout" }, { status: 200 });
}
