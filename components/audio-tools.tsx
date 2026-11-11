"use client";

import { useMemo, useState } from "react";
import { AudioLines, Calculator, Copy, Gauge, Ruler, Waves } from "lucide-react";

type Tool = "delay" | "decibels" | "wavelength";

export function AudioTools() {
  const [active, setActive] = useState<Tool>("delay");
  const [distance, setDistance] = useState("30");
  const [distanceUnit, setDistanceUnit] = useState<"ft" | "m">("ft");
  const [ratioKind, setRatioKind] = useState<"voltage" | "power">("voltage");
  const [reference, setReference] = useState("1");
  const [target, setTarget] = useState("2");
  const [frequency, setFrequency] = useState("100");
  const [temperature, setTemperature] = useState("20");
  const [copied, setCopied] = useState(false);

  const delay = useMemo(() => {
    const value = Number(distance);
    if (!Number.isFinite(value) || value < 0) return null;
    const meters = distanceUnit === "ft" ? value * 0.3048 : value;
    const ms = (meters / 343) * 1000;
    return { meters, ms, feet: meters / 0.3048 };
  }, [distance, distanceUnit]);

  const decibels = useMemo(() => {
    const a = Number(reference), b = Number(target);
    if (!Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0) return null;
    const db = (ratioKind === "voltage" ? 20 : 10) * Math.log10(b / a);
    return { db, ratio: b / a };
  }, [reference, target, ratioKind]);

  const wave = useMemo(() => {
    const hz = Number(frequency), celsius = Number(temperature);
    if (!Number.isFinite(hz) || hz <= 0 || !Number.isFinite(celsius) || celsius < -50 || celsius > 60) return null;
    const speed = 331.3 + 0.606 * celsius;
    const meters = speed / hz;
    return { speed, meters, feet: meters / 0.3048, half: meters / 2, quarter: meters / 4 };
  }, [frequency, temperature]);

  const output = active === "delay"
    ? delay ? `Distance: ${delay.meters.toFixed(2)} m / ${delay.feet.toFixed(2)} ft\nPropagation delay: ${delay.ms.toFixed(2)} ms\nReference speed: 343 m/s at approximately 20°C` : "Enter a valid non-negative distance."
    : active === "decibels"
      ? decibels ? `${ratioKind === "voltage" ? "Voltage" : "Power"} ratio: ${decibels.ratio.toFixed(4)}:1\nLevel difference: ${decibels.db >= 0 ? "+" : ""}${decibels.db.toFixed(2)} dB` : "Enter positive reference and target values."
      : wave ? `Frequency: ${Number(frequency).toLocaleString()} Hz\nWavelength: ${wave.meters.toFixed(3)} m / ${wave.feet.toFixed(3)} ft\nHalf wavelength: ${wave.half.toFixed(3)} m\nQuarter wavelength: ${wave.quarter.toFixed(3)} m\nSound speed: ${wave.speed.toFixed(1)} m/s` : "Enter a valid frequency and temperature.";

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="audio-tools">
      <aside className="tools-sidebar">
        <div className="tools-sidebar-title"><AudioLines size={18}/><span>TOOLBOX / LIVE AUDIO</span></div>
        <button type="button" className={active === "delay" ? "tool-nav active" : "tool-nav"} onClick={() => {setActive("delay");setCopied(false);}}><span><Ruler size={17}/></span><div><b>Delay calculator</b><small>Distance to milliseconds</small></div><i>01</i></button>
        <button type="button" className={active === "decibels" ? "tool-nav active" : "tool-nav"} onClick={() => {setActive("decibels");setCopied(false);}}><span><Gauge size={17}/></span><div><b>dB ratio calculator</b><small>Voltage and power ratios</small></div><i>02</i></button>
        <button type="button" className={active === "wavelength" ? "tool-nav active" : "tool-nav"} onClick={() => {setActive("wavelength");setCopied(false);}}><span><Waves size={17}/></span><div><b>Wavelength calculator</b><small>Frequency and distance</small></div><i>03</i></button>
        <div className="tools-sidebar-note"><Calculator size={16}/><p>Quick field calculations for planning and troubleshooting. Verify critical alignment with measurement tools.</p></div>
      </aside>

      <section className="tool-workspace">
        <div className="tool-workspace-head"><div><div className="eyebrow eyebrow-dark">BZAUDIO / TOOLBOX</div><h2>{active === "delay" ? "Delay calculator" : active === "decibels" ? "Decibel ratio" : "Wavelength calculator"}</h2></div><span className="tool-status"><i/> READY</span></div>

        {active === "delay" && <div className="tool-form">
          <p>Estimate the time sound takes to travel a known distance. Useful as a starting point when planning relative speaker delay.</p>
          <label htmlFor="delay-distance">Distance</label>
          <div className="tool-input-row"><input id="delay-distance" type="number" min="0" step="any" value={distance} onChange={e=>{setDistance(e.target.value);setCopied(false);}}/><select aria-label="Distance unit" value={distanceUnit} onChange={e=>setDistanceUnit(e.target.value as "ft"|"m")}><option value="ft">Feet (ft)</option><option value="m">Meters (m)</option></select></div>
          <div className="tool-hint">Uses 343 m/s, approximately the speed of sound in air at 20°C.</div>
          <div className="tool-result"><span>ESTIMATED PROPAGATION TIME</span><strong>{delay ? delay.ms.toFixed(2) : "—"}<em>ms</em></strong><small>{delay ? `${delay.meters.toFixed(2)} meters · ${delay.feet.toFixed(2)} feet` : "Enter a valid distance"}</small></div>
          <div className="tool-explain"><b>How to use it</b><p>This is the acoustic travel time for the entered distance—not a complete alignment setting. Actual alignment depends on acoustic centers, processing latency, crossover behavior, polarity, and measurement at the listening position.</p></div>
        </div>}

        {active === "decibels" && <div className="tool-form">
          <p>Calculate the level difference between two positive values. Choose whether the values represent voltage/amplitude or power.</p>
          <label>Ratio type</label><div className="tool-segment"><button type="button" className={ratioKind==="voltage"?"active":""} onClick={()=>{setRatioKind("voltage");setCopied(false);}}>Voltage / amplitude</button><button type="button" className={ratioKind==="power"?"active":""} onClick={()=>{setRatioKind("power");setCopied(false);}}>Power</button></div>
          <div className="tool-two-inputs"><div><label htmlFor="ratio-reference">Reference value</label><input id="ratio-reference" type="number" min="0.000001" step="any" value={reference} onChange={e=>{setReference(e.target.value);setCopied(false);}}/></div><div><label htmlFor="ratio-target">Target value</label><input id="ratio-target" type="number" min="0.000001" step="any" value={target} onChange={e=>{setTarget(e.target.value);setCopied(false);}}/></div></div>
          <div className="tool-result"><span>LEVEL DIFFERENCE</span><strong>{decibels ? `${decibels.db>=0?"+":""}${decibels.db.toFixed(2)}` : "—"}<em>dB</em></strong><small>{decibels ? `${decibels.ratio.toFixed(4)}× the reference` : "Both values must be greater than zero"}</small></div>
          <div className="tool-explain"><b>Formula used</b><p>{ratioKind==="voltage" ? "20 × log₁₀(target ÷ reference)" : "10 × log₁₀(target ÷ reference)"}. Voltage calculations assume comparable impedance; use the power formula when comparing power directly.</p></div>
        </div>}

        {active === "wavelength" && <div className="tool-form">
          <p>Estimate wavelength from frequency and air temperature. This is useful for understanding low-frequency behavior and acoustic dimensions.</p>
          <div className="tool-two-inputs"><div><label htmlFor="wave-frequency">Frequency (Hz)</label><input id="wave-frequency" type="number" min="0.1" step="any" value={frequency} onChange={e=>{setFrequency(e.target.value);setCopied(false);}}/></div><div><label htmlFor="wave-temperature">Air temperature (°C)</label><input id="wave-temperature" type="number" min="-50" max="60" step="any" value={temperature} onChange={e=>{setTemperature(e.target.value);setCopied(false);}}/></div></div>
          <div className="tool-result"><span>FULL WAVELENGTH</span><strong>{wave ? wave.meters.toFixed(3) : "—"}<em>m</em></strong><small>{wave ? `${wave.feet.toFixed(3)} ft · sound speed ${wave.speed.toFixed(1)} m/s` : "Check frequency and temperature"}</small></div>
          <div className="tool-measurements"><div><span>½ WAVELENGTH</span><b>{wave ? `${wave.half.toFixed(3)} m` : "—"}</b></div><div><span>¼ WAVELENGTH</span><b>{wave ? `${wave.quarter.toFixed(3)} m` : "—"}</b></div></div>
          <div className="tool-explain"><b>Formula used</b><p>Wavelength = speed of sound ÷ frequency. The speed estimate adjusts with temperature using 331.3 + (0.606 × °C).</p></div>
        </div>}

        <div className="tool-actions"><button type="button" className="button button-primary" onClick={copyResult}><Copy size={16}/>{copied ? "Copied result" : "Copy result"}</button><span>Calculations are estimates; confirm critical system decisions with appropriate measurement and review.</span></div>
      </section>
    </div>
  );
}
