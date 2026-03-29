"use client";
import React from 'react';

export default function Dashboard() {
  // Simulated Trust Score & User Data
  const user = {
    name: "Alex Developer",
    trustScore: 845,
    skills: [
      { name: "React", level: "Advanced", verified: true },
      { name: "Node.js", level: "Intermediate", verified: true },
      { name: "Machine Learning", level: "Beginner", verified: false }
    ],
    verifiedCerts: 2
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 md:p-12 font-sans relative">
       <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

       <header className="mb-10 flex justify-between items-center z-10 relative">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            AI Trust Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">{user.name}</span>
            <div className="w-10 h-10 rounded-full bg-slate-800 border focus:outline-none border-slate-700 flex items-center justify-center font-bold">A</div>
          </div>
       </header>

       <main className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10 relative">
          {/* Trust Score Card */}
          <div className="col-span-1 glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center">
             <h3 className="text-slate-400 font-medium mb-4 uppercase tracking-wider text-sm">Target Trust Score</h3>
             <div className="relative w-48 h-48 flex items-center justify-center rounded-full bg-slate-900 border-4 border-emerald-500/30 shadow-[0_0_50px_-10px_rgba(16,185,129,0.5)]">
               <div className="text-5xl font-black text-emerald-400">{user.trustScore}</div>
             </div>
             <p className="mt-6 text-sm text-slate-400">Top 15% of users. Keep verifying certificates to increase score.</p>
          </div>

          {/* Skills Grid */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="glass-panel p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-4 flex justify-between">
                <span>Verified Skills Engine</span>
                <button className="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded hover:bg-blue-600/30 transition-colors">+ Analyze New Skill</button>
              </h2>
              
              <div className="space-y-3">
                {user.skills.map((skill, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <div>
                      <span className="font-semibold text-white block">{skill.name}</span>
                      <span className="text-xs text-slate-400">{skill.level}</span>
                    </div>
                    <div>
                      {skill.verified ? (
                        <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs border border-emerald-500/30">✓ AI Verified</span>
                      ) : (
                        <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs border border-orange-500/30">Pending Doc Upload</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-4">Smart Match Suggestions</h2>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-indigo-500/30 flex justify-between items-center">
                 <div>
                   <h4 className="font-bold text-indigo-400">Sarah M. - Data Scientist</h4>
                   <p className="text-sm text-slate-400">Has: Machine Learning | Needs: React</p>
                 </div>
                 <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-sm text-white font-medium transition-colors">Exchange Skills</button>
              </div>
            </div>
          </div>
       </main>
    </div>
  );
}
