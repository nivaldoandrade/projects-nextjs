import { FormLogin } from "@/components/login/form"
import { Card, CardContent } from "@/components/ui/card"
import { CatImage } from "./_components/cat-image";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm md:max-w-3xl">
      <div className="flex flex-col gap-6">
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <FormLogin />
            <div className="relative hidden bg-muted md:block">
              <CatImage />
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  )
}
