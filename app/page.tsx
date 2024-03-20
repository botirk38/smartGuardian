"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { signup } from "../actions/action";
import { useFormStatus } from "react-dom";
import { set, z } from "zod";
import { toast, useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Image from "next/image";
import { JSX, SVGProps, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { rust } from "@codemirror/lang-rust";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type Attack = {
    id: number;
    name: string;
    description: string;
    severity: string;
};

type Vulnerabilities = {
    percentage: number;
    attacks: Attack[];
};

type Plan = {
    id: number;
    name: string;
    description: string;
    price: number;
};

const contactSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    contactEmail: z.string().email(),
    message: z.string().min(5),
});

export default function Home() {
    const [value, setValue] = React.useState(`fn main() {
      println!("Hello, World!");
  }`);
    const { toast } = useToast();

    const { pending } = useFormStatus();

    const initialSolanaVulnerabilities: Vulnerabilities = {
        percentage: 60, // Example percentage of contracts potentially vulnerable
        attacks: [
            {
                id: 1,
                name: "Reentrancy Attacks",
                description:
                    "Attackers may exploit the call-back functionality of a smart contract to drain funds or cause unexpected behavior.",
                severity: "high",
            },
            {
                id: 2,
                name: "Integer Overflow and Underflow",
                description:
                    "Improper arithmetic operation handling leading to overflow or underflow, affecting the contract's logic.",
                severity: "low",
            },
            {
                id: 3,
                name: "Signature Malleability",
                description:
                    "Exploiting the malleability of digital signatures to alter the signer’s intent without their consent, potentially leading to asset theft.",
                severity: "low",
            },
            {
                id: 4,
                name: "Orphaned Accounts and Dust",
                description:
                    "Smart contracts leaving behind data or 'dust' in accounts that no longer have a purpose, wasting resources and potentially leading to vulnerabilities.",
                severity: "high",
            },
            {
                id: 5,
                name: "Program Logic Errors",
                description:
                    "Flaws in the contract logic that could lead to unintended consequences, such as locked funds or unauthorized actions.",
                severity: "high",
            },
            // Add more Solana-specific vulnerabilities as needed
        ],
    };

    const plans: Plan[] = [
        {
            id: 1,
            name: "Starter",
            description: "Perfect for small teams just getting started.",
            price: 29,
        },
        {
            id: 2,
            name: "Pro",
            description: "Ideal for growing teams looking to scale.",
            price: 99,
        },
        {
            id: 3,
            name: "Enterprise",
            description: "Tailored solutions for large organizations.",
            price: 299,
        },
    ];

    const [vulnerabilities, setVulnerabilities] =
        React.useState<Vulnerabilities>({
            percentage: 0,
            attacks: [],
        });

    const [loading, setLoading] = React.useState(false);
    const [contactLoading, setContactLoading] = React.useState(false);

    const onChange = React.useCallback(
        (val: React.SetStateAction<string>, viewUpdate: any) => {
            console.log("val:", val);
            setValue(val);
        },
        []
    );

    const featuresRef = useRef<HTMLElement | null>(null);
    const pricingRef = useRef<HTMLElement | null>(null);
    const contactRef = useRef<HTMLDivElement | null>(null);
    const topRef = useRef<HTMLElement | null>(null);
    const aboutRef = useRef<HTMLElement | null>(null);

    const scrollToFeatures = () => {
        featuresRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToPricing = () => {
        pricingRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToContact = () => {
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToTop = () => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const contactForm = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            contactEmail: "",
            message: "",
        },
    });

    const onContactSubmit = async (details: z.infer<typeof contactSchema>) => {
        console.log("Submitting");

        try {
            setContactLoading(true);
            const response = await fetch("/api/contact", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(details),
            });

            if (!response.ok) {
                const data = await response.text();
                console.log("Error data: ", data);
                toast({
                    title: "Contact failed.",
                    description: "Please try again.",
                });
                return;
            }

            const data = await response.json();
            console.log("Success: ", data);
            setContactLoading(false);

            toast({
                title: "Contact successful.",
                description: "We will get back to you in 24-48 hours",
            });
        } catch (err: any) {
            console.log("Server err: ", err);
            toast({
                title: "Contact failed.",
                description: "Please try again in 5 minutes.",
            });
        }
    };

    const onSubmit = async () => {
        const newArray: Vulnerabilities = {
            percentage: 0, // replace with actual value
            attacks: [], // replace with actual value
        };
        setVulnerabilities(newArray);
        setLoading(true);
        const response = await fetch("/api/analyze-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                repo_name: "test",
                path: "test",
                code: value,
                license: "MIT",
                size: value.length,
                language: "rust",
            }),
        });

        //const data: Vulnerabilities = await response.json();
        // setVulnerabilities(data);
        setTimeout(() => {
            setLoading(false);
            setVulnerabilities(initialSolanaVulnerabilities);

        }, 2000);

        // console.log("data:", data);
    };

    const features = [
        {
            title: "Infinite scalability, zero config",
            description:
                "Enable code to run on-demand without needing to manage your own infrastructure or upgrade hardware.",
        },
        {
            title: "Real-time insights and controls",
            description:
                "Get granular, first-party, real-user metrics on site performance per deployment.",
        },
        {
            title: "Personalization at the edge",
            description:
                "Deliver dynamic, personalized content, while ensuring users only see the best version of your site.",
        },
        {
            title: "Real-time insights and controls",
            description:
                "Get granular, first-party, real-user metrics on site performance per deployment.",
        },
        {
            title: "Personalization at the edge",
            description:
                "Deliver dynamic, personalized content, while ensuring users only see the best version of your site.",
        },
        {
            title: "Infinite scalability, zero config",
            description:
                "Enable code to run on-demand without needing to manage your own infrastructure or upgrade hardware.",
        },
    ];

    const teamMembers = [
        {
            id: 1,
            name: "Botir Khaltaev",
            role: "Co-Founder & CTO",
            imageSrc: "/botir.jpeg",
            description:
                "Passionate about creating innovative solutions to complex problems.",
        },
        {
            id: 2,
            name: "Mohammed Yasin",
            role: "Co-Founder & ML Lead",
            imageSrc: "/mohammed.jpg",
            description:
                "Turning innovative ideas into scalable and secure technology.",
        },
        {
            id: 3,
            name: "Younes Oudrhiri",
            role: "Co-Founder & Head of AI",
            imageSrc: "/younes.jpeg",
            description:
                "Turning innovative ideas into scalable and secure technology.",
        },
        {
            id: 4,
            name: "Yasir Makanoui",
            role: "Founder & CEO",
            imageSrc: "/yasir.jpeg",
            description:
                "Crafting beautiful experiences that merge form and function.",
        },
        {
            id: 5,
            name: "Tayib Sheikh",
            role: "Co-Founder & Head of Engineering",
            imageSrc: "/tayib.png",
            description:
                "Transforming code into seamless and scalable solutions.",
        },
        // Add more team members as needed
    ];

    const getSeverityClass = (severity: string) => {
        switch (severity) {
            case "high":
                return "bg-red-500";
            case "low":
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className="flex flex-col min-h-[100dvh] min-w-[100vw]">
            <header
                className="px-4 lg:px-6 h-14 flex items-center"
                ref={topRef}
            >
                <Link className="flex items-center justify-center" href="#">
                    <ShieldIcon className="h-6 w-6" />
                    <span className="sr-only">Guardian AI</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Button
                        variant={"link"}
                        className="text-sm text-green-500 font-medium hover:underline underline-offset-4"
                        onClick={scrollToFeatures}
                    >
                        Features
                    </Button>
                    <Button
                        variant={"link"}
                        className="text-sm text-green-500 font-medium hover:underline underline-offset-4"
                        onClick={scrollToPricing}
                    >
                        Pricing
                    </Button>
                    <Button
                        variant={"link"}
                        className="text-sm text-green-500 font-medium hover:underline underline-offset-4"
                        onClick={scrollToAbout}
                    >
                        About
                    </Button>
                    <Button
                        variant={"link"}
                        className="text-sm  text-green-500 font-medium hover:underline underline-offset-4"
                        onClick={scrollToContact}
                    >
                        Contact
                    </Button>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
                    <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                        <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                            <div>
                                <h1 className="lg:leading-tighter text-green-800 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                    The complete platform for securing smart
                                    contracts
                                </h1>
                            </div>
                            <div className="flex flex-col items-start space-y-4">
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Automated vulnerability detection for Solana
                                    smart contracts. Protect your DeFi platform
                                    from exploits.
                                </p>
                                <div className="space-x-4">
                                    <Link
                                        className="inline-flex bg-green-800 h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                        href="#"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Image
                            alt="Hero"
                            className="mx-auto overflow-hidden rounded-t-xl object-cover"
                            height="500"
                            src="/home/hero.png"
                            width="1270"
                        />
                    </div>
                </section>
                <section
                    className="w-full py-12 md:py-24 lg:py-32"
                    ref={featuresRef}
                >
                    <div className="container space-y-12 px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                    New Features
                                </div>
                                <h2 className="text-3xl text-green-800 font-bold tracking-tighter sm:text-5xl">
                                    Faster iteration. More innovation.
                                </h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    The platform for rapid progress. Let your
                                    team focus on shipping features instead of
                                    managing infrastructure with automated
                                    CI/CD, built-in testing, and integrated
                                    collaboration.
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <div key={index} className="grid gap-1">
                                    <h3 className="text-lg text-green-700 font-bold">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center flex-col sm:flex-row items-start gap-4">
                            <Button
                                variant={"link"}
                                className="inline-flex text-white h-10 items-center justify-center rounded-md bg-green-800 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                onClick={scrollToContact}
                            >
                                Contact Sales
                            </Button>
                            <Link
                                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                                href="#"
                            >
                                Tour the Platform
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32  dark:bg-gray-800">
                    <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-12">
                        <h1 className="text-2xl text-green-800 font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Find and fix vulnerabilities in your smart contracts
                        </h1>

                        <div className=" p-4 shadow-xl rounded-xl text-start">
                            <CodeMirror
                                value={value}
                                onChange={onChange}
                                extensions={[rust()]}
                            />
                        </div>

                        <div className="p-4">
                            <Button
                                type="submit"
                                onClick={onSubmit}
                                className="text-white bg-green-800"
                            >
                                Scan Now
                            </Button>
                        </div>

                        <Card className="w-full border-0 p-4 space-y-6">
                            <CardHeader className="flex flex-col gap-x-4 md:flex-row items-start md:items-center">
                                <CardTitle className="text-green-700">
                                    Code Vulnerability Analysis
                                </CardTitle>
                                <CardDescription className="mt-2 md:mt-0">
                                    Your code is {vulnerabilities.percentage}%
                                    vulnerable
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-8">
                                {loading && (
                                    <div className="flex items-center justify-between space-x-6">
                                        <div className="flex flex-col items-center space-y-4">
                                            <Skeleton className="w-[120px] h-[10px] rounded-full" />
                                            <Skeleton className="w-[120px] h-[10px] rounded-full" />
                                            <Skeleton className="w-[120px] h-[10px] rounded-full" />
                                        </div>

                                        <div className="flex flex-col items-center space-y-4">
                                            <Skeleton className="w-[80px] h-[10px] rounded-full" />
                                            <Skeleton className="w-[80px] h-[10px] rounded-full" />
                                            <Skeleton className="w-[80px] h-[10px] rounded-full" />
                                        </div>
                                    </div>
                                )}
                                {vulnerabilities.attacks.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between gap-4 transition-all duration-300 ease-in"
                                    >
                                        <p className="text-sm">{item.name}</p>
                                        <div
                                            className={`w-20 h-3 rounded-full ${getSeverityClass(
                                                item.severity
                                            )}`}
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                Experience the workflow the best frontend teams
                                love.
                            </h2>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Let your team focus on shipping features instead
                                of managing infrastructure with automated CI/CD.
                            </p>
                        </div>
                        <div className="mx-auto w-full max-w-sm space-y-2">
                            <form className="flex space-x-2">
                                <Input
                                    className="max-w-lg flex-1"
                                    placeholder="Enter your email"
                                    type="email"
                                    name="email"
                                    id="email"
                                />

                                <Input
                                    className="max-w-lg flex-1"
                                    placeholder="Enter your password"
                                    type="password"
                                    name="password"
                                    id="password"
                                />

                                {pending ? (
                                    <Button disabled>
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button
                                        formAction={signup}
                                        className="text-white bg-green-800"
                                    >
                                        Sign Up
                                    </Button>
                                )}
                            </form>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Sign up to get notified when we launch.
                                <Link
                                    className="underline underline-offset-2"
                                    href="#"
                                >
                                    Terms & Conditions
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>

                <section
                    className="w-full py-12 md:py-24 lg:py-32"
                    ref={pricingRef}
                >
                    <div className="container space-y-12 px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                    Pricing
                                </div>
                                <h2 className="text-3xl text-green-800 font-bold tracking-tighter sm:text-5xl">
                                    Choose the Plan That Works for You
                                </h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    {`Select the perfect plan for your team. Whether you're a small startup or a large enterprise, we have a
  pricing option that fits your needs.`}
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                            {plans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className="flex flex-col justify-center space-y-4"
                                >
                                    <div className="grid gap-3">
                                        <h3 className="text-xl font-bold text-green-800">
                                            {plan.name}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {plan.description}
                                        </p>
                                        <div className="text-2xl font-bold">
                                            ${plan.price}
                                        </div>
                                        <button className="bg-green-800 text-white px-4 py-2 rounded-lg">
                                            Choose Plan
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    className="w-full py-12 md:py-24 lg:py-32"
                    ref={aboutRef}
                >
                    <div className="container px-4">
                        <div className="grid gap-8 lg:gap-12 items-center space-y-8 lg:space-y-0 lg:grid-cols-1">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tight text-green-800">
                                        We are on a mission to make your life
                                        easier.
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Our team is dedicated to creating the
                                        next generation of tools that will
                                        streamline your workflow and boost your
                                        productivity. We believe that by
                                        harnessing the power of technology, we
                                        can simplify the complex and empower the
                                        individual.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-6 lg:gap-10 md:grid-cols-2 items-start">
                                {teamMembers.map((member) => (
                                    <div
                                        key={member.id}
                                        className="flex flex-col gap-4"
                                    >
                                        <Image
                                            alt={member.name}
                                            className="rounded-full object-cover"
                                            height="160"
                                            src={member.imageSrc}
                                            style={{
                                                aspectRatio: "160/160",
                                                objectFit: "cover",
                                            }}
                                            width="160"
                                        />
                                        <div className="grid gap-2">
                                            <h3 className="font-semibold text-green-700 text-sm">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {member.role}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {member.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                        <div className="space-y-2">
                            <h2 className="text-3xl text-green-800 font-bold tracking-tighter md:text-4xl/tight">
                                Experience the workflow the best frontend teams
                                love.
                            </h2>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Let your team focus on shipping features instead
                                of managing infrastructure with automated CI/CD.
                            </p>
                        </div>
                        <div className="flex space-x-4 lg:justify-end">
                            <Button
                                variant={"link"}
                                className="inline-flex text-white h-10 items-center justify-center rounded-md bg-green-800 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                onClick={scrollToContact}
                            >
                                Contact Sales
                            </Button>
                            <Link
                                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                                href="#"
                            >
                                Learn more
                            </Link>
                        </div>
                    </div>
                </section>

                <Card className="rounded-none border-0" ref={contactRef}>
                    <CardHeader>
                        <CardTitle className="text-green-800">
                            Contact Us
                        </CardTitle>
                        <CardDescription>
                            Get in touch with our team
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...contactForm}>
                            <form
                                onSubmit={contactForm.handleSubmit(
                                    onContactSubmit
                                )}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <FormField
                                        control={contactForm.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    First Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={contactForm.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Smith"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={contactForm.control}
                                        name="contactEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="example@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={contactForm.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="example@example.com"
                                                        {...field}
                                                        className="min-h-[100px]"
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex items-start">
                                    {contactLoading ? (
                                        <Button
                                            className="ml-auto bg-green-800 text-white"
                                            disabled
                                        >
                                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                            Contacting...
                                        </Button>
                                    ) : (
                                        <Button
                                            className="ml-auto bg-green-800 text-white"
                                            type="submit"
                                        >
                                            Contact us!
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <section className="w-full py-0 border-t" />

                <footer className="bg-green-800 text-white py-6">
                    <div className="container px-4 flex items-center justify-between">
                        <p>© 2024 SmartGuardian. All rights reserved.</p>
                        <nav className="flex space-x-4">
                            <Button
                                variant={"link"}
                                className="text-white hover:underline"
                                onClick={scrollToTop}
                            >
                                Home
                            </Button>
                            <Button
                                className="text-white hover:underline"
                                onClick={scrollToAbout}
                                variant={"link"}
                            >
                                About
                            </Button>
                            <Button
                                variant={"link"}
                                className="text-white hover:underline"
                                onClick={scrollToFeatures}
                            >
                                Features
                            </Button>
                            <Button
                                className="text-white hover:underline"
                                variant={"link"}
                                onClick={scrollToContact}
                            >
                                Contact
                            </Button>
                        </nav>
                    </div>
                </footer>
            </main>
        </div>
    );
}

function ShieldIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
    );
}
