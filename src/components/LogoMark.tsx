import Image from "next/image";

type Props = {
  className?: string;
};

export function LogoMark({ className = "" }: Props) {
  return (
    <Image
      src="/growthable-mark.png"
      alt=""
      width={110}
      height={180}
      unoptimized
      className={`h-[1.1em] w-auto ${className}`}
      aria-hidden
    />
  );
}
