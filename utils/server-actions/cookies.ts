"use server";

import { cookies } from "next/headers";
export const setCookies = (token: string) => {
  const cookieStore: any = cookies();

  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
  });
  // console.log(cookieStore.get("token"))
  return cookieStore.has("session") ? true : false;
};

export const getCookies = (name: string) => {
  const cookieStore = cookies();
  const result = cookieStore.get(name)?.value;
  return result;
};
