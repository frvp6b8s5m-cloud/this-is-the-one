import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, ClipboardList, Cable, Settings2, Wrench } from "lucide-react";

export const metadata: Metadata = { title: "Audio system installation" };

const services = [
  { icon: ClipboardList, title: "System planning", text: "Map out the room, use case, source list, coverage goals, signal flow, and equipment needs before purchasing." },
  { icon: Cable, title: "Equipment upgrades", text: "Make existing equipment work harder. Identify bottlenecks and plan sensible additions or replacements." },
  { icon: Settings2, title: "Setup & configuration", text: "Coordinate console, speaker, DSP, and signal-chain setup with clear documentation and handoff." },
  { icon: Wrench, title: "Troubleshooting support", text: "Work through noise, routing, connectivity, and system-operation problems with a practical plan." },
];

export default function InstallationPage() {
  return (
    <div className="page-shell">
      <section className="page-hero"><div className="container"><div className="eyebrow"><span className="eyebrow-dot"/> BZAUDIO INSTALLATION</div><h1>From the first<br/><span>idea to first sound.</span></h1><p>Equipment is only part of the job. We help make sure the system plan, connections, setup, and handoff all make sense.</p><div className="page-hero-actions"><Link href="/contact?type=installation" className="button button-primary">Discuss an installation <ArrowUpRight size={18}/></Link><span>For venues, churches, schools, events, and businesses</span></div></div></section>
      <section className="section section-paper"><div className="container"><div className="section-heading compact-heading"><div><div className="eyebrow eyebrow-dark">WHAT WE CAN HELP WITH</div><h2>Practical help.<br/><span className="text-accent">No unnecessary complexity.</span></h2></div><p>Every project starts with the room, the people using it, and the actual requirements — not a shopping list.</p></div><div className="service-grid">{services.map(({icon:Icon,title,text},i)=><article className="service-card" key={title}><div className="service-card-top"><span>0{i+1}</span><Icon size={24}/></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section install-process"><div className="container"><div className="eyebrow"><span className="eyebrow-dot"/> HOW A PROJECT STARTS</div><h2>Clear steps.<br/><span>Better decisions.</span></h2><div className="process-list"><div><b>01</b><strong>Tell us about the space</strong><p>Venue type, size, audience, use cases, existing gear, and budget range.</p></div><div><b>02</b><strong>Build the equipment plan</strong><p>Review suitable product roles, signal flow, constraints, and what needs verification.</p></div><div><b>03</b><strong>Confirm scope and sourcing</strong><p>Verify product availability, pricing, installation needs, and project responsibilities.</p></div><div><b>04</b><strong>Install, configure, hand over</strong><p>Complete the agreed work with a practical walkthrough and documentation.</p></div></div><div className="safety-note"><Check size={18}/><p>Rigging, electrical work, code compliance, life-safety systems, and final acoustic design are assessed and performed by appropriately qualified professionals.</p></div><Link href="/soundmatch" className="button button-primary">Plan a system with SoundMatch <ArrowUpRight size={18}/></Link></div></section>
    </div>
  );
}