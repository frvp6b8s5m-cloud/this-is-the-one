"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, AudioLines } from "lucide-react";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/soundmatch", label: "SoundMatch" },
  { href: "/tools", label: "Tools" },
  { href: "/installation", label: "Installation" },
  { href: "/studio", label: "Studio" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand-mark" aria-label="BZaudio home" onClick={() => setOpen(false)}>
          <span className="brand-icon"><AudioLines size={21} strokeWidth={2.4} /></span>
          <span>BZ<span className="brand-light">audio</span></span>
        </Link>
        <nav className={open ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
          ))}
          <Link href="/contact" className="mobile-quote" onClick={() => setOpen(false)}>Get a quote <span>↗</span></Link>
        </nav>
        <Link href="/contact" className="nav-cta">Get a quote <span>↗</span></Link>
        <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
