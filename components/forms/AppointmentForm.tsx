/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from "@/components/ui/button"
import {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Form,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormControl,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormDescription,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormField,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormItem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormLabel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormMessage,
} from "@/components/ui/form"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
 

 
const  AppointmentForm = ({
  registerId, patientId, type
}: {
  registerId: string;
  patientId: string;
  type: "create" | "cancel";
}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const router = useRouter()
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })
 
  // 2. Define a submit handler.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
                <h1 className="header">New Appointment</h1>
                <p className="text-dark-700">Request a new Appointment in 10 seconds</p>
            </section>

        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="assets/icons/user.svg"
            iconAlt="user"
            />

        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="JohnDoe@email.com"
            iconSrc="assets/icons/email.svg"
            iconAlt="email"
            />

        <CustomFormField 
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="(555) 123 4567"
            />

        
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
    </Form>
  )
}

export default AppointmentForm