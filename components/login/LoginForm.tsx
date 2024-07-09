"use client";

import React, { useState } from "react";
import { Checkbox, Button, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { postUserData } from "@/utils/api/auth/postUserData";
import { useRouter } from "next/navigation";
import { useUserState } from "@/store/useUserStore";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const { setUsername } = useUserState();

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    //The post logic has been moved to the utils folder
    const result = await postUserData("http://localhost:8000/api/login", {
      email,
      password,
    });
    setUsername(result.user.username);
    if (result) {
      router.push("/dashboard/url");
    } else {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-full p-6 mt-8 bg-white border border-gray-200 border-solid shadow w-96 rounded-xl border-opacity-70 max-md:px-5"
    >
      <h2 className="text-xl font-semibold leading-7 text-zinc-900">Log In</h2>
      <Input
        // label={
        //   <span>
        //     Email Address <span className="text-red-500">*</span>
        //   </span>
        // }
        type="email"
        id="emailInput"
        placeholder="Enter your email"
        required
        fullWidth
        className="mt-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label={
          <span>
            Password <span className="text-red-500">*</span>
          </span>
        }
        type="password"
        id="passwordInput"
        placeholder="Enter your password"
        required
        fullWidth
        className="mt-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-between w-full gap-3 mt-3">
        <Checkbox size="sm" id="rememberMe">
          Remember me
        </Checkbox>
        <p className="my-auto text-sm leading-5 text-ellipsis text-zinc-500">
          <Link href="/forgot-password" passHref legacyBehavior>
            <a className="inline-flex text-blue-500">Forgot password?</a>
          </Link>
        </p>
      </div>
      {isLoading ? (
        <Spinner className="mt-5 " />
      ) : (
        <Button color="primary" type="submit" className="mt-3 font-medium">
          Login
        </Button>
      )}
      <div className="flex items-center justify-center gap-2 mt-6 text-xs leading-4 text-center text-zinc-500">
        <div className="self-stretch flex-1 h-px my-auto shrink-0 bg-zinc-200"></div>
        <div className="self-stretch" aria-hidden="true">
          OR
        </div>
        <div className="self-stretch flex-1 h-px my-auto shrink-0 bg-zinc-200"></div>
      </div>
      <Button className="mt-6" color="default">
        <div className="flex items-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/86b6587d7c3978e68123d2d756f48614a9c8ab05132aba370ce2ee8ba6fea75e?apiKey=6e8a6127015d45199b071b5b69920048&"
            alt="Google logo"
            className="w-5 mr-2 shrink-0 aspect-square"
          />
          Continue with Google
        </div>
      </Button>
      <div className="flex items-center justify-center mt-4">
        <p className="text-black">
          Need to create an account?{" "}
          <Link href="/sign-up" passHref legacyBehavior>
            <a className="inline-flex text-blue-500">Sign Up</a>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
