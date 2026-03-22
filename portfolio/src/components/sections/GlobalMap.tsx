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
    <section id="map" ref={container} className="h-[400vh] relative bg-black text-white">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
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

        {/* Cinematic Title Behind the Graphic */}
        <div className="z-0 text-center mix-blend-difference pointer-events-none opacity-20">
          <motion.h2 style={{ y: yTitle }} className="text-[12vw] font-bold font-sans leading-none tracking-tighter">
            GLOBAL
          </motion.h2>
          <motion.h2 style={{ y: yTitle }} className="text-[12vw] font-serif italic text-white/70 leading-none">
            EXPERIENCE
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
