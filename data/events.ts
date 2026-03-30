export type EventType = "wedding" | "birthday" | "corporate" | "gala";

export interface EventConfig {
  id: EventType;
  label: string;
  headline: string;
  subheadline: string;
  components: string[];
  services: { title: string; desc: string; icon: string }[];
  upsell: { title: string; subtitle: string; price?: string };
}

export const events: Record<EventType, EventConfig> = {
  wedding: {
    id: "wedding",
    label: "Wedding",
    headline: "An Unforgettable Union",
    subheadline: "Elegant, seamless, and uniquely yours.",
    components: ["DJBooth", "DanceFloor", "LightingRig", "FloralArch"],
    services: [
      { title: "Curated Soundscapes", desc: "Custom playlists transitioning perfectly from your ceremony to a high-energy reception.", icon: "Music" },
      { title: "Ambient Lighting", desc: "Warm, architectural lighting precisely programmed to transform the structural feeling of your space.", icon: "Sun" },
      { title: "Live Entertainment", desc: "Everything from elegant string quartets during cocktails to explosive party bands at midnight.", icon: "Mic2" },
    ],
    upsell: {
      title: "Add a Premium Photo Booth",
      subtitle: "Most clients add our sleek mirror booth to capture candid, instantly printed memories for guests.",
    },
  },
  birthday: {
    id: "birthday",
    label: "Birthday",
    headline: "The Ultimate Celebration",
    subheadline: "Next-level production for your big milestone.",
    components: ["DJBooth", "DanceFloor", "LEDScreen", "Balloons"],
    services: [
      { title: "Club-Style DJ", desc: "High-energy mixing tailored to your era, keeping the dance floor completely locked down.", icon: "Headphones" },
      { title: "Visuals & Screens", desc: "Custom animated graphics, monograms, and live video feeds displayed on towering LED walls.", icon: "MonitorPlay" },
      { title: "Special Effects", desc: "Atmospheric CO2 blasts, cold spark fountains, and stadium-style confetti drops.", icon: "Sparkles" },
    ],
    upsell: {
      title: "Add LED Video Walls",
      subtitle: "Elevate your entire room's aesthetic with stunning, dynamic visual backdrops synced to the music.",
    },
  },
  corporate: {
    id: "corporate",
    label: "Corporate",
    headline: "Elevated Brand Experiences",
    subheadline: "Professional, impactful, and precisely executed.",
    components: ["Podium", "LightingRig", "LEDScreen", "Lounge"],
    services: [
      { title: "A/V Production", desc: "Crystal clear line-array audio and ultra high-resolution projection mapping for keynotes.", icon: "Video" },
      { title: "Stage Design", desc: "Custom scenic set pieces and professionally branded architectural environments.", icon: "Cuboid" },
      { title: "Seamless Run of Show", desc: "Expert technical directors on-site managing every cue without a single missed mark.", icon: "ClipboardCheck" },
    ],
    upsell: {
      title: "Add Multi-Cam Livestreaming",
      subtitle: "Broadcast your keynote flawlessly to an unlimited remote audience with our professional streaming suite.",
    },
  },
  gala: {
    id: "gala",
    label: "Gala",
    headline: "A Night of Elegance",
    subheadline: "High-end production for monumental occasions.",
    components: ["DJBooth", "DanceFloor", "LightingRig", "Chandelier"],
    services: [
      { title: "Charismatic MCs", desc: "Professional hosts who command the room, keeping the energy high and the schedule flowing flawlessly.", icon: "Mic" },
      { title: "Theatrical Lighting", desc: "Programmed light shows perfectly synched to highlight honorees, silent auctions, and special reveals.", icon: "Wand2" },
      { title: "Immersive Sound", desc: "Concert-grade audio systems that fill the room evenly, ensuring every speech and music cue is crystal clear.", icon: "Speaker" },
    ],
    upsell: {
      title: "Add Cold Sparks & Fog",
      subtitle: "The perfect cinematic addition for the grand reveal or headline performance.",
    },
  },
};
