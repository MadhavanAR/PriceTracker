"use client";

import React, { useEffect, useState } from "react";
import { Checkbox, Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { postUserData } from "@/utils/api/auth/postUserData";
import { Eye, EyeSlash } from "phosphor-react";
import { usePost } from "@/hooks/usePost";
import FormSubmitButton from "@/components/formSubmitButton";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [buttonDisable, setButtonDisable] = useState(true);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { handleSubmit, isLoading } = usePost(
    `/api/sign-up`,
    {
      username: user?.username,
      email: user?.email,
      password: user?.password,
      confirmPassword: user?.confirmPassword,
    },
    "/dashboard",
    true
  );

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      user.password === user.confirmPassword
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-full p-6 mt-8 bg-white border border-gray-200 border-solid shadow w-96 rounded-xl border-opacity-70 max-md:px-5"
    >
      <h1 className="text-xl font-semibold leading-7 text-zinc-900">Sign Up</h1>
      <Input
        label={
          <span>
            Email Address <span className="text-red-500">*</span>
          </span>
        }
        type="email"
        id="email"
        placeholder="Enter your email"
        required
        fullWidth
        className="mt-3"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Input
        label={
          <span>
            Username <span className="text-red-500">*</span>
          </span>
        }
        type="text"
        id="username"
        placeholder="Enter your username"
        required
        fullWidth
        className="mt-3"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <Input
        label={
          <span>
            Password <span className="text-red-500">*</span>
          </span>
        }
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlash size={20} color="black" />
            ) : (
              <Eye size={20} color="black" />
            )}
          </button>
        }
        id="password"
        placeholder="Enter your password"
        required
        fullWidth
        className="mt-3"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Input
        label={
          <span>
            Confirm Password <span className="text-red-500">*</span>
          </span>
        }
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlash size={20} color="black" />
            ) : (
              <Eye size={20} color="black" />
            )}
          </button>
        }
        id="confirmPassword"
        placeholder="Confirm your password"
        required
        fullWidth
        className="mt-3"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
      />
      <FormSubmitButton isLoading={isLoading}>Sign Up</FormSubmitButton>
      <div className="flex items-center justify-center gap-2 mt-6 text-xs leading-4 text-center whitespace-nowrap text-zinc-500">
        <div className="self-stretch flex-1 h-px my-auto shrink-0 bg-zinc-200"></div>
        <span className="self-stretch">OR</span>
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
          Already have an account?{" "}
          <Link href="/login" passHref legacyBehavior>
            <a className="inline-flex text-blue-500">Login</a>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
