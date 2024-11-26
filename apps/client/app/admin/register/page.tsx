"use client"
import { useState } from "react";
import trpc from "@/trpcClient";
import { setToken } from "@/trpcClient";

const AdminPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send form data to tRPC backend
      const { token: {accessToken, refreshToken} } = await trpc.registerAdmin.mutate({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      console.log("setting these: ", accessToken, refreshToken)
      setToken(accessToken, refreshToken)
      alert("Admin registered successfully!");
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
