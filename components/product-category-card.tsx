import Link from "next/link";
import { ArrowUpRight, AudioLines, Cable, SlidersHorizontal, Speaker, Mic2, Boxes } from "lucide-react";
import type { CatalogCategory } from "@/lib/catalog";

const iconMap = {
  speakers: Speaker,
  mixers: SlidersHorizontal,
  amplification: AudioLines,
  microphones: Mic2,
  accessories: Cable,
  systems: Boxes,
};

export function ProductCategoryCard({ category }: { category: CatalogCategory }) {
  const Icon = iconMap[category.slug as keyof typeof iconMap] ?? AudioLines;
  return (
    <Link href={`/contact?category=${category.slug}`} className="category-card">
      <div className="category-card-top"><span>{category.icon}</span><Icon size={23} strokeWidth={1.7} /></div>
      <div><h3>{category.title}</h3><p>{category.description}</p></div>
      <span className="category-link">Ask us to source <ArrowUpRight size={16} /></span>
    </Link>
  );
}