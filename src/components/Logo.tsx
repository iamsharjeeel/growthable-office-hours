import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/growthable-logo-dark.png"
      alt="growthable"
      width={240}
      height={49}
      sizes="160px"
      priority
      className={`h-9 w-auto sm:h-10 ${className}`}
    />
  );
}
