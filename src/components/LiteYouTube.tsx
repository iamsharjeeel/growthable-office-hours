"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  videoId: string;
  title: string;
};

export function LiteYouTube({ videoId, title }: Props) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className="relative aspect-video w-full">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative aspect-video w-full cursor-pointer overflow-hidden bg-black/50 transition-[filter,transform] duration-150 ease-out hover:brightness-110 motion-safe:hover:-translate-y-px"
      aria-label={`Play ${title}`}
    >
      <Image
        src={thumb}
        alt=""
        fill
        sizes="(max-width: 896px) 100vw, 896px"
        className="object-cover"
        loading="lazy"
      />
      <span className="absolute inset-0 bg-black/25" aria-hidden />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-muted text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-150 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8.5 6.8v10.4L18 12 8.5 6.8Z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
