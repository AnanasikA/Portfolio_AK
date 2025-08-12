// components/ProjectGallery.tsx
'use client';
import Image from 'next/image';

export default function ProjectGallery({ items }: { items: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map((src, i) => (
        <div key={i} className="rounded-xl overflow-hidden border border-white/20 bg-white/5">
          <div className="relative w-full" style={{ aspectRatio: 1.6 }}>
            <Image src={src} alt={`Zrzut ${i + 1}`} fill className="object-contain" />
          </div>
        </div>
      ))}
    </div>
  );
}
