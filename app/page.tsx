import { ImageCompressor } from "@/components/image-compressor"
import AdsComponent from "@/components/AdsComponent"
export default function Page() {
  return (
    <main className="min-h-screen bg-[#f4e1ff] p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-black tracking-tight md:text-6xl flex items-center">
          PicShrink
          <img 
            src="/Camera.png" 
            alt="PicShrink Icon" 
            className="w-12 h-12 ml-4" // Increased size and margin left
          />
        </h1>
        <ImageCompressor />
        <AdsComponent dataAdSlot='4228595056' />
      </div>
    </main>
  )
}
