import User from "@/lib/models/user.model";
import { LoginData } from "@/types";
import { setCookies } from "@/utils/server-actions/cookies";
import { signJwt } from "@/utils/server-actions/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const form_data: LoginData = {
      email: data.email,
      password: data.password,
    };

    if (!form_data?.email || !form_data?.password) {
      throw new Error("Data is not given properly");
    }
    const user = await User.findOne({ email: form_data?.email });

    const isPasswordSame: boolean = await user?.checkPassword(
      form_data?.password,
      user.password
    );
    if (!user || !isPasswordSame) {
      throw new Error("Email or Password is incorrect");
    }

    const token = signJwt({ id: user?._id });
    console.log({ token: token });
    setCookies(token);

    NextResponse.json({ msg: "User logged in", user: user }, { status: 200 });
  } catch (err: any) {
    NextResponse.json({ msg: err }, { status: 500 });
  }
}
