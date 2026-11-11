"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CircleAlert, Clipboard, RotateCcw, ShieldCheck } from "lucide-react";
import { evaluateSoundMatch, type SoundMatchInput, type PackagePlan, validateSoundMatchInput } from "@/lib/soundmatch";

const initial: SoundMatchInput = {
  venue: "church", indoor: "indoor", audience: 150, budget: null, priority: "speech",
  existing: "", dimensions: "", installation: false, coverage: "unknown", zones: 1,
  subwoofers: "unsure", monitoring: "unsure", micChannels: 16, mixer: "no-preference",
  sources: ["Microphones", "Playback"], connectivity: ["Analog XLR"], mounting: "unknown",
  power: "unknown", expansion: "some",
};

const steps = ["Space & venue", "Audience & coverage", "Sound goals", "Signal workflow", "Infrastructure", "Existing gear"];

const sourceOptions = ["Microphones", "Playback", "Instruments / DI", "DJ controller", "Computer / USB", "Video / HDMI audio", "Network audio"];
const connectionOptions = ["Analog XLR", "TRS / instrument", "AES digital", "Dante / audio network", "USB audio", "Bluetooth / wireless", "Optical / consumer digital"];

function Choice({ label, description, selected, onClick }: { label: string; description?: string; selected: boolean; onClick: () => void }) {
  return <button type="button" className={selected ? "priority-card active" : "priority-card"} onClick={onClick} aria-pressed={selected}><span>{label}</span>{description && <small>{description}</small>}</button>;
}

