export type CatalogCategory = {
  slug: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
};

export const categories: CatalogCategory[] = [
  { slug: "speakers", title: "Loudspeakers", description: "Powered and passive PA, install speakers, and subwoofers.", detail: "PA tops, subwoofers, stage monitors, and installed sound." , icon: "01" },
  { slug: "mixers", title: "Mixers & consoles", description: "Digital and analog mixing for live sound and installed systems.", detail: "Digital consoles, analog mixers, stage boxes, and control surfaces.", icon: "02" },
  { slug: "amplification", title: "Amplifiers & DSP", description: "Power, processing, system control, and signal management.", detail: "Power amplifiers, loudspeaker processing, and system controllers.", icon: "03" },
  { slug: "microphones", title: "Microphones", description: "Wired, wireless, instrument, and measurement microphones.", detail: "Vocal, instrument, wireless, and measurement microphone systems.", icon: "04" },
  { slug: "accessories", title: "Cables & accessories", description: "The practical pieces that make a complete system work.", detail: "Signal and speaker cable, stands, mounts, cases, and connectors.", icon: "05" },
  { slug: "systems", title: "Complete systems", description: "Thoughtful combinations for venues, churches, DJs, and events.", detail: "System packages planned around your venue and requirements.", icon: "06" },
];

export const plannedBrands = ["Allen & Heath", "Martin Audio", "Yamaha", "QSC", "Shure", "Sennheiser", "Electro-Voice", "d&b audiotechnik"];
