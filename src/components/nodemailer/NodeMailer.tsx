"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FormField } from "./FormField";
import { useForm } from "react-hook-form";
import { DialogContainer } from "./Dialog";

const NodeMailer = () => {

  const [open, setOpen] = useState(true);

  return (
    <section className="bg-white min-h-screen relative">
      <DialogContainer open={open} handleOnChange={(state:boolean)=> setOpen(state)}/>
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="text-4xl  md:text-5xl font-semibold text-black outfit-600 py-5">
          Nodemailer Client
        </h1>
        <FormContainer />
      </div>
    </section>
  );
};

export default NodeMailer;

const emailFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  appPassword: z.string().min(1, "App password is required"),

  smtpHost: z.string().min(1, "SMTP host is required"),
  port: z.coerce.number().min(1, "Port is required").max(65535, "Invalid port"),

  ToName: z.string().min(1, "From name is required"),
  ToEmail: z.string().email("Invalid from email"),

  content: z.string().min(1, "Content is required"),

  secure: z.boolean().default(true),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;
type EmailFormInput = z.input<typeof emailFormSchema>;

const FormContainer = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EmailFormInput, undefined, EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
      appPassword: "",
      smtpHost: "",
      port: 587,
      ToName: "",
      ToEmail: "",
      content: "",
      secure: true,
    },
  });

 

  const secure = watch("secure");

  const onSubmit = (data: EmailFormValues) => {
    alert(JSON.stringify(data));
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col  gap-5 justify-between items-start space-y-5 outfit-400"
    >
      <section className="space-y-5 w-full">
        <div className="flex justify-between items-start gap-2">
          <FormField label="Email" error={errors.email?.message}>
            <Input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
          </FormField>

          <FormField label="App Password" error={errors.appPassword?.message}>
            <Input
              type="password"
              placeholder="App password"
              {...register("appPassword")}
            />
          </FormField>
        </div>

        <div className="flex justify-between items-start gap-2">
          <FormField label="SMTP Host" error={errors.smtpHost?.message}>
            <Input placeholder="smtp.gmail.com" {...register("smtpHost")} />
          </FormField>

          <FormField label="Port" error={errors.port?.message}>
            <Input type="number" {...register("port")} />
          </FormField>
        </div>
      </section>
      <section className="space-y-5 w-full">
        <div className="flex justify-between items-start gap-2">
          <FormField label="To Name" error={errors.ToName?.message}>
            <Input placeholder="My Application" {...register("ToName")} />
          </FormField>

          <FormField label="To Email" error={errors.ToEmail?.message}>
            <Input
              type="email"
              placeholder="no-reply@example.com"
              {...register("ToEmail")}
            />
          </FormField>
        </div>

        <FormField label="Content" error={errors.content?.message}>
          <Textarea
            rows={20}
            placeholder="Email content..."
            {...register("content")}
          />
        </FormField>

        <div className="flex items-start gap-3">
          <Switch
            checked={secure}
            className="bg-black"
            onCheckedChange={(value) => setValue("secure", value)}
          />

          <span>Use secure connection</span>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-black text-white cursor-pointer">
            Save Configuration
          </Button>
        </div>
      </section>
    </form>
  );
};
