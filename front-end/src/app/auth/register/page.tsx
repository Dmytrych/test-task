'use client'

import RegistrationForm from "@/features/auth/components/RegistrationForm";
import {register} from "@/common/api/auth/auth.repository";
import {RegistrationFormData} from "@/features/auth/types";
import {signIn, useSession} from "next-auth/react";
import {redirect} from "next/navigation";

const RegisterPage = () => {
  const session = useSession();

  if (session.data) {
    redirect("/");
  }

  const handleSubmit = async (formData: RegistrationFormData) => {
    await register(formData.name, formData.email, formData.password)
      .then(() => signIn('credentials', {
        redirect: true,
        callbackUrl: "/"
      }));
  }

  return (
    <RegistrationForm onSubmit={handleSubmit}/>
  );
}

export default RegisterPage;
