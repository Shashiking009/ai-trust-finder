import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

      <main className="z-10 flex flex-col items-center text-center px-4">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wide">
          Introducing AI Trust Finder
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
          Intelligent Skill Verification & <span className="gradient-text">Career Matching</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          The next-generation platform for validating your expertise. Upload certificates, discover skill gaps, build trust, and connect with peers dynamically.
        </p>

        <div className="flex gap-4">
          <Link href="/register" className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)]">
            Get Started
          </Link>
          <Link href="/login" className="px-8 py-4 rounded-xl glass-panel text-white font-semibold hover:bg-white/10 transition-all border border-white/10 shadow-sm">
            Sign In
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-left">
          <FeatureCard 
            title="Document Verification" 
            desc="AI dynamically extracts your skill data via Tesseract OCR to automatically score profiles."
            icon="📄"
          />
          <FeatureCard 
            title="Trust Score Engine" 
            desc="Multi-dimensional ranking system analyzing your validated skills, activity, and completeness."
            icon="⚖️"
          />
          <FeatureCard 
            title="Smart Matchmaking" 
            desc="Cosine-similarity vector algorithms instantly recommend mentors and skill exchangers based on gaps."
            icon="🤝"
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="glass-panel p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
