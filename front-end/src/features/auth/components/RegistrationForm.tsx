'use client'

import React, { useState } from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { RegistrationFormData } from "../types";

type RegistrationFormProps = {
  onSubmit: (data: RegistrationFormData) => void;
}

const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your name"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your password"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
