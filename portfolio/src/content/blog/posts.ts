export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  mediumUrl: string;
  intro: string;
}

export const posts: BlogPost[] = [
  {
    slug: "weixin-super-app-strategy",
    title: "The Super-App Was the Outcome, Not the Strategy",
    date: "November 2026",
    mediumUrl: "https://medium.com/@alanayalag/the-super-app-was-the-outcome-not-the-strategy-a0617bb1ab81?sharedUserId=alanayalag",
    intro: "How WeChat turned everyday conversations into a digital ecosystem across China"
  },
  {
    slug: "ai-agent-authentication",
    title: "Your AI Agent Can't Log Into Anything. Here's How the Industry Is Fixing It.",
    date: "June 2026",
    mediumUrl: "https://medium.com/@alanayalag/your-ai-agent-cant-log-into-anything-here-s-how-the-industry-is-fixing-it-2ad6d783ce08",
    intro: "Browser automation is solved for humans but not for AI agents, authentication is where every agent breaks. I dug through the source code of 20+ browser agent projects (OpenHands, Devin, Skyvern, browser-use) to map the architectural patterns the field has quietly converged on."
  },
  {
    slug: "ai-memory-systems",
    title: "Your AI Has Amnesia. Here's Every System Built to Fix It.",
    date: "June 2026",
    mediumUrl: "https://medium.com/@alanayalag/your-ai-has-amnesia-heres-every-system-built-to-fix-it-ad7dee117a75",
    intro: "Every new LLM conversation starts from zero, the stateless AI problem isn't a limit of intelligence, it's a limit of how context is structured. A survey of every memory system built to fix it, from context windows to persistent agent memory."
  },
  {
    slug: "ai-wardrobe-stylist",
    title: "If You're Terrible at Creating Outfits, I Built an AI System That Does It For You",
    date: "April 2026",
    mediumUrl: "https://medium.com/@alanayalag/if-youre-terrible-at-creating-outfits-i-built-an-ai-system-that-does-it-for-you-8c1463c51493",
    intro: "Living out of a suitcase across the UAE, India, and Mexico, I refused to download another app that made me manually log what I wear. So I built an agentic AI stylist on top of Notion, Supabase, and weather APIs that plans outfits and packing lists for me."
  },
  {
    slug: "professor-ai",
    title: "“Professor AI”: Building an Autonomous Educational Intelligence Platform",
    date: "December 2025",
    mediumUrl: "https://medium.com/age-of-awareness/professor-ai-building-an-autonomous-educational-intelligence-platform-0efca42ea90b",
    intro: "Most RAG tutorials show you how to chat with a PDF; this is what it takes to build a system grounded in real course material. The platform now serves 400+ students across two educational institutions."
  },
  {
    slug: "ai-driven-divergence",
    title: "The AI-Driven Divergence",
    date: "December 2025",
    mediumUrl: "https://medium.com/@alanayalag/the-ai-driven-divergence-809e60a66191",
    intro: "Ray Dalio's Big Cycle says every dominant power is condemned to rise, peak, and decline, the US included. An essay on whether AI is the variable that breaks the cycle, or the one that accelerates it."
  }
];
