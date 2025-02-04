/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import PatientForm from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

import Image from "next/image"
import Link from "next/link";
import React from "react"

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";
  return (
    <span className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
          src="/assets/icons/logo-full.svg"
          height={1000}
          width={1000}
          alt={"patient"} 
          className="mb-12 h-10 w-fit"/>

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end texxt-dark-600 xl:text-left">
            © 2025 CarePulse
            </p>
            <Link href="/?admin=true" className="text-green-500">
            Admins Click Here
          
            </Link>
          </div>
        </div>
      </section>
      <Image 
      src="/assets/images/onboarding-img.png"
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[50%]"
      />
      </span>
  );
  
}



