'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Link from 'next/link';

// Using exact coordinates bounding a generic global viewport, with calculated delayTriggers
// matched to the precise pixel circumference of the SVG path segments.
type NodeStatus = 'completed' | 'in-progress' | 'upcoming';

const nodes: { id: string, name: string, detail: string, cx: number, cy: number, delayTrigger: number, status: NodeStatus }[] = [
  { id: "dubai", name: "Dubai", detail: "(UAE)", cx: 700, cy: 340, delayTrigger: 0.01, status: "completed" },
  { id: "delhi", name: "New Delhi", detail: "(India)", cx: 900, cy: 380, delayTrigger: 0.09, status: "in-progress" },
  { id: "shanghai", name: "Shanghai", detail: "(China)", cx: 1150, cy: 280, delayTrigger: 0.20, status: "upcoming" },
  { id: "accra", name: "Accra", detail: "(Ghana)", cx: 480, cy: 450, delayTrigger: 0.50, status: "upcoming" },
  { id: "us", name: "United States", detail: "", cx: 150, cy: 240, delayTrigger: 0.66, status: "upcoming" },
  { id: "ba", name: "Buenos Aires", detail: "(Argentina)", cx: 300, cy: 540, delayTrigger: 0.81, status: "upcoming" },
  { id: "milan", name: "Milan", detail: "(Italy) Internship Full Time", cx: 580, cy: 180, delayTrigger: 1.0, status: "upcoming" },
];

const journeyPath = `M ${nodes[0].cx} ${nodes[0].cy} L ${nodes[1].cx} ${nodes[1].cy} L ${nodes[2].cx} ${nodes[2].cy} L ${nodes[3].cx} ${nodes[3].cy} L ${nodes[4].cx} ${nodes[4].cy} L ${nodes[5].cx} ${nodes[5].cy} L ${nodes[6].cx} ${nodes[6].cy}`;

function LocationNode({ node, scrollYProgress }: { node: typeof nodes[0], scrollYProgress: MotionValue<number> }) {
  // Map standard ranges to scale nodes slightly before stroke arrives
  const scale = useTransform(
    scrollYProgress, 
    [Math.max(0, node.delayTrigger - 0.04), node.delayTrigger], 
    [0.5, 1]
  );
  
  const opacity = useTransform(
    scrollYProgress, 
    [Math.max(0, node.delayTrigger - 0.04), node.delayTrigger], 
    [0, 1]
  );

  return (
    <g>
      {/* Central anchor dot */}
      <motion.circle 
        cx={node.cx} 
        cy={node.cy} 
        r={node.status === 'in-progress' ? "6" : "4"} 
        fill={node.status === 'upcoming' ? "#222" : (node.status === 'in-progress' ? "#FFF" : "#6339FF")} 
        stroke={node.status === 'upcoming' ? "rgba(255,255,255,0.2)" : "none"}
        strokeWidth="1.5"
        style={{ opacity }}
      />
      
      {/* Glowing ring for completed or active items */}
      {node.status !== 'upcoming' && (
        <motion.circle 
          cx={node.cx} 
          cy={node.cy} 
          r="12" 
          stroke={node.status === 'in-progress' ? "#FFF" : "#6339FF"} 
          strokeWidth="1"
          fill="none"
          style={{ scale, opacity }}
        />
      )}

      {/* HTML Popup Layer */}
      <foreignObject
        x={node.cx - 100}
        y={node.cy - 90} // Adjusted higher to fit the badge
        width="200"
        height="84"
        className="overflow-visible pointer-events-none"
      >
        <motion.div 
          style={{ scale, opacity }}
          className="w-full h-full flex flex-col items-center justify-end pb-1 pointer-events-auto origin-bottom"
        >
          <Link href={`/experience/${node.id}`}>
            <button className={`backdrop-blur-md border px-4 py-2.5 rounded flex flex-col items-center transform hover:scale-110 transition-all cursor-pointer shadow-lg group ${
              node.status === 'completed' ? 'bg-black/90 border-[#6339FF]/50 shadow-[0_0_20px_rgba(99,57,255,0.4)] hover:bg-[#6339FF]/20' :
              node.status === 'in-progress' ? 'bg-white/10 border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-white/20' :
              'bg-black/60 border-white/10 hover:bg-white/5'
            }`}>
              {/* Status Badge */}
              <span className={`text-[7px] px-1.5 py-0.5 rounded-sm font-bold tracking-[0.2em] uppercase mb-1.5 ${
                node.status === 'completed' ? 'bg-[#6339FF]/20 text-[#6339FF]' : 
                node.status === 'in-progress' ? 'bg-white text-black' : 
                'bg-white/10 text-white/50'
              }`}>
                {node.status === 'in-progress' ? 'Current' : node.status}
              </span>
              
              <span className={`text-[11px] font-bold uppercase tracking-wider whitespace-nowrap ${node.status === 'upcoming' ? 'text-white/70' : 'text-white'}`}>{node.name}</span>
              {node.detail && <span className="text-white/50 text-[9px] uppercase tracking-widest whitespace-nowrap mt-0.5">{node.detail}</span>}
            </button>
          </Link>
        </motion.div>
      </foreignObject>
    </g>
  );
}

