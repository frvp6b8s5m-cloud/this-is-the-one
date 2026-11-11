import Link from "next/link";
import { AudioLines, ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link href="/" className="brand-mark footer-brand"><span className="brand-icon"><AudioLines size={20} /></span><span>BZ<span className="brand-light">audio</span></span></Link>
          <p>Professional Audio. Made Easier.</p>
        </div>
        <div className="footer-links">
          <Link href="/shop">Shop categories</Link>
          <Link href="/soundmatch">Build with SoundMatch</Link>
          <Link href="/installation">Installation</Link>
          <Link href="/studio">Personalize your workspace</Link>
          <Link href="/contact">Contact / quote</Link>
        </div>
        <Link href="/soundmatch" className="footer-prompt">Start your system plan <ArrowUpRight size={17} /></Link>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} BZaudio. Independent multi-brand audio company.</span>
        <span>Product sourcing and technical details are confirmed per project.</span>
      </div>
    </footer>
  );
}
