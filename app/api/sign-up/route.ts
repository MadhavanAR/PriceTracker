import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data);

    const form_data = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    if (!form_data.username || !form_data.email || !form_data.password) {
      throw new Error("Data is not given properly");
    }
    const user = await User.create(form_data);
    NextResponse.json({ msg: "User created", user: user }, { status: 201 });
  } catch (err: any) {
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
