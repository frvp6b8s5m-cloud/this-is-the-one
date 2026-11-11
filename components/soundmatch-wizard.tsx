"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CircleAlert, Clipboard, RotateCcw, ShieldCheck } from "lucide-react";
import { evaluateSoundMatch, type SoundMatchInput, type PackagePlan, validateSoundMatchInput } from "@/lib/soundmatch";

const initial: SoundMatchInput = {
  venue: "church",
  indoor: "indoor",
  audience: 150,
  budget: null,
  priority: "speech",
  existing: "",
  dimensions: "",
  installation: false,
};

const steps = ["Your space", "Your priorities", "Existing gear", "Your system plan"];

export function SoundMatchWizard() {
  const [form, setForm] = useState<SoundMatchInput>(initial);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<PackagePlan["name"]>("Recommended");
  const [copied, setCopied] = useState(false);
  const errors = useMemo(() => validateSoundMatchInput(form), [form]);
  const plans = useMemo(() => evaluateSoundMatch(form), [form]);
  const update = <K extends keyof SoundMatchInput>(key: K, value: SoundMatchInput[K]) => setForm((current) => ({ ...current, [key]: value }));

  const summary = () => [
    "BZaudio SoundMatch — project brief",
    `Venue: ${form.venue}; ${form.indoor}; audience: ${form.audience}`,
    `Room dimensions: ${form.dimensions || "Not provided"}`,
    `Budget: ${form.budget === null ? "Not provided" : form.budget.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}`,
    `Priority: ${form.priority}`,
    `Existing equipment: ${form.existing || "Not provided"}`,
    `Installation help: ${form.installation ? "Requested" : "Not requested"}`,
    `Preferred planning path: ${selected}`,
    "Note: This is a preliminary role-based plan. Exact products, pricing, stock, and compatibility require verified supplier data and technical review.",
  ].join("\n");

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(summary());
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="wizard-layout">
      <aside className="wizard-aside"><div className="wizard-aside-label">SOUNDMATCH / 01</div><h2>Let&apos;s get the<br/><span>right details.</span></h2><p>No audio engineering degree required. If you don&apos;t know something, leave it blank and we&apos;ll flag it for review.</p><div className="wizard-steps">{steps.map((label,index)=><div key={label} className={index===step?"wizard-step active":index<step?"wizard-step complete":"wizard-step"}><span>{index<step?<Check size={15}/>:String(index+1).padStart(2,"0")}</span>{label}</div>)}</div><div className="wizard-aside-foot"><ShieldCheck size={17}/> No guessed specifications.</div></aside>
      <div className="wizard-main">
        {step < 3 ? (
          <>
            <div className="wizard-progress"><span>STEP 0{step+1} / 03</span><div><i style={{width:`${((step+1)/3)*100}%`}}/></div></div>
            {step===0 && <div className="wizard-form-step"><div className="eyebrow eyebrow-dark">FIRST, THE SPACE</div><h2>What are you building for?</h2><p className="form-intro">We&apos;ll use this to shape the system roles — not to guess exact speaker models.</p><label className="field-label" htmlFor="venue">Application / venue</label><select id="venue" value={form.venue} onChange={e=>update("venue",e.target.value as SoundMatchInput["venue"])}><option value="church">Church / worship space</option><option value="live">Live music venue</option><option value="dj">DJ setup</option><option value="school">School / auditorium</option><option value="commercial">Commercial space</option><option value="other">Something else</option></select><label className="field-label">Where will it be used?</label><div className="choice-row">{(["indoor","outdoor","both"] as const).map(value=><button type="button" key={value} onClick={()=>update("indoor",value)} className={form.indoor===value?"choice active":"choice"}>{value==="both"?"Indoor + outdoor":value[0].toUpperCase()+value.slice(1)}</button>)}</div><label className="field-label" htmlFor="audience">Typical audience size</label><input id="audience" className="range-input" type="number" min="1" max="100000" step="1" value={form.audience} onChange={e=>update("audience",e.target.value===""?0:Number(e.target.value))}/><p className="field-help">Enter a typical audience from 1 to 100,000 people. Larger projects always require a coverage review.</p><label className="field-label" htmlFor="dimensions">Room dimensions (optional)</label><input id="dimensions" value={form.dimensions} onChange={e=>update("dimensions",e.target.value)} placeholder="e.g. 60 ft × 40 ft × 18 ft"/><p className="field-help">A rough estimate is fine. Leave blank if you don&apos;t know.</p></div>}
            {step===1 && <div className="wizard-form-step"><div className="eyebrow eyebrow-dark">WHAT MATTERS MOST?</div><h2>Choose your top priority.</h2><p className="form-intro">Pick the one that matters most. You can explain the rest in your project brief.</p><div className="priority-grid">{([{value:"speech",title:"Clear speech",desc:"Voices, announcements, spoken word"},{value:"music",title:"Balanced music",desc:"Playback and live music"},{value:"bass",title:"Strong low end",desc:"Bass and impact"},{value:"portable",title:"Easy to move",desc:"Portable and quick to set up"},{value:"expandable",title:"Room to grow",desc:"Add zones or equipment later"}] as const).map(item=><button type="button" key={item.value} className={form.priority===item.value?"priority-card active":"priority-card"} onClick={()=>update("priority",item.value)}><span>{item.title}</span><small>{item.desc}</small></button>)}</div><label className="field-label" htmlFor="budget">Target budget in USD (optional)</label><div className="input-prefix"><span>$</span><input id="budget" type="number" min="0" max="10000000" value={form.budget ?? ""} onChange={e=>update("budget",e.target.value===""?null:Number(e.target.value))} placeholder="Not sure yet"/></div><p className="field-help">No price estimate will be invented. This helps shape the conversation.</p></div>}
            {step===2 && <div className="wizard-form-step"><div className="eyebrow eyebrow-dark">WHAT DO YOU ALREADY HAVE?</div><h2>Start with your current gear.</h2><p className="form-intro">Existing equipment can change what you need to buy. Add brands and model names if you know them.</p><label className="field-label" htmlFor="existing">Current equipment (optional)</label><textarea id="existing" rows={5} maxLength={500} value={form.existing} onChange={e=>update("existing",e.target.value)} placeholder="e.g. Allen & Heath SQ-5, two powered tops, wireless microphones…"/><div className="character-count">{form.existing.length}/500</div><label className="toggle-line"><input type="checkbox" checked={form.installation} onChange={e=>update("installation",e.target.checked)}/><span><b>I&apos;d like help with installation</b><small>Include installation / setup in the project brief.</small></span></label></div>}
            <div className="wizard-actions"><button type="button" className="button button-ghost button-dark" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))}><ArrowLeft size={17}/> Back</button><button type="button" className="button button-primary" disabled={errors.length>0} onClick={()=>setStep(s=>Math.min(3,s+1))}>Continue <ArrowRight size={17}/></button></div>
          </>
        ) : (
          <div className="wizard-results"><div className="results-heading"><div className="eyebrow eyebrow-dark">YOUR PRELIMINARY SYSTEM PLAN</div><h2>Three ways to<br/>build it better.</h2><p>Based on your {form.venue} project for around {form.audience.toLocaleString()} people. Choose the path that feels closest — BZaudio can review it with you.</p></div><div className="results-cards">{plans.map((plan,index)=><button type="button" key={plan.name} className={selected===plan.name?"result-card selected":"result-card"} onClick={()=>setSelected(plan.name)}><div className="result-card-top"><span>0{index+1}</span><span className="review-tag"><CircleAlert size={13}/> REVIEW REQUIRED</span></div><h3>{plan.name}</h3><p>{plan.summary}</p><span className="result-tradeoff">{plan.tradeoff}</span></button>)}</div><div className="selected-plan"><div className="selected-plan-head"><div><span>SELECTED PATH</span><h3>{selected}</h3></div><span className="review-tag"><CircleAlert size={13}/> NEEDS REVIEW</span></div><div className="role-list">{plans.find(p=>p.name===selected)?.roles.map((role,index)=><div className="role-row" key={role.role}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{role.role}</strong><small>{role.reason}</small></div><em>{role.quantity}</em></div>)}</div><div className="review-warning"><CircleAlert size={18}/><p><b>This is a planning outline, not a verified equipment list.</b> Product models, amplifier loads, speaker coverage, power, rigging, and final compatibility must be checked against manufacturer specifications and the actual site. No live pricing or stock data is connected.</p></div><div className="results-actions"><button type="button" className="button button-primary" onClick={copyBrief}><Clipboard size={17}/>{copied?"Brief copied":"Copy project brief"}</button><Link href="/contact?type=soundmatch" className="button button-ghost button-dark">Request a review <ArrowRight size={17}/></Link><button type="button" className="reset-button" onClick={()=>{setForm(initial);setStep(0);setSelected("Recommended");}}><RotateCcw size={15}/> Start over</button></div><p className="copy-note">{copied?"The brief is copied. Paste it into a message to BZaudio.":"Your answers stay in this browser session. Copy the brief to keep it; nothing is sent or stored."}</p></div>
          </div>
        )}
      </div>
    </div>
  );
}