"use client"
import { useState } from "react";
import trpc from "@/trpcClient";
import { setToken } from "@/trpcClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AdminLoginPage = () => {
  const { replace } = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token: {accessToken, refreshToken} } = await trpc.adminLogin.mutate({
        email: formData.email,
        password: formData.password
      })
      setToken(accessToken, refreshToken)
      toast.success("Admin logged in successfully!");
      replace('/admin')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-1">
      <div className="bg-[#202223] text-center pt-20 text-3xl font-semibold text-white w-full">
        <h1>Admin Login</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-20">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="focus:outline-none border-b-2 border-opacity-30 focus:border-b-[#202223] transition-colors duration-300"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="focus:outline-none border-b-2 border-opacity-30 focus:border-b-[#202223] transition-colors duration-300"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="self-start py-2 px-4 bg-[#202223] font-semibold text-sm text-white rounded-lg">
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
