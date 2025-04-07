'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { FormField, FormItem, FormLabel, FormMessage, FormControl, Form } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email('Informe um email válido'),
  password: z.string().min(1, 'Informa a senha')
})

type FormData = z.infer<typeof schema>

export function FormLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(schema)
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      setIsLoading(true);
      await axios.post('/api/auth/login', formData);

      router.replace('/');
    } catch {
      toast.error("Credenciais inválidas!")
    } finally {
      setIsLoading(false);
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-balance text-muted-foreground">
              Login to your Acme Inc account
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between min-h-5">
                  <FormLabel>Email</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    autoComplete="email"
                    placeholder="jhon.doe@mail.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between min-h-5">
                  <FormLabel>Password</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    autoComplete="current-password"
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            Login
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <Button type="button" disabled={isLoading} className="w-full" variant="outline">
            Entrar com o Google
          </Button>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </div>
      </form>
    </Form>
  );
}
