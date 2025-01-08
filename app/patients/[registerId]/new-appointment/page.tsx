/* eslint-disable @typescript-eslint/no-unused-vars */
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image"
// import Link from "next/link";


export default async function Appointment({params: { registerId }}: SearchParamProps) {

    const patient = await getPatient(registerId)
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
            registerId={registerId}
            patientId={patient?.$id}
            type="create"
            />

       
          <p className="justify-items-end texxt-dark-600 xl:text-left">
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