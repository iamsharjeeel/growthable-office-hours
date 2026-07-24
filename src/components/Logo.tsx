import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/growthable-logo.png"
      alt="growthable"
      width={220}
      height={60}
      priority
      className={`h-auto w-[168px] sm:w-[200px] ${className}`}
    />
  );
}
