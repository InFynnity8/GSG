"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  message: z
    .string()
    .min(5, "Please provide at least 5 characters.")
    .max(1000, "Please keep it under 1000 characters."),
});

export default function WriteToUs() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await api.post("/contact", data);
      toast.success("Thank you! Your message has been sent — we'll get back to you soon.", {
        position: "bottom-right",
      });
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send your message. Please try again.", {
        position: "bottom-right",
      });
    }
  }

  return (
    <Card className="w-full sm:max-w-md bg-transparent text-white border-none p-0">
      <CardHeader className="p-0 ">
        <CardTitle>Write to us:</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <form id="form-write-to-us" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="form-rhf-input-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Name"
                    className="text-zinc-900  rounded-none bg-white placeholder:text-zinc-400"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="form-rhf-input-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email"
                    className="text-zinc-900  rounded-none bg-white placeholder:text-zinc-400"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
        
            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Textarea
                    {...field}
                    id="form-rhf-textarea-about"
                    aria-invalid={fieldState.invalid}
                    placeholder="Message"
                    className="min-h-[120px] rounded-none text-zinc-900  bg-white placeholder:text-zinc-400"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="p-0">
        <Field orientation="horizontal">
          <Button type="submit" disabled={form.formState.isSubmitting} className="cursor-pointer rounded-none w-full" form="form-write-to-us">
            {form.formState.isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
