"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  url: z.string().min(1, "URL is required")
})

export default function Home() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const cleanUrl = values.url.replace(/^https?:\/\//, '')
    router.push(`/${cleanUrl}`)
  }

  return (
    <main className="flex min-h-screen justify-center items-center">
      <div className="w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <div className="mb-3 ml-1 space-y-6">
          <h2 className="text-lg font-semibold">Enter a website URL to get started</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="snack.xyz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Visit URL</Button>
            </form>
          </Form>

          <div className="pt-2">
            <span className="text-sm text-muted-foreground">Example:</span>
            <Link className="block underline" href="/snack.xyz">
              {`${process.env.NEXT_PUBLIC_URL || ''}/snack.xyz`}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
