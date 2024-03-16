"use client";
import { Input } from "@/components";
import Loader from "@/components/Loader";
import InputEmail from "@/components/auth/InputEmail";
import InputPassword from "@/components/auth/InputPassword";
import Welcome from "@/components/auth/Welcome";
import { getToken, setTokenWithExpiration } from "@/utils/token";
import axios, { isAxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IoCheckmark } from "react-icons/io5";
import RememberMe from "@/components/auth/RememberMe";
import Link from "next/link";
import "@/styles/auth.css";

const Auth: React.FC<any> = ({ type }) => {
  const router = useRouter();
  const storedToken = getToken();

  if (storedToken) {
    router.push("/");
  }

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberme, setRememberme] = useState<boolean>(false);

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLoginUser = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post("/api/login", formData);

      setIsLoading(false);

      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: "Successfully log in!",
      });

      setTokenWithExpiration(response.data.authorization.token, 3600);

      router.push("/");
    } catch (error) {
      setIsLoading(false);
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "error",
          title: "Failed to login, username or password is wrong!",
        });
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "error",
          title: "Internal server error, please login again later!",
        });
      }
    }

    setEmail("");
    setPassword("");
  };

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
          <h1 className="text-[40px] font-bold">Log In To Your Account</h1>
          <h2 className="text-[16px]">Manage All Data For CC's Website</h2>
          <InputEmail email={email} setEmail={setEmail} className="mt-8" />
          <InputPassword
            className="mt-6"
            password={password}
            setPassword={setPassword}
          />

          <div className="flex mt-3 justify-between items-center">
            <RememberMe rememberme={rememberme} setRememberme={setRememberme} />
            <Link href={"#"} className="text-[12px] text-secondary">
              Forgot Your Password?
            </Link>
          </div>
          <button className="button-login rounded-[5px] mt-8 w-full bg-[radial-gradient(100%_100%_at_0%_0%,#FFDE59_0%,#5EACDD_100%)] p-2">
            Login
          </button>
          <p className="text-[12px] mt-5 text-center">
            Don't Have An Account?{" "}
            <span className="text-secondary">Contact Your Admin</span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Auth;