export default function GlobalMap() {
  const container = useRef(null);
  
  // Entire section is 400vh tall to allow ample scrolling distance.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  // Compress the entire map drawing animation into the first 80% of the scroll.
  // The remaining 20% is pure buffer space forcing the scroll to just "wait" before detaching.
  const timelineProgress = useTransform(scrollYProgress, (v) => Math.min(1, v / 0.80));

  const yTitle = useTransform(timelineProgress, [0, 1], [0, -100]);
  const pathLength = timelineProgress;

  return (
    <section id="map" ref={container} className="min-h-screen md:h-[400vh] relative bg-black text-white">
      {/* Sticky Viewport Container - Desktop Only */}
      <div className="sticky top-0 h-screen w-full hidden md:flex flex-col items-center justify-center overflow-hidden">
        
        {/* SVG Map Path */}
        <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none z-10 p-4 -translate-y-[4vh] md:-translate-y-[6vh]">
          <svg viewBox="50 0 1200 600" className="w-full h-full max-w-[1600px] scale-90 md:scale-100" fill="none" preserveAspectRatio="xMidYMid meet">
            
            {/* Outline hint of global continents/generic aesthetic dotted path */}
            <path 
              d="M 100 250 Q 250 100 400 300 T 700 200 T 900 250 M 150 400 Q 300 450 500 350 T 800 400" 
              stroke="rgba(255,255,255,0.03)" 
              strokeWidth="1" 
              strokeDasharray="4 4"
            />

            {/* Faint complete path trace acting as timeline rail */}
            <path 
              d={journeyPath} 
              stroke="rgba(99,57,255,0.15)" 
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Animated solid accent line drawing across the map chronologically */}
            <motion.path 
              d={journeyPath} 
              stroke="#6339FF" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength }}
            />
            
            {/* Interactive destination nodes rendered above the line */}
            {nodes.map(node => (
              <LocationNode key={node.id} node={node} scrollYProgress={timelineProgress} />
            ))}
          </svg>
        </div>

        {/* Cinematic Title Behind the Graphic (Desktop) */}
        <div className="z-0 text-center mix-blend-difference pointer-events-none opacity-20">
          <motion.h2 style={{ y: yTitle }} className="text-[12vw] font-bold font-sans leading-none tracking-tighter">
            GLOBAL
          </motion.h2>
          <motion.h2 style={{ y: yTitle }} className="text-[12vw] font-serif italic text-white/70 leading-none">
            EXPERIENCE
          </motion.h2>
        </div>
      </div>

      {/* MOBILE VIEW - Location Cards Feed (SOTA) */}
      <div className="md:hidden relative z-20 flex flex-col items-center py-24 px-6 gap-6">
        <div className="text-center mb-12 mix-blend-difference pointer-events-none opacity-40">
           <h2 className="text-[14vw] font-bold font-sans tracking-tighter uppercase leading-none">GLOBAL</h2>
           <h2 className="text-[14vw] font-serif italic text-white/70 uppercase leading-none">NODES</h2>
        </div>
        
        <div className="w-full flex flex-col gap-6">
          {/* Completed / Current nodes */}
          {nodes.filter(n => n.status !== 'upcoming').map((node, i) => (
            <Link href={`/experience/${node.id}`} key={i} className="block group">
              <div className={`p-8 rounded-[2rem] border backdrop-blur-xl transition-all duration-500 shadow-xl ${
                node.status === 'completed' ? 'bg-[#6339FF]/5 border-[#6339FF]/30 shadow-[0_0_30px_rgba(99,57,255,0.1)]' :
                'bg-white/5 border-white/20'
              }`}>
                <div className="flex justify-between items-start mb-8">
                   <div className="flex flex-col gap-2">
                     <span className={`text-[9px] px-3 py-1 rounded-full font-bold tracking-[0.2em] uppercase w-max ${
                       node.status === 'completed' ? 'bg-[#6339FF]/20 text-[#6339FF]' :
                       'bg-white text-black'
                     }`}>
                       {node.status === 'in-progress' ? 'Current' : node.status}
                     </span>
                     <h3 className="text-3xl font-bold text-white uppercase tracking-tighter mt-2">{node.name}</h3>
                   </div>
                   <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#6339FF] group-hover:border-[#6339FF] transition-all duration-500">
                     <span className="text-white text-xl transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                   </div>
                </div>
                <p className="text-[10px] text-white/40 font-mono uppercase tracking-[0.25em] leading-relaxed border-t border-white/5 pt-6">
                  {node.detail.replace(/[()]/g, '')}
                </p>
              </div>
            </Link>
          ))}

          {/* Upcoming Nodes Compact Row */}
          <div className="mt-8 w-screen -ml-6 border-t border-white/10 pt-10 px-6 overflow-hidden">
            <h3 className="text-[10px] font-mono text-white/40 mb-6 uppercase tracking-[0.2em] ml-2">Upcoming Destinations</h3>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 w-full no-scrollbar pb-10 pr-6">
              {nodes.filter(n => n.status === 'upcoming').map((node, i) => (
                <Link href={`/experience/${node.id}`} key={i} className="min-w-[65vw] shrink-0 snap-start block group">
                  <div className="p-6 rounded-[1.5rem] bg-black/40 border border-white/5 opacity-70 h-full flex flex-col justify-between group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-start mb-8">
                       <div className="flex flex-col gap-1">
                         <span className="text-[8px] px-2 py-0.5 rounded-sm font-bold tracking-[0.2em] uppercase w-max bg-white/10 text-white/50">
                           Upcoming
                         </span>
                         <h3 className="text-xl font-bold text-white uppercase tracking-tight mt-2">{node.name}</h3>
                       </div>
                    </div>
                    <p className="text-[9px] text-white/30 font-mono uppercase tracking-[0.2em] leading-relaxed border-t border-white/5 pt-4">
                      {node.detail.replace(/[()]/g, '')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
