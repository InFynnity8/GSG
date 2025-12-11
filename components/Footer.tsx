"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaYoutube, FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPaperPlane, FaHome } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import WriteToUs from "@/components/forms/WriteToUs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Home, Phone, Plane } from "lucide-react";

const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <div className="w-full bg-zinc-950 text-primary-foreground">
      <div className="min-h-[40vh] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-zinc-800 gap-20 py-10 px-4 md:px-20">
        <ul className="gap-4 flex flex-col">
          <li className="mb-2 flex items-center gap-2">
           <FaHome size={15} className="min-w-4"/>  A God Seeking Generation, Post Office Box
            AN 7933, Obomeng - Kwahu, Ghana.
          </li>
          <li className="mb-2 flex items-center gap-2">
            <Phone size={15} className="min-w-4"/> +233 552 010 444 | +233 552 010 333
          </li>
          <li className="mb-2 flex items-center gap-2">
           <FaPaperPlane size={15} className="min-w-4"/> GSG - Obomeng, Kwahu, Ghana
          </li>
          <li className="mb-2 flex items-center gap-2"> <FaEnvelope size={15} className="min-w-4"/> General Information: gsg@newbirth.com</li>
        </ul>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="font-semibold text-lg">Follow Us</p>
            <div className="flex items-center py-2 space-x-4 text-primary">
              <FaYoutube
                className="hover:opacity-80 cursor-pointer"
                size={18}
              />
              <FaFacebookF
                className="hover:opacity-80 cursor-pointer"
                size={18}
              />
              <FaInstagram
                className="hover:opacity-80 cursor-pointer"
                size={18}
              />
              <FaTwitter
                className="hover:opacity-80 cursor-pointer"
                size={18}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-normal mb-2 text-lg">
              Sign-up to receive our newsletter
            </p>
            <div className="flex items-center space-x-4 text-primary">
              <form
                className=" w-full"
                id="form-rhf-write"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FieldGroup className="gap-4">
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-input-email">
                          Email
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-rhf-input-email"
                          aria-invalid={fieldState.invalid}
                          placeholder="Email"
                          className="text-zinc-900 rounded-none bg-white placeholder:text-zinc-400 w-full"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
                <Button
                  type="submit"
                  className="cursor-pointer rounded-none mt-4 w-full"
                  form="form-rhf-write"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className="">
          <WriteToUs />
        </div>
      </div>

      <div className="max-w-7xl py-8 mx-auto flex flex-col md:flex-row gap-5 md:gap-15 justify-start items-center p-4">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/GSG.png" alt="Logo" width={50} height={50} />

          <div className=" sm:block text-white font-semibold leading-tight text-sm">
            A GOD SEEKING <br></br> GENERATION
          </div>
        </Link>
        <div className="">
          <p>Terms & Conditions | Privacy Policy | Refund Policy</p>
          <p className="text-sm text-white">
            &copy; {currentYear} A God Seeking Generation. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
