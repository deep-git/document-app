"use client";

import { z } from "zod";

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { Router } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters."
    }),
    email: z.string().email(),
    password: z.string().min(6)
})

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | undefined>();
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push("/dashboard");
        }

        console.log(session?.status);
    }, [session?.status, router]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const response = await axios.post("/api/register", values);

        console.log(response);

        if (response.status !== 200) {
            setResult("Invalid credentials");
        } else if (response.status === 200) {
            signIn("credentials", {
                ...values,
                redirect: false
            }).then((callback) => {
                if (callback?.ok) {
                    setResult("Successfully logged in!");
                    router.push("/dashboard");
                }
            })
        }
        
        setIsLoading(false);
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false }).then((callback) => {
            if (callback?.error) {
                setResult("Invalid credentials");
            }

            if (callback?.ok && !callback?.error) {
                setResult("Logged in!");
                router.push("/dashboard");
            }
        }).finally(() => setIsLoading(false));
    }

  return (
    <MaxWidthWrapper>
        <div className="flex flex-col justify-center gap-5 items-center h-[calc(100vh-64px)] text-white">
            <h2 className="text-[2em] md:text-[3em] font-semibold text-white">Register</h2>
            <div className="w-[85%] md:w-80">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <FormField control={form.control} name="username" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input className="text-zinc-600" placeholder="Username" type="text" disabled={isLoading} {...field}/>
                                </FormControl>
                                <FormDescription className="text-zinc-300">This is your public display name.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input className="text-zinc-600" placeholder="Email Address" type="email" disabled={isLoading} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input className="text-zinc-600" placeholder="Password" type="password" disabled={isLoading} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                        <Button type="submit" className="mt-4 border-[2px] hover:bg-white hover:text-primary" disabled={isLoading}>Register</Button>
                    </form>
                </Form>

                {result && (
                    <span className="mt-3 rounded-lg text-rose-500 font-semibold">{result}</span>
                )}

                <div className="flex justify-center items-center gap-2 mt-5">
                    Already have an account?
                    <Link href="/login" className="underline">Login</Link>
                </div>
            </div>
        </div>
    </MaxWidthWrapper>
  )
}

export default Register;