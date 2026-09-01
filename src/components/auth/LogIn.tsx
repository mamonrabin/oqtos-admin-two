/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, LogIn as LoginIcon } from "lucide-react";
import logo from "@/assets/logo/qutox.webp";
import { useSingIn } from "@/hooks/auth.hook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosInstance } from "@/lib/AxiosInstance";

type LoginForm = {
  email: string;
  password: string;
};

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
 const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });


   const { mutate, isPending } = useSingIn();

  

  const onSubmit = async (data: LoginForm) => {
  const payload = {
    email: data.email,
    password: data.password,
  };

  mutate(payload, {
    onSuccess: (res) => {
      const user = res?.data?.user;

      if (user?.role !== "SUPER_ADMIN") {
        toast.error("You are not authorized as Super Admin");
        return;
      }

      reset();

      toast.success(res?.message || "Successfully you get access");

       

      router.push("/dashboard");

      
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Something went wrong. Please try again.",
      );
    },
  });
};

  return (
    <div className="w-2xl rounded bg-white p-8 shadow md:p-12">
      <div>
        <Image src={logo} alt="logo" width={100} height={100} />
        <p className="pb-2 text-base font-medium text-gray-600">
          Enter your registered email and password to login.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>

          <div className="relative pt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail size={18} className="text-gray-400" />
            </div>

            <input
              type="email"
              placeholder="superadmin@gmail.com"
              className="w-full rounded border border-gray-300 bg-gray-50 py-2.5 pr-4 pl-10 outline-none transition-all duration-200 hover:bg-white focus:border-transparent focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
            />
          </div>

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="relative pt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock size={18} className="text-gray-400" />
            </div>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full rounded border border-gray-300 bg-gray-50 py-2.5 pr-12 pl-10 outline-none transition-all duration-200 hover:bg-white focus:border-transparent focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded bg-gradient-to-r from-blue-600 to-blue-700 py-2.5 font-medium text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <>
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Signing in...
            </>
          ) : (
            <>
              <LoginIcon size={18} />
              Sign In
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LogIn;