import type { Metadata } from "next";
import { ArrowUpRight, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { categories, plannedBrands } from "@/lib/catalog";
import { ProductCategoryCard } from "@/components/product-category-card";

export const metadata: Metadata = { title: "Shop audio equipment" };

export default function ShopPage() {
  return (
    <div className="page-shell">
      <section className="page-hero"><div className="container"><div className="eyebrow"><span className="eyebrow-dot"/> BZAUDIO SUPPLY</div><h1>Find the right<br/><span>piece of the system.</span></h1><p>Explore the categories we source across. Tell us what you need and we&apos;ll help identify the right options from available manufacturers.</p><div className="page-hero-actions"><Link href="/contact" className="button button-primary">Request product sourcing <ArrowUpRight size={18}/></Link><span><ShieldCheck size={16}/> Supplier and stock details confirmed per quote</span></div></div></section>
      <section className="section section-paper"><div className="container"><div className="section-heading compact-heading"><div><div className="eyebrow eyebrow-dark">SHOP BY CATEGORY</div><h2>Build it <span className="text-accent">piece by piece.</span></h2></div><p>We are setting up verified manufacturer and supplier listings. Until then, browse by equipment role and send us a sourcing request.</p></div><div className="category-grid">{categories.map((category)=><ProductCategoryCard key={category.slug} category={category}/>)}</div><div className="catalog-notice"><Search size={19}/><div><strong>Verified product catalog is being assembled.</strong><p>We won&apos;t publish placeholder prices, pretend an item is in stock, or claim a brand relationship that hasn&apos;t been confirmed.</p></div></div></div></section>
      <section className="section brand-section"><div className="container"><div className="eyebrow"><span className="eyebrow-dot"/> MANUFACTURER ECOSYSTEM</div><h2>One catalog.<br/><span>Many manufacturers.</span></h2><div className="brand-list">{plannedBrands.map((brand,i)=><div key={brand}><span>0{i+1}</span>{brand}<ArrowUpRight size={15}/></div>)}</div><p className="brand-note">These names are examples of manufacturers BZaudio may source from. They are not a representation of current inventory, authorization, or partnership.</p></div></section>
    </div>
  );
}