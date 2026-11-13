import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  Fingerprint,
  LockKeyhole,
  RadioTower,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import styles from "./origin.module.css";

export const metadata: Metadata = {
  title: "PROJECT: ORIGIN",
  description: "A sealed BZaudio initiative. Further information is not publicly available.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const sealedRecords = [
  { id: "OR-001", label: "Origin brief", status: "SEALED" },
  { id: "OR-002", label: "System architecture", status: "WITHHELD" },
  { id: "OR-003", label: "Field documentation", status: "IN REVIEW" },
];

export default function OriginPage() {
  return (
    <div className={styles.origin}>
      <div className={styles.noise} aria-hidden="true" />
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} aria-label="Return to BZaudio home">
          <span className={styles.brandMark}><Activity size={17} strokeWidth={2.2} /></span>
          <span>BZ<span className={styles.brandLight}>audio</span></span>
        </Link>
        <div className={styles.topbarMeta}>
          <span className={styles.liveDot} />
          <span>INTERNAL INITIATIVE</span>
          <span className={styles.topbarDivider}>/</span>
          <span>FILE NO. OR-0001</span>
        </div>
        <span className={styles.classification}>RESTRICTED</span>
      </header>

      <div className={styles.main}>
        <div className={styles.eyebrow}>
          <ScanLine size={14} />
          <span>PROJECT ARCHIVE</span>
          <span className={styles.eyebrowRule} />
          <span>EST. 2026</span>
        </div>

        <section className={styles.hero} aria-labelledby="origin-title">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>A BZAUDIO INITIATIVE</p>
            <h1 id="origin-title">PROJECT<span>:</span><br />ORIGIN</h1>
            <p className={styles.heroText}>
              Some things are better introduced when they are ready.
              This file is intentionally incomplete.
            </p>
            <div className={styles.heroStatus}>
              <span className={styles.statusSquare} />
              <span>DEVELOPMENT STATUS</span>
              <strong>ACTIVE / DETAILS SEALED</strong>
            </div>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={`${styles.orbit} ${styles.orbitOne}`} />
            <div className={`${styles.orbit} ${styles.orbitTwo}`} />
            <div className={`${styles.orbit} ${styles.orbitThree}`} />
            <div className={styles.core}>
              <div className={styles.coreInner}>
                <Fingerprint size={54} strokeWidth={1} />
                <span>ORIGIN</span>
              </div>
            </div>
            <span className={`${styles.visualLabel} ${styles.visualLabelTop}`}>SIGNAL / 001</span>
            <span className={`${styles.visualLabel} ${styles.visualLabelBottom}`}>SOURCE UNDISCLOSED</span>
            <span className={styles.crosshair} />
          </div>
        </section>

        <section className={styles.notice} aria-label="Project access notice">
          <div className={styles.noticeIcon}><LockKeyhole size={18} /></div>
          <div>
            <p className={styles.noticeTitle}>ACCESS IS LIMITED</p>
            <p className={styles.noticeText}>
              The purpose, scope, and technical details of PROJECT: ORIGIN have not
              been released. No public access or operational capability is being claimed.
            </p>
          </div>
          <span className={styles.noticeStamp}>NOT FOR DISTRIBUTION</span>
        </section>

        <section className={styles.records} aria-labelledby="records-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionIndex}>01 / ARCHIVE INDEX</p>
              <h2 id="records-title">RECORDS <span>ON FILE</span></h2>
            </div>
            <span className={styles.recordCount}>03 ENTRIES</span>
          </div>
          <div className={styles.recordList}>
            {sealedRecords.map((record) => (
              <div className={styles.record} key={record.id}>
                <span className={styles.recordId}>{record.id}</span>
                <span className={styles.recordLabel}>{record.label}</span>
                <span className={styles.redaction} aria-label="Content redacted"><i /><i /><i /><i /></span>
                <span className={styles.recordStatus}>{record.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bottomGrid}>
          <div className={styles.signalPanel}>
            <div className={styles.panelHeading}><RadioTower size={15} /> <span>TRANSMISSION LOG</span></div>
            <div className={styles.signalLine}><span>13 NOV 2026</span><strong>ARCHIVE INITIALIZED</strong><i>RECORDED</i></div>
            <div className={styles.signalLine}><span>— — —</span><strong>FURTHER ENTRIES WITHHELD</strong><i>SEALED</i></div>
          </div>
          <div className={styles.integrityPanel}>
            <ShieldCheck size={19} />
            <div><strong>INTEGRITY: INTACT</strong><span>Public-facing archive · No protected data stored here</span></div>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} BZAUDIO / PROJECT: ORIGIN</span>
          <Link href="/" className={styles.returnLink}><ArrowLeft size={14} /> RETURN TO BZAUDIO <ArrowUpRight size={13} /></Link>
          <span>END OF AVAILABLE FILE</span>
        </footer>
      </div>
    </div>
  );
}
