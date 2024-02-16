"use client";
import "./editprofilepanel.css";
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
import userInfoStore from "@/zustand/userInfoStore";
import toggleStore from "@/zustand/toggleStore";
// appwrite
import { db, appwriteKeys } from "@/appwrite";
// assets
import Image from "next/image";
import close_logo from "@/public/xmark-solid.svg";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "must be at least 3 letter or more" })
    .max(20, { message: "must be under 20 letters" }),
  username: z
    .string()
    .min(3, { message: "must be at least 3 letter or more" })
    .max(64, { message: "must be under 64 letters" }),
  description: z.string(),
});

export default function EditProfilePanel() {
  let { userInformation_f } = userInfoStore((state) => state);
  let { toggleEditPanel_f } = toggleStore((state) => state);
  let handleClose = () => {
    toggleEditPanel_f(false);
  };
  return (
    <>
      <article className="inputPanel">
        <section className="inputPanel__panel">
          <div className="inputPanel__panel__container ">
            <h1 className="text-[2.4rem] font-bold">Edit your profile</h1>
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
          <Edits />
        </section>
      </article>
    </>
  );
}

let Edits = () => {
  let { userInformation, userInformation_f } = userInfoStore((state) => state);
  let { toggleEditPanel_f } = toggleStore((state) => state);
  // 1 Defining form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // ! default values
    defaultValues: {
      name: userInformation?.name,
      username: userInformation?.username,
      description: userInformation?.description,
    },
  });
  // 2 Submit function
  let { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    await db
      .updateDocument(
        appwriteKeys.db_id!,
        appwriteKeys.usersCollectionId!,
        userInformation.$id,
        {
          name: values.name,
          username: values.username,
          description: values.description,
        }
      )
      .then((res) => {
        toast({
          description: "Your Info was updated successfully",
        });
        userInformation_f(res);
        toggleEditPanel_f(false);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: "something went wrong",
        });
        console.log(err);
      });
  };
  const inputs: inputs[] = [
    { name: "name", placeholder: "name", inputType: "string" },
    { name: "username", placeholder: "username", inputType: "string" },
    { name: "description", placeholder: "Description", inputType: "string" },
  ];
  return (
    <>
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
            className="bg-white rounded-full py-[1.6rem] hover:text-white text-[1.3rem] text-black w-full !mt-[4rem]"
          >
            Edit
          </Button>
        </form>
      </Form>
    </>
  );
};
