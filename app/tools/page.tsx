import type { Metadata } from "next";
import { AudioTools } from "@/components/audio-tools";

export const metadata: Metadata = { title: "Audio tools and calculators" };

export default function ToolsPage() {
  return (
    <div className="page-shell tools-page">
      <section className="page-hero tools-hero"><div className="container"><div className="eyebrow"><span className="eyebrow-dot"/> BZAUDIO / PRACTICAL AUDIO UTILITIES</div><h1>Tools for the<br/><span>people behind the mix.</span></h1><p>Quick calculations and field references for live sound, system planning, and everyday audio work.</p></div></section>
      <section className="section section-paper"><div className="container"><div className="tools-intro"><div><div className="eyebrow eyebrow-dark">THE BZAUDIO TOOLBOX</div><h2>Useful, fast,<br/><span className="text-accent">and built for audio.</span></h2></div><p>Choose a calculator, enter your values, and get a clear result you can copy into your notes. These tools support your workflow—they do not replace measurement or engineering review.</p></div><AudioTools/></div></section>
    </div>
  );
}
