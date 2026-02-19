import Navbar from "@/component/Navbar";
import Image from "next/image";
import imag1 from "@/public/image/hero.png";
import imag2 from "@/public/image/Image [bg] (Mask Group).png"

export default function Home() {
  return (
    // 1. The main wrapper holds everything and establishes the relative positioning
    <div className="relative w-full min-h-screen">
      
      {/* 2. Background Image Container */}
      {/* 'absolute inset-0' stretches it to the edges, 'z-[-1]' pushes it behind content */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src={imag1}
          alt="Background Image"
          className="object-cover object-center"
          priority // Good practice for hero/above-the-fold images
        />
      </div>

     
      <div className="relative z-10">
        <Navbar />
        <div>
          <div >
             <Image
          src={imag2}
          alt="Background Image"
          className="bg-red pd-4 w-full"
            />
            
          </div>

        </div>
      </div>
    </div>
  );
}