// "use client"
// import * as React from 'react'

import {AppointmentForm} from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image"
// import Link from "next/link";
import * as Sentry from '@sentry/nextjs'
import { SearchParamProps } from "@/types";


const Appointment = async (props: SearchParamProps) => {
  const params = await props.params;

  const {
    registerId
  } = params;

  const patient = await getPatient(registerId);
  Sentry.metrics.set("user_view_new-appointment", patient.name)

  return (
  <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[860px] flex-1 justify-between">
        <Image 
        src="/assets/icons/logo-full.svg"
        height={1000}
        width={1000}
        alt={"patient"} 
        className="mb-12 h-10 w-fit"/>

<AppointmentForm
            patientId={patient?.$id}
            registerId={registerId}
            type="create"
          />

     
        <p className="copyright mt-10 py-12">
          © 2025 CarePulse
          </p>
        </div>
      
    </section>
    <Image 
    src="/assets/images/appointment-img.png"
    height={1000}
    width={1000}
    alt="appointment"
    className="side-img max-w-[390px] bg-bottom"
    />
    </div>
);
}

export default Appointment;
