"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { ArrowUpRight, Clipboard, Mail } from "lucide-react";

function ContactForm() {
  const params = useSearchParams();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [project,setProject]=useState("");
  const [message,setMessage]=useState("");
  const [copied,setCopied]=useState(false);
  const type=params.get("type") ?? "general";
  const category=params.get("category");
  const brief=useMemo(()=>[
    "BZaudio project inquiry",
    `Request type: ${type}`,
    `Category: ${category ?? "Not specified"}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Project: ${project}`,
    "",
    message,
  ].join("\n"),[type,category,name,email,project,message]);
  async function copy() {
    try { await navigator.clipboard.writeText(brief); setCopied(true); }
    catch { setCopied(false); }
  }
  return (
    <div className="contact-layout"><div className="contact-intro"><div className="eyebrow"><span className="eyebrow-dot"/> START A CONVERSATION</div><h2>Tell us what<br/><span>you&apos;re working on.</span></h2><p>Give us the basics. We&apos;ll use it to understand the project and figure out what needs to happen next.</p><div className="contact-promise"><Mail size={19}/><span><b>No fake submit button.</b><small>This early version prepares a message for you to copy. It does not send or store your information.</small></span></div></div><div className="contact-form"><label htmlFor="name">Your name</label><input id="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Name"/><label htmlFor="email">Email address</label><input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/><label htmlFor="project">What do you need?</label><select id="project" value={project} onChange={e=>setProject(e.target.value)}><option value="">Choose a project type</option><option>Equipment sourcing</option><option>New sound system</option><option>Installation</option><option>Upgrade / troubleshooting</option><option>SoundMatch review</option><option>Other</option></select><label htmlFor="message">Project details</label><textarea id="message" rows={6} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Tell us about the room, audience, equipment, budget, and goals…"/><button type="button" className="button button-primary" disabled={!name.trim()||!email.trim()||!message.trim()} onClick={copy}><Clipboard size={17}/>{copied?"Copied to clipboard":"Copy inquiry brief"} <ArrowUpRight size={17}/></button><p className="copy-note">{copied?"Copied. Paste the brief into your email or preferred messaging app.":"Your details remain on this page until you leave. Nothing is transmitted."}</p></div></div>
  );
}

export default function ContactPage() {
  return <div className="page-shell"><section className="page-hero"><div className="container"><div className="eyebrow"><span className="eyebrow-dot"/> CONTACT BZAUDIO</div><h1>Let&apos;s talk<br/><span>about your system.</span></h1><p>Equipment sourcing, system planning, installation, or just figuring out where to start.</p></div></section><section className="section section-paper"><div className="container"><Suspense fallback={<div className="loading-note">Loading inquiry form…</div>}><ContactForm/></Suspense></div></section></div>;
}