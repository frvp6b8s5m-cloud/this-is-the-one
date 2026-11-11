"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Eye, RotateCcw, SlidersHorizontal, Sparkles } from "lucide-react";

type Accent = "orange" | "cyan" | "violet" | "lime";
type Surface = "studio" | "light";
type Density = "comfortable" | "compact";
type Motion = "full" | "reduced";

type Preferences = {
  accent: Accent;
  surface: Surface;
  density: Density;
  motion: Motion;
  showGuidance: boolean;
  showTechnicalLabels: boolean;
};

const defaults: Preferences = {
  accent: "orange",
  surface: "studio",
  density: "comfortable",
  motion: "full",
  showGuidance: true,
  showTechnicalLabels: true,
};

const accents: { id: Accent; label: string; color: string }[] = [
  { id: "orange", label: "Signal orange", color: "#ff6b35" },
  { id: "cyan", label: "Electric cyan", color: "#38c7d9" },
  { id: "violet", label: "Voltage violet", color: "#9b83ff" },
  { id: "lime", label: "Meter lime", color: "#b5d85b" },
];

export function StudioCustomizer() {
  const [prefs, setPrefs] = useState<Preferences>(defaults);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("bzaudio-preferences");
      if (raw) setPrefs({ ...defaults, ...JSON.parse(raw) });
    } catch {
      // Keep defaults if local preferences are unavailable or invalid.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.style.setProperty("--accent", accents.find((item) => item.id === prefs.accent)?.color ?? defaults.accent);
    document.body.dataset.bzaudioTheme = prefs.surface;
    document.body.dataset.bzaudioDensity = prefs.density;
    document.body.dataset.bzaudioMotion = prefs.motion;
    try {
      window.localStorage.setItem("bzaudio-preferences", JSON.stringify(prefs));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }, [prefs, ready]);

  const activeAccent = useMemo(
    () => accents.find((item) => item.id === prefs.accent) ?? accents[0],
    [prefs.accent],
  );

  function update<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    setPrefs((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    setPrefs(defaults);
  }

  return (
    <div className="studio-workspace">
      <aside className="studio-controls">
        <div className="studio-controls-head"><SlidersHorizontal size={18}/><span>YOUR EXPERIENCE SETTINGS</span></div>
        <section className="studio-control-group">
          <div className="studio-control-title"><h3>Accent color</h3><small>Set the signal color across the interface.</small></div>
          <div className="accent-options" role="group" aria-label="Accent color">
            {accents.map((item) => (
              <button type="button" key={item.id} className={prefs.accent === item.id ? "accent-option active" : "accent-option"} onClick={() => update("accent", item.id)} aria-pressed={prefs.accent === item.id} aria-label={item.label} title={item.label}>
                <span style={{ background: item.color }}/>{prefs.accent === item.id && <Check size={14}/>}
              </button>
            ))}
          </div>
          <p className="studio-selection">{activeAccent.label}</p>
        </section>
        <section className="studio-control-group">
          <div className="studio-control-title"><h3>Visual environment</h3><small>Choose the workspace atmosphere.</small></div>
          <div className="studio-segment">
            <button type="button" className={prefs.surface === "studio" ? "active" : ""} onClick={() => update("surface", "studio")} aria-pressed={prefs.surface === "studio"}>Studio dark</button>
            <button type="button" className={prefs.surface === "light" ? "active" : ""} onClick={() => update("surface", "light")} aria-pressed={prefs.surface === "light"}>Clean light</button>
          </div>
        </section>
        <section className="studio-control-group">
          <div className="studio-control-title"><h3>Interface spacing</h3><small>Adjust how much information fits on screen.</small></div>
          <div className="studio-segment">
            <button type="button" className={prefs.density === "comfortable" ? "active" : ""} onClick={() => update("density", "comfortable")} aria-pressed={prefs.density === "comfortable"}>Comfortable</button>
            <button type="button" className={prefs.density === "compact" ? "active" : ""} onClick={() => update("density", "compact")} aria-pressed={prefs.density === "compact"}>Compact</button>
          </div>
        </section>
        <section className="studio-control-group">
          <div className="studio-control-title"><h3>Motion</h3><small>Choose how animated the interface feels.</small></div>
          <div className="studio-segment">
            <button type="button" className={prefs.motion === "full" ? "active" : ""} onClick={() => update("motion", "full")} aria-pressed={prefs.motion === "full"}>Full</button>
            <button type="button" className={prefs.motion === "reduced" ? "active" : ""} onClick={() => update("motion", "reduced")} aria-pressed={prefs.motion === "reduced"}>Reduced</button>
          </div>
        </section>
        <section className="studio-control-group studio-toggles">
          <label><span><b>Helpful guidance</b><small>Show tips and explanations.</small></span><input type="checkbox" checked={prefs.showGuidance} onChange={(event) => update("showGuidance", event.target.checked)}/></label>
          <label><span><b>Technical labels</b><small>Show extra audio terminology.</small></span><input type="checkbox" checked={prefs.showTechnicalLabels} onChange={(event) => update("showTechnicalLabels", event.target.checked)}/></label>
        </section>
        <div className="studio-control-footer">
          <span className="studio-save-state"><span/> {saved ? "Saved on this device" : "Local save unavailable"}</span>
          <button type="button" className="studio-reset" onClick={reset}><RotateCcw size={14}/> Reset</button>
        </div>
      </aside>

      <section className="studio-preview" aria-label="Live appearance preview">
        <div className="studio-preview-top"><span><Eye size={15}/> LIVE PREVIEW</span><span className="studio-live"><i/> LIVE</span></div>
        <div className="studio-preview-content">
          <div className="studio-preview-kicker"><Sparkles size={14}/> BZAUDIO / YOUR WORKSPACE</div>
          <h2>Make the system<br/><span>feel like yours.</span></h2>
          <p>{prefs.showGuidance ? "Your workspace is now tuned to your preferences. Explore tools, compare ideas, and build a system plan at your own pace." : "Your workspace is tuned to your preferences."}</p>
          <div className="studio-preview-meter"><div><span>INPUT 01</span><b>-12 dB</b></div><i><span/></i><div><span>OUTPUT</span><b>READY</b></div></div>
          <div className="studio-preview-cards">
            <div><span>01 / BUILD</span><strong>SoundMatch</strong><small>{prefs.showTechnicalLabels ? "Signal flow · system roles · review" : "Plan a system for your space"}</small></div>
            <div><span>02 / EXPLORE</span><strong>Equipment</strong><small>{prefs.showTechnicalLabels ? "Mixers · loudspeakers · processing" : "Browse equipment categories"}</small></div>
          </div>
        </div>
        <div className="studio-preview-foot"><span>PERSONALIZATION</span><span>{prefs.density.toUpperCase()} / {prefs.motion.toUpperCase()} MOTION</span></div>
      </section>
    </div>
  );
}
