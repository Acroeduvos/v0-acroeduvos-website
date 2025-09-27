"use client"

import Image from "next/image"

export function LogoSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Welcome to <span className="text-primary">Acroeduvos</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your gateway to programming excellence
            </p>
          </div>
          
          <div className="relative">
            <div className="h-32 w-32 relative">
              <Image 
                src="/logo.png" 
                alt="Acroeduvos Logo" 
                fill 
                className="object-contain" 
              />
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold">learn code create certify</h3>
            <p className="text-lg text-muted-foreground">
              Master programming with our comprehensive platform
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