export function SoundMatchWizard() {
  const [form, setForm] = useState<SoundMatchInput>(initial);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<PackagePlan["name"]>("Recommended");
  const [copied, setCopied] = useState(false);
  const [editablePlans, setEditablePlans] = useState<Record<string, PackagePlan["roles"]>>({});
  const [customRole, setCustomRole] = useState("");
  const [customQuantity, setCustomQuantity] = useState("1");
  const [comparePlans, setComparePlans] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [savedDesigns, setSavedDesigns] = useState<Array<{id:string;name:string;form:SoundMatchInput;selected:PackagePlan["name"];roles:Record<string,PackagePlan["roles"]>}>>([]);
  useEffect(() => { try { const stored = window.localStorage.getItem("bzaudio-soundmatch-designs"); if (stored) setSavedDesigns(JSON.parse(stored)); } catch { /* Ignore unavailable or malformed saved designs. */ } }, []);
  const errors = useMemo(() => validateSoundMatchInput(form), [form]);
  const plans = useMemo(() => evaluateSoundMatch(form), [form]);
  const update = <K extends keyof SoundMatchInput>(key: K, value: SoundMatchInput[K]) => setForm((current) => ({ ...current, [key]: value }));

  const summary = () => [
    "BZaudio SoundMatch — advanced project brief",
    `Venue: ${form.venue}; environment: ${form.indoor}; audience: ${form.audience}`,
    `Dimensions: ${form.dimensions || "Not provided"}; coverage: ${form.coverage}; zones: ${form.zones}`,
    `Priority: ${form.priority}; subwoofers: ${form.subwoofers}; monitoring: ${form.monitoring}`,
    `Mixer: ${form.mixer}; mic/line inputs: ${form.micChannels}; sources: ${form.sources.join(", ") || "Not specified"}`,
    `Connectivity: ${form.connectivity.join(", ") || "Not specified"}; mounting: ${form.mounting}; power: ${form.power}`,
    `Budget: ${form.budget === null ? "Not provided" : form.budget.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}`,
    `Existing equipment: ${form.existing || "Not provided"}`,
    `Expansion: ${form.expansion}; installation help: ${form.installation ? "Requested" : "Not requested"}`,
    `Preferred planning path: ${selected}`,
    ...((editablePlans[selected] ?? plans.find((plan) => plan.name === selected)?.roles ?? []).map((role) => `${role.role}: ${role.quantity} — ${role.reason}`)),
    "Note: Preliminary role-based plan only. Product models, pricing, stock, compatibility, coverage, rigging, and electrical requirements require verified data and qualified technical review.",
  ].join("\n");

  async function copyBrief() {
    try { await navigator.clipboard.writeText(summary()); setCopied(true); }
    catch { setCopied(false); }
  }

  function toggleArray(key: "sources" | "connectivity", value: string) {
    const current = form[key];
    update(key, current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
    setCopied(false);
  }

  const radio = <T extends string>(value: T, current: T, setter: (value: T) => void, options: {value:T;label:string;description?:string}[]) => (
    <div className="priority-grid">{options.map((option) => <Choice key={option.value} label={option.label} description={option.description} selected={current === option.value} onClick={() => setter(option.value)} />)}</div>
  );

  return (
    <div className="wizard-layout wizard-advanced">
      <aside className="wizard-aside">
        <div className="wizard-aside-label">SOUNDMATCH / CONFIGURATOR</div>
        <h2>Design the<br/><span>whole system.</span></h2>
        <p>Build a detailed project brief around your venue, audience, signal flow, and installation needs. Unknown answers are okay—they become review items.</p>
        <div className="wizard-steps">{steps.map((label,index)=><button type="button" key={label} onClick={()=>setStep(index)} className={index===step?"wizard-step active":index<step?"wizard-step complete":"wizard-step"}><span>{index<step?<Check size={15}/>:String(index+1).padStart(2,"0")}</span>{label}</button>)}<div className={step===6?"wizard-step active":"wizard-step"}><span>07</span>Your system plan</div></div>
        <div className="wizard-aside-foot"><ShieldCheck size={17}/> No guessed specifications.</div>
      </aside>
      <div className="wizard-main">
        {step < 6 ? <>
          <div className="wizard-progress"><span>STEP 0{step+1} / 06</span><div><i style={{width:`${((step+1)/6)*100}%`}}/></div></div>
          {step===0 && <div className="wizard-form-step"><div className="eyebrow eyebrow-dark">01 / THE SPACE</div><h2>Tell us about the venue.</h2><p className="form-intro">Start with the environment and physical space. Exact dimensions are useful but not required.</p><label className="field-label" htmlFor="venue">Application / venue</label><select id="venue" value={form.venue} onChange={e=>update("venue",e.target.value as SoundMatchInput["venue"])}><option value="church">Church / worship space</option><option value="live">Live music venue</option><option value="dj">DJ setup</option><option value="school">School / auditorium</option><option value="commercial">Commercial space</option><option value="other">Something else</option></select><span className="field-label">Environment</span>{radio(form.indoor,form.indoor,(v)=>update("indoor",v),[{value:"indoor",label:"Indoor"},{value:"outdoor",label:"Outdoor"},{value:"both",label:"Indoor + outdoor"}])}<label className="field-label" htmlFor="dimensions">Room dimensions (optional)</label><input id="dimensions" value={form.dimensions} maxLength={120} onChange={e=>update("dimensions",e.target.value)} placeholder="e.g. 60 ft × 40 ft × 18 ft"/><p className="field-help">Include length × width × ceiling height if known.</p></div>}
          {step===1 && <div className="wizard-form-step"><div className="eyebrow eyebrow-dark">02 / AUDIENCE & COVERAGE</div><h2>Who needs to hear it?</h2><p className="form-intro">These details shape coverage planning—not a promise of SPL or speaker quantity.</p><label className="field-label" htmlFor="audience">Typical audience size</label><input id="audience" type="number" min="1" max="100000" value={form.audience} onChange={e=>update("audience",e.target.value===""?0:Number(e.target.value))}/><div className="wizard-range"><input aria-label="Audience size slider" type="range" min="1" max="5000" value={Math.min(form.audience,5000)} onChange={e=>update("audience",Number(e.target.value))}/><span>{form.audience.toLocaleString()} people</span></div><label className="field-label">Coverage shape</label>{radio(form.coverage,form.coverage,(v)=>update("coverage",v),[{value:"wide",label:"Wide & shallow",description:"Broad audience area"},{value:"long",label:"Long & narrow",description:"Deeper throw distance"},{value:"distributed",label:"Multiple areas",description:"Several listening zones"},{value:"unknown",label:"Not sure",description:"Help me determine this"}])}<label className="field-label" htmlFor="zones">Number of independent audio zones</label><input id="zones" type="number" min="1" max="32" value={form.zones} onChange={e=>update("zones",Number(e.target.value))}/><p className="field-help">Examples: main room, lobby, overflow, patio, classrooms.</p></div>}
          {step===2 && <div className="wizard-form-step"><div className="eyebrow eyebrow-dark">03 / SOUND GOALS</div><h2>What should the system do best?</h2><p className="form-intro">Choose the main priority, then describe the low-frequency and monitoring needs.</p><label className="field-label">Primary priority</label>{radio(form.priority,form.priority,(v)=>update("priority",v),[{value:"speech",label:"Speech clarity",description:"Voices and announcements"},{value:"music",label:"Balanced music",description:"Playback and live music"},{value:"bass",label:"Powerful low end",description:"Bass and impact"},{value:"portable",label:"Portability",description:"Fast setup and transport"},{value:"expandable",label:"Expansion",description:"Grow into more zones"}])}<label className="field-label">Subwoofer approach</label>{radio(form.subwoofers,form.subwoofers,(v)=>update("subwoofers",v),[{value:"none",label:"No subs planned"},{value:"one-pair",label:"One pair"},{value:"multiple",label:"Multiple subs"},{value:"unsure",label:"Help me decide"}])}<label className="field-label">Stage monitoring</label>{radio(form.monitoring,form.monitoring,(v)=>update("monitoring",v),[{value:"none",label:"Not needed"},{value:"wedges",label:"Floor wedges"},{value:"in-ear",label:"In-ear monitors"},{value:"both",label:"Both types"},{value:"unsure",label:"Not sure"}])}</div>}
          {step===3 && <div className="wizard-form-step"><div className="eyebrow eyebrow-dark">04 / SIGNAL WORKFLOW</div><h2>Map your inputs and sources.</h2><p className="form-intro">This helps estimate the mixer I/O and connectivity requirements. It does not verify specific model compatibility.</p><label className="field-label" htmlFor="channels">Mic / line input channels</label><input id="channels" type="number" min="0" max="256" value={form.micChannels} onChange={e=>update("micChannels",Number(e.target.value))}/><label className="field-label">Mixer preference</label>{radio(form.mixer,form.mixer,(v)=>update("mixer",v),[{value:"digital",label:"Digital mixer"},{value:"analog",label:"Analog mixer"},{value:"no-preference",label:"No preference"},{value:"already-own",label:"Use my existing mixer"}])}<label className="field-label">Audio sources (select all that apply)</label><div className="wizard-check-grid">{sourceOptions.map(item=><label key={item}><input type="checkbox" checked={form.sources.includes(item)} onChange={()=>toggleArray("sources",item)}/><span>{item}</span></label>)}</div><label className="field-label">Connection types (select all that apply)</label><div className="wizard-check-grid">{connectionOptions.map(item=><label key={item}><input type="checkbox" checked={form.connectivity.includes(item)} onChange={()=>toggleArray("connectivity",item)}/><span>{item}</span></label>)}</div></div>}
          {step===4 && <div className="wizard-form-step"><div className="eyebrow eyebrow-dark">05 / INFRASTRUCTURE</div><h2>How will it be installed?</h2><p className="form-intro">Physical installation constraints are critical. Unknown is a valid answer and will be flagged for a site review.</p><label className="field-label">Loudspeaker mounting approach</label>{radio(form.mounting,form.mounting,(v)=>update("mounting",v),[{value:"floor",label:"Floor / stand"},{value:"wall",label:"Wall mounted"},{value:"flown",label:"Flown / rigged"},{value:"mixed",label:"Mixed approach"},{value:"unknown",label:"Not determined"}])}<label className="field-label">Electrical supply</label>{radio(form.power,form.power,(v)=>update("power",v),[{value:"standard",label:"Existing standard circuits"},{value:"dedicated",label:"Dedicated circuits planned"},{value:"unknown",label:"Not sure"}])}<label className="field-label">Future expansion</label>{radio(form.expansion,form.expansion,(v)=>update("expansion",v),[{value:"fixed",label:"Keep it fixed"},{value:"some",label:"Some room to grow"},{value:"major",label:"Major future expansion"}])}</div>}
          {step===5 && <div className="wizard-form-step"><div className="eyebrow eyebrow-dark">06 / PROJECT DETAILS</div><h2>What do you already have?</h2><p className="form-intro">Add equipment models and project constraints. This makes the handoff much more useful.</p><label className="field-label" htmlFor="existing">Existing equipment / brands / models</label><textarea id="existing" rows={5} maxLength={500} value={form.existing} onChange={e=>update("existing",e.target.value)} placeholder="e.g. Allen & Heath SQ-5, two powered tops, four wireless microphones…"/><div className="character-count">{form.existing.length}/500</div><label className="field-label" htmlFor="budget">Target budget in USD (optional)</label><div className="input-prefix"><span>$</span><input id="budget" type="number" min="0" max="10000000" value={form.budget??""} onChange={e=>update("budget",e.target.value===""?null:Number(e.target.value))} placeholder="Not sure yet"/></div><label className="toggle-line"><input type="checkbox" checked={form.installation} onChange={e=>update("installation",e.target.checked)}/><span><b>I want installation / setup help</b><small>Include site coordination and commissioning in the brief.</small></span></label></div>}
          <div className="wizard-actions"><button type="button" className="button button-ghost button-dark" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))}><ArrowLeft size={17}/> Back</button><button type="button" className="button button-primary" disabled={errors.length>0} onClick={()=>setStep(s=>Math.min(6,s+1))}>Continue <ArrowRight size={17}/></button></div>
          {errors.length>0 && <p className="field-help" role="alert">{errors.join(" ")}</p>}
        </> : <div className="wizard-results">
          <div className="results-heading"><div className="eyebrow eyebrow-dark">YOUR CONFIGURATION / PRELIMINARY PLAN</div><h2>A system plan built<br/>around your workflow.</h2><p>{form.venue} · {form.audience.toLocaleString()} people · {form.zones} zone(s) · {form.priority} priority</p></div>
          <div className="results-cards">{plans.map((plan,index)=><button type="button" key={plan.name} className={selected===plan.name?"result-card selected":"result-card"} onClick={()=>setSelected(plan.name)} aria-pressed={selected===plan.name}><div className="result-card-top"><span>0{index+1}</span><span className="review-tag"><CircleAlert size={13}/> NEEDS REVIEW</span></div><h3>{plan.name}</h3><p>{plan.summary}</p><span className="result-tradeoff">{plan.tradeoff}</span></button>)}</div>
          <div className="selected-plan"><div className="selected-plan-head"><div><span>SELECTED SYSTEM APPROACH</span><h3>{selected}</h3></div><span className="review-tag"><CircleAlert size={13}/> TECHNICAL REVIEW REQUIRED</span></div><div className="customizer-toolbar"><div><b>Customize this system</b><small>Edit quantities, remove roles, or add your own planning items.</small></div><button type="button" className="compare-toggle" aria-pressed={comparePlans} onClick={()=>setComparePlans(v=>!v)}>{comparePlans?"Hide comparison":"Compare all 3 plans"}</button></div>
<div className="role-list">{(editablePlans[selected] ?? plans.find(p=>p.name===selected)?.roles ?? []).map((role,index)=><div className="role-row editable-role" key={role.role+"-"+index}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{role.role}</strong><small>{role.reason}</small></div><label className="role-quantity">Quantity / scope<input aria-label={role.role+" quantity or scope"} value={role.quantity} onChange={e=>setEditablePlans(current=>({...current,[selected]:(current[selected] ?? plans.find(p=>p.name===selected)?.roles ?? []).map((item,i)=>i===index?{...item,quantity:e.target.value}:item)}))}/></label><button type="button" className="remove-role" aria-label={"Remove "+role.role} onClick={()=>setEditablePlans(current=>({...current,[selected]:(current[selected] ?? plans.find(p=>p.name===selected)?.roles ?? []).filter((_,i)=>i!==index)}))}>×</button></div>)}</div>
<div className="add-role-row"><input aria-label="New system role" value={customRole} onChange={e=>setCustomRole(e.target.value)} placeholder="Add a custom item (e.g. wireless microphones)"/><input aria-label="Custom item quantity" value={customQuantity} onChange={e=>setCustomQuantity(e.target.value)} placeholder="Quantity / scope"/><button type="button" className="button button-ghost button-dark" disabled={!customRole.trim()} onClick={()=>{setEditablePlans(current=>({...current,[selected]:[...(current[selected] ?? plans.find(p=>p.name===selected)?.roles ?? []),{role:customRole.trim(),quantity:customQuantity.trim()||"To be determined",reason:"Custom item added by the customer; compatibility and specifications require technical verification."}]}));setCustomRole("");setCustomQuantity("1");}}>Add item +</button></div>
{comparePlans && <div className="plan-comparison"><div className="comparison-heading"><b>Side-by-side scope comparison</b><small>See which planning roles are included in each approach. Quantities and scope are preliminary, not product counts.</small></div><div className="comparison-matrix"><div className="comparison-matrix-head"><span>System role</span>{plans.map(plan=><strong key={plan.name}>{plan.name}</strong>)}</div>{Array.from(new Set(plans.flatMap(plan=>(editablePlans[plan.name]??plan.roles).map(role=>role.role)))).map(roleName=><div className="comparison-matrix-row" key={roleName}><b>{roleName}</b>{plans.map(plan=>{const role=(editablePlans[plan.name]??plan.roles).find(item=>item.role===roleName);return <span key={plan.name}>{role?role.quantity:"—"}</span>})}</div>)}<div className="comparison-matrix-foot"><span>Planning items</span>{plans.map(plan=><strong key={plan.name}>{(editablePlans[plan.name]??plan.roles).length}</strong>)}</div></div><p className="comparison-note">A dash means that role is not currently included in that tier&apos;s planning outline. This comparison does not establish product compatibility, final quantities, or performance.</p></div>}
<div className="save-design-panel"><div><b>Save this configuration</b><small>Saved in this browser on this device. No account required.</small></div><div className="save-design-controls"><input aria-label="Design name" value={saveName} onChange={e=>setSaveName(e.target.value)} placeholder="e.g. Main sanctuary system"/><button type="button" className="button button-primary" disabled={!saveName.trim()} onClick={()=>{const next=[...savedDesigns,{id:String(Date.now()),name:saveName.trim(),form,selected,roles:editablePlans}];setSavedDesigns(next);try{window.localStorage.setItem("bzaudio-soundmatch-designs",JSON.stringify(next));}catch{}setSaveName("");}}>Save design</button></div>{savedDesigns.length>0 && <div className="saved-design-list">{savedDesigns.map(design=><div key={design.id}><button type="button" onClick={()=>{setForm(design.form);setSelected(design.selected);setEditablePlans(design.roles);setStep(6);}}><strong>{design.name}</strong><small>{design.selected} · {design.form.venue} · {design.form.audience.toLocaleString()} audience</small></button><button type="button" className="remove-role" aria-label={"Delete "+design.name} onClick={()=>{const next=savedDesigns.filter(item=>item.id!==design.id);setSavedDesigns(next);try{window.localStorage.setItem("bzaudio-soundmatch-designs",JSON.stringify(next));}catch{}}}>×</button></div>)}</div>}</div>
            <div className="review-warning"><CircleAlert size={18}/><p><b>Preliminary planning only.</b> This is not a verified bill of materials, acoustic simulation, coverage prediction, or rigging/electrical design. Exact products, pricing, inventory, signal compatibility, SPL, coverage, arrays, structural loads, power, and commissioning require verified manufacturer data and qualified technical review.</p></div>
            <div className="results-actions"><button type="button" className="button button-primary" onClick={copyBrief}><Clipboard size={17}/>{copied?"Brief copied":"Copy detailed project brief"}</button><Link href="/contact?type=soundmatch" className="button button-ghost button-dark">Request a technical review <ArrowRight size={17}/></Link><button type="button" className="reset-button" onClick={()=>{setForm(initial);setStep(0);setSelected("Recommended");setCopied(false);}}><RotateCcw size={15}/> Start over</button></div>
          </div>
        </div>}
      </div>
    </div>
  );
}
