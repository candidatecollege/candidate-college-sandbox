"use client";

import InputEmail from "@/components/auth/InputEmail";
import InputPassword from "@/components/auth/InputPassword";
import Welcome from "@/components/auth/Welcome";
import { getToken } from "@/utils/token";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import RememberMe from "@/components/auth/RememberMe";
import Link from "next/link";
import "@/styles/auth.css";
import { useLoginForm } from "@/hooks/useAuthLoginForm";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Auth: React.FC<any> = ({ type }) => {
  const router = useRouter();
  const storedToken = getToken();
  const { email, setEmail, password, setPassword, isLoading, handleLogin } =
    useLoginForm();

  if (storedToken) {
    router.push("/");
  }

  const [rememberme, setRememberme] = useState<boolean>(false);

  return (
    <main className="flex bg-primary min-h-screen">
      <Welcome />
      <section className="flex-1 flex justify-center items-center">
        <div className="w-[70%]">
          <Image
            alt="Logo Full CC"
            height={100}
            width={100}
            className="w-[142px]"
            src={"/logo-full-cc.png"}
          />
          <h1 className="text-4xl font-bold text-white">
            Log In To Your Account
          </h1>
          <h2 className="text-sm mt-2 text-white">
            Manage All Data For CC&apos;s Website
          </h2>
          <form onSubmit={handleLogin}>
            <InputEmail email={email} setEmail={setEmail} className="mt-8" />
            <InputPassword
              className="mt-6"
              password={password}
              setPassword={setPassword}
            />

            <div className="flex mt-3 justify-between items-center">
              <RememberMe
                rememberme={rememberme}
                setRememberme={setRememberme}
              />
              <Link href={"#"} className="text-xs text-secondary">
                Forgot Your Password?
              </Link>
            </div>
            <button
              disabled={isLoading ? true : false}
              type="submit"
              className="button-login rounded-small flex justify-center items-center mt-8 w-full bg-[radial-gradient(100%_100%_at_0%_0%,#FFDE59_0%,#5EACDD_100%)] p-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                  Loading...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="text-xs  mt-5 text-center text-white">
            Don&apos;t Have An Account?{" "}
            <span className="text-secondary">Contact Your Admin</span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Auth;
