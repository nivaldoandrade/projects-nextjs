import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="min-h-svh grid place-items-center p-4">
      <Spinner size="large" />
    </div>
  )
}
