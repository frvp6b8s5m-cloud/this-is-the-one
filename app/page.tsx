import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, CirclePlay, SlidersHorizontal, Wrench } from "lucide-react";
import { categories, plannedBrands } from "@/lib/catalog";
import { ProductCategoryCard } from "@/components/product-category-card";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> MULTI-BRAND AUDIO. ONE CLEAR PLAN.</div>
            <h1>Build a sound system that <span>makes sense.</span></h1>
            <p className="hero-lede">The right gear. The right setup. Help from people who understand audio — without making it complicated.</p>
            <div className="hero-actions">
              <Link href="/soundmatch" className="button button-primary">Build with SoundMatch <ArrowUpRight size={18} /></Link>
              <Link href="/shop" className="button button-ghost">Explore equipment <ArrowRight size={17} /></Link>
            </div>
            <div className="hero-proof"><span><Check size={15} /> Multi-brand sourcing</span><span><Check size={15} /> System planning</span><span><Check size={15} /> Installation support</span></div>
          </div>
          <div className="hero-visual" aria-label="Abstract audio equipment illustration">
            <div className="visual-glow" />
            <div className="rack rack-back"><div className="rack-line" /><div className="rack-line" /><div className="rack-line" /></div>
            <div className="speaker speaker-left"><div className="speaker-driver driver-large" /><div className="speaker-driver driver-small" /><div className="speaker-label">BZ / 01</div></div>
            <div className="speaker speaker-right"><div className="speaker-driver driver-large" /><div className="speaker-driver driver-small" /><div className="speaker-label">SYSTEM / READY</div></div>
            <div className="console"><div className="console-top"><span>INPUT</span><span>LEVEL</span><span>OUTPUT</span></div><div className="console-channels">{Array.from({length:9},(_,i)=><div className="console-channel" key={i}><i /><i /><b /></div>)}</div><div className="console-footer"><span>01—09</span><span className="console-leds"><i /><i /><i /></span><span>MASTER</span></div></div>
            <div className="visual-caption"><span className="caption-pulse" /> SIGNAL PATH / SIMPLIFIED</div>
          </div>
          <div className="hero-index">01 <span>/</span> 04</div>
        </div>
      </section>

      <section className="trust-strip"><div className="container trust-inner"><span>ONE PLACE FOR THE WHOLE PROJECT</span><div><b>01</b> Choose gear</div><div><b>02</b> Plan the system</div><div><b>03</b> Get it installed</div></div></section>

      <section className="section section-paper">
        <div className="container">
          <div className="section-heading"><div><div className="eyebrow eyebrow-dark">BZaudio SUPPLY</div><h2>Everything in your<br /><span className="text-accent">signal chain.</span></h2></div><p>Shop by what you need to build — not just by a wall of brand names. We source equipment from established manufacturers and help you put the pieces together.</p></div>
          <div className="category-grid">{categories.map((category)=><ProductCategoryCard key={category.slug} category={category} />)}</div>
          <div className="section-bottom"><span>CATALOG STATUS: SUPPLIER LISTINGS BEING VERIFIED</span><Link href="/shop" className="text-link">Explore categories <ArrowUpRight size={16}/></Link></div>
        </div>
      </section>

      <section className="section soundmatch-promo">
        <div className="container promo-grid">
          <div className="promo-copy"><div className="eyebrow"><span className="eyebrow-dot" /> THE BZAUDIO DIFFERENCE</div><h2>Meet your system<br />before you buy it.</h2><p>SoundMatch takes your venue, audience, budget, priorities, and existing equipment — then turns them into three clear system plans.</p><ul className="check-list"><li><Check size={17}/> Essential, Recommended, and Professional options</li><li><Check size={17}/> Understand why each system role is included</li><li><Check size={17}/> Know what still needs a technician to verify</li></ul><Link href="/soundmatch" className="button button-primary">Try SoundMatch <ArrowUpRight size={18}/></Link></div>
          <div className="plan-preview"><div className="plan-preview-head"><span>SOUNDMATCH / PREVIEW</span><span className="status-pill">GUIDED BUILD</span></div><div className="plan-venue"><span>PROJECT TYPE</span><strong>Live venue / multipurpose</strong><small>Indoor · 150 people · Music + speech</small></div><div className="mini-plan"><div><span className="mini-plan-num">01</span><div><strong>Essential</strong><small>Core system roles</small></div><span className="mini-bar bar-one"/></div><div className="mini-plan featured"><span className="mini-plan-num">02</span><div><strong>Recommended</strong><small>Balanced flexibility</small></div><span className="mini-bar bar-two"/></div><div><span className="mini-plan-num">03</span><div><strong>Professional</strong><small>Expansion ready</small></div><span className="mini-bar bar-three"/></div></div><div className="plan-preview-foot"><SlidersHorizontal size={16}/> Rules-based. Explainable. Human-reviewed.</div></div>
        </div>
      </section>

      <section className="section section-paper install-section">
        <div className="container install-grid"><div className="install-graphic"><div className="install-ring ring-one"/><div className="install-ring ring-two"/><div className="install-center"><Wrench size={34}/><span>PLAN / INSTALL / SUPPORT</span></div><div className="install-tag tag-a">SYSTEM DESIGN</div><div className="install-tag tag-b">COMMISSIONING</div></div><div className="install-copy"><div className="eyebrow eyebrow-dark">BZaudio INSTALLATION</div><h2>Good gear deserves<br /><span className="text-accent">a good setup.</span></h2><p>From a simple upgrade to a full venue system, we help plan the signal flow, select the right equipment, and coordinate installation and setup.</p><div className="service-points"><span><Check size={16}/> System planning</span><span><Check size={16}/> Equipment upgrades</span><span><Check size={16}/> Setup & configuration</span><span><Check size={16}/> Troubleshooting support</span></div><Link href="/installation" className="text-link text-link-dark">Explore installation <ArrowUpRight size={16}/></Link></div></div>
      </section>

      <section className="section brand-section"><div className="container"><div className="brand-heading"><div><div className="eyebrow"><span className="eyebrow-dot"/> THE RIGHT MANUFACTURER FOR THE JOB</div><h2>More choice.<br /><span>One point of contact.</span></h2></div><p>We are building a cross-brand catalog. Manufacturer names below are examples of the ecosystem BZaudio intends to source from; no authorized-dealer relationship or current stock is implied.</p></div><div className="brand-list">{plannedBrands.map((brand,i)=><div key={brand}><span>0{i+1}</span>{brand}<ArrowUpRight size={15}/></div>)}</div><div className="brand-note"><CirclePlay size={16}/> Brand and product availability is confirmed individually before quoting.</div></div></section>

      <section className="final-cta"><div className="container final-cta-inner"><div><div className="eyebrow"><span className="eyebrow-dot"/> LET&apos;S GET YOUR SYSTEM RIGHT</div><h2>Start with what<br />you need.</h2></div><div><p>Tell us about your space and what you&apos;re trying to do. We&apos;ll help you figure out the next step.</p><Link href="/soundmatch" className="button button-primary">Start your SoundMatch <ArrowUpRight size={18}/></Link></div><ArrowDownRight className="cta-arrow" size={76}/></div></section>
    </>
  );
}