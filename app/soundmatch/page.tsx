import type { Metadata } from "next";
import { SoundMatchWizard } from "@/components/soundmatch-wizard";

export const metadata: Metadata = { title: "SoundMatch system builder" };

export default function SoundMatchPage() {
  return (
    <div className="page-shell soundmatch-page">
      <section className="page-hero soundmatch-hero"><div className="container"><div className="eyebrow"><span className="eyebrow-dot"/> THE BZAUDIO SIGNATURE TOOL</div><h1>Your room.<br/><span>Your system plan.</span></h1><p>Answer a few practical questions. SoundMatch will create three clear planning paths and show what needs a real-world technical check.</p></div></section>
      <section className="section section-paper"><div className="container"><SoundMatchWizard/></div></section>
    </div>
  );
}