import Image from "next/image";

export function CatImage() {
  return (
    <Image
      src="/cat-default.jpg"
      alt="Gatinho fofinho aleatório"
      fill
      sizes="390px"
      style={{ objectFit: "cover" }}
      priority
    />
  )
}
