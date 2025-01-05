import { ImageCompressor } from "@/components/image-compressor"

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f4e1ff] p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-black tracking-tight md:text-6xl">
          PicShrink 🎯
        </h1>
        <ImageCompressor />
      </div>
    </main>
  )
}

