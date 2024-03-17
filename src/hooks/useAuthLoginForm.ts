import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setTokenWithExpiration } from "@/utils/token";
import Swal from "sweetalert2";

export const useLoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post("/api/login", formData);
      setIsLoading(false);
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: "Successfully logged in!",
      });

      setTokenWithExpiration(response.data.authorization.token, 3600);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        title: "Login failed. Please try again.",
      });
    }
  };

  return { email, setEmail, password, setPassword, isLoading, handleLogin };
};
