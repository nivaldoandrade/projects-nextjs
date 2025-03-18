'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1, 'Informe o seu nome'),
  lastName: z.string().min(1, 'Informe o seu sobrenome'),
  email: z.string().email('Informe um email válido'),
  password: z.string().min(1, 'Informe a senha')
})

type FormData = z.infer<typeof schema>;

export default function SignUp() {

  const form = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    resolver: zodResolver(schema)
  });

  const handleSubmit = form.handleSubmit((formData) => {
    console.log(formData);
  })

  return (
    <div className="flex items-center justify-center min-h-svh p-6">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between min-h-5">
                          <FormLabel>First name</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            autoComplete="firstName"
                            placeholder="John"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between min-h-5">
                          <FormLabel>Last name</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            autoComplete="lastName"
                            placeholder="Doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-2">
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
              </div>
              <div className="grid gap-2">
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
              </div>
              <Button type="submit" className="w-full">Create an account</Button>
              <Button type="button" className="w-full" variant={"outline"}>Sign up with Github</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center text-sm gap-1">
          Already have an account?
          <Link href="/login" className="underline">Log in</Link>
        </CardFooter>
      </Card>
    </div>
  )
}
