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
import { RadioGroup } from "../ui/radio-group"
import { GenderOptions } from "@/constants"
import { RadioGroupItem } from "@radix-ui/react-radio-group"
import { Label } from "@radix-ui/react-label"
 

const  RegisterForm = ({ user }: {user: User }) => {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
            <section className="space-y-4">
                <h1 className="header">Welcome!</h1>
                <p className="text-dark-700">Let us know more about yourself</p>
            </section>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">
                Personal Information
            </h2>  
            </div>
            

        </section>

        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
            />

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="JohnDoe@email.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
            />

        <CustomFormField 
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="(555) 123 4567"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of Birth"
            />

        <CustomFormField 
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
                <FormControl>
                   <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                   onValueChange={field.onChange}
                   defaultValue={field.value}>
                    {GenderOptions.map((option) => (
                       <div key={option} className="radio-group">
                        <RadioGroupItem value= {option} id={option} />
                        <Label htmlFor={option}
                        className="cursor-pointer">
                            {option}
                        </Label>
                       </div>
                    ))}
                    
                    </RadioGroup> 
                </FormControl>
            )}
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            
        </div>
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
    </Form>
  )
}

export default RegisterForm