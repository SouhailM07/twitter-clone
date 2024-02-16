"use client";
import "./signinpanel.css";
// appwrite
import { createNewUser } from "@/lib/api";
// ? types
import { inputs } from "@/types";
// form
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// shadcn-ui
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
// zustand
import toggleStore from "@/zustand/toggleStore";
// assets
import Image from "next/image";
import close_logo from "@/public/xmark-solid.svg";

const formSchema = z.object({
  name: z.string().min(3, { message: "must be at least 3 letter or more" }),
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(7, { message: "wrong password" }),
});

/*===============================================================================================*/
// main component section
/*===============================================================================================*/
export default function SignInPanel() {
  let { toggleLogin_f, toggleSignIn_f } = toggleStore((state) => state);
  let handleClose = () => toggleSignIn_f(false);
  let handleSwitchPanel = () => {
    toggleSignIn_f(false);
    toggleLogin_f(true);
  };
  return (
    <>
      <article className="bg-[#2e2d2da8] absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <section className="bg-black min-h-[10rem] rounded-lg w-[40rem] p-[2rem]">
          <div className="flex justify-between items-center text-[1.3rem] ">
            <h1 className="text-[2.4rem] font-bold">Create an account</h1>
            <Image
              onClick={handleClose}
              src={close_logo}
              width={18}
              height={18}
              alt="logo"
              aria-label="close login panel"
              role="button"
            />
          </div>
          <SignIn />
          <p className="text-center mt-[2rem] text-gray-300">
            Already have an account?{" "}
            <button
              onClick={handleSwitchPanel}
              className="text-white font-bold"
            >
              Login
            </button>
          </p>
        </section>
      </article>
    </>
  );
}

/*===============================================================================================*/
// small components section
/*===============================================================================================*/

const SignIn = () => {
  let { toggleSignIn_f } = toggleStore((state) => state);
  // 1 Defining form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // ! default values
    defaultValues: {
      email: "",
    },
  });
  // 2 Submit function
  let { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createNewUser(values).then((res) => {
      if (res == "user exist") {
        // toast.error("user exist !");
        toast({
          variant: "destructive",
          description: "user is already exist",
        });
      } else if (res == "access") {
        toast({
          description: "your account was created",
        });
        toggleSignIn_f(false);
      } else {
        toast({
          variant: "destructive",
          description: "something went wrong",
        });
      }
    });
  };
  const inputs: inputs[] = [
    { name: "name", placeholder: "name", inputType: "string" },
    { name: "email", placeholder: "Email", inputType: "string" },
    { name: "password", placeholder: "password", inputType: "password" },
  ];
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mt-[2rem]"
      >
        {inputs.map((e: any, i) => {
          return (
            <FormField
              key={i}
              control={form.control}
              name={e.name}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={e.inputType}
                      className="bg-transparent border indent-[1rem] text-[1.1rem] py-[1.6rem] border-gray-400"
                      placeholder={e.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button
          type="submit"
          className="bg-white rounded-full py-[1.6rem] hover:text-white text-[1.3rem] text-black w-full !mt-[6rem]"
        >
          Register
        </Button>
      </form>
    </Form>
  );
};
