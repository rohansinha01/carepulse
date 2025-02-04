'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import PatientForm from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Home = (props: SearchParamProps) => {
  const [searchParams, setSearchParams] = useState<{ [key: string]: string | string[] | undefined } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Resolve the promise when the component mounts
    const resolveSearchParams = async () => {
      const params = await props.searchParams;
      setSearchParams(params);
      setIsAdmin(params?.admin === "true");
    };

    resolveSearchParams();
  }, [props.searchParams]);

  if (searchParams === null) {
    return <div>Loading...</div>; // Optionally handle loading state
  }

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 CarePluse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
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
    </div>
  );
};

export default Home;
