"use client";
import "./loginpanel.css";
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
// zustand
import toggleStore from "@/zustand/toggleStore";
// assets
import Image from "next/image";
import close_logo from "@/public/xmark-solid.svg";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(8, { message: "wrong password" }),
});

/*===============================================================================================*/
// main component section
/*===============================================================================================*/
export default function LoginPanel() {
  let { toggleLogin_f, toggleSignIn_f } = toggleStore((state) => state);
  let handleClose = () => toggleLogin_f(false);
  let handleSwitchPanel = () => {
    toggleLogin_f(false);
    toggleSignIn_f(true);
  };
  return (
    <>
      <article className="bg-[#2e2d2da8] absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <section className="bg-black min-h-[10rem] rounded-lg w-[40rem] p-[2rem]">
          <div className="flex justify-between items-center text-[1.3rem] ">
            <h1 className="text-[2.4rem] font-bold">Login</h1>
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
          <Login />
          <p className="text-center mt-[2rem] text-gray-300">
            First time using Twitter?{" "}
            <button
              onClick={handleSwitchPanel}
              className="text-white font-bold"
            >
              {" "}
              Create an account
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

const Login = () => {
  // 1 Defining form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // ! default values
    defaultValues: {
      email: "",
    },
  });
  // 2 Submit function
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  const inputs: inputs[] = [
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
                      className="bg-transparent hover:text-white border indent-[1rem] text-[1.1rem] py-[1.6rem] border-gray-400"
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
          className="bg-white rounded-full py-[1.6rem] text-[1.3rem] text-black w-full !mt-[6rem]"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};
