"use client";

import Input from "@/components/input";
import LoadingButton from "@/components/loading-button";
import Image from "next/image";
import { useFormState } from "react-dom";
import { CreateAccount } from "./action";

export default function CreateAccountPage() {
    const [state, trigger] = useFormState(CreateAccount, null);

    return (
        <div className="flex flex-col items-center justify-start w-full h-full gap-10 px-10">
            <Image
                src="/image/logo.png"
                alt="logo"
                width="100"
                height="100"
                priority={true}
                style={{
                    width: "auto",
                    height: "auto",
                }}
            />

            <form action={trigger} className="flex flex-col gap-3 ">
                <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    errors={state?.fieldErrors.email}
                />
                <Input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    errors={state?.fieldErrors.username}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    errors={state?.fieldErrors.password}
                />
                <LoadingButton name="Create" />
            </form>
            <span className="text-sm text-center w-full -mt-6">
                Will be redirect to login page if account created 😎
            </span>
        </div>
    );
}
