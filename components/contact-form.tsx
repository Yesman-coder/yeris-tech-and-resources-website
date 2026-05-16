"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  budget: z.string().min(1, "Please select a budget range"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(20, "Please tell us a bit more (20 chars min)"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24 gap-6">
        <p className="text-2xl font-medium text-(--color-fg)">
          Thanks. We&apos;ll be in touch within one business day.
        </p>
        <Link
          href="/"
          className="text-sm font-mono text-(--color-muted) hover:text-(--color-fg) transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            placeholder="Your name"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          placeholder="Your company (optional)"
          {...register("company")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="budget">Budget range *</Label>
          <Select onValueChange={(v) => setValue("budget", v)}>
            <SelectTrigger id="budget" aria-invalid={!!errors.budget}>
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="< $5k">{"< $5k"}</SelectItem>
              <SelectItem value="$5k–$15k">$5k–$15k</SelectItem>
              <SelectItem value="$15k–$30k">$15k–$30k</SelectItem>
              <SelectItem value="$30k–$75k">$30k–$75k</SelectItem>
              <SelectItem value="$75k+">$75k+</SelectItem>
              <SelectItem value="Not sure yet">Not sure yet</SelectItem>
            </SelectContent>
          </Select>
          {errors.budget && (
            <p className="text-xs text-red-500">{errors.budget.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="projectType">Project type *</Label>
          <Select onValueChange={(v) => setValue("projectType", v)}>
            <SelectTrigger id="projectType" aria-invalid={!!errors.projectType}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Website">Website</SelectItem>
              <SelectItem value="Web app">Web app</SelectItem>
              <SelectItem value="AI agents / automation">AI agents / automation</SelectItem>
              <SelectItem value="E-commerce">E-commerce</SelectItem>
              <SelectItem value="Mobile">Mobile</SelectItem>
              <SelectItem value="Something else">Something else</SelectItem>
            </SelectContent>
          </Select>
          {errors.projectType && (
            <p className="text-xs text-red-500">{errors.projectType.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Tell us more *</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="What are you building? What's your timeline? Any details help."
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto md:self-start bg-(--color-accent) text-(--color-accent-fg) hover:opacity-90 transition-opacity font-medium text-base px-8 py-4 h-auto rounded-2xl"
      >
        {isSubmitting ? "Sending…" : "Send →"}
      </Button>
    </form>
  );
}
