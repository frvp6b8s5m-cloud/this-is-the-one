import type { Metadata } from "next";
import { StudioCustomizer } from "@/components/studio-customizer";

export const metadata: Metadata = { title: "Studio personalization" };

export default function StudioPage() {
  return (
    <div className="page-shell studio-page">
      <section className="page-hero studio-hero">
        <div className="container">
          <div className="eyebrow"><span className="eyebrow-dot"/> BZAUDIO / CONTROL ROOM</div>
          <h1>Your space.<br/><span>Your settings.</span></h1>
          <p>Set up the BZaudio experience around the way you like to work. Your choices save on this device and can be changed any time.</p>
        </div>
      </section>
      <section className="section section-paper studio-section">
        <div className="container">
          <div className="studio-intro"><div><div className="eyebrow eyebrow-dark">PERSONALIZATION LAB</div><h2>Build your own<br/><span className="text-accent">control room.</span></h2></div><p>Change the visual language, adjust the density, and decide how much technical guidance you want to see. The preview updates as you make changes.</p></div>
          <StudioCustomizer/>
          <p className="studio-note">Preferences are stored locally in this browser. This version does not create an account or sync settings between devices.</p>
        </div>
      </section>
    </div>
  );
}
