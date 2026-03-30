export type AddonId = 
  | "DJBooth"
  | "LEDScreen"
  | "LightingRig"
  | "DanceFloor"
  | "Balloons"
  | "LineArrays";

export interface BuilderModule {
  id: AddonId;
  label: string;
  category: "Audio" | "Video" | "Lighting" | "Atmosphere";
  description: string;
  icon: string;
  priceEstimate: string;
  isCore?: boolean;
}

export const builderModules: BuilderModule[] = [
  {
    id: "DJBooth",
    label: "Premium DJ Setup",
    category: "Audio",
    description: "Flawless mixing and elegant crowd control tailored for your celebration.",
    icon: "Headphones",
    priceEstimate: "$1,500+",
    isCore: true,
  },
  {
    id: "LEDScreen",
    label: "LED Video Wall",
    category: "Video",
    description: "Custom graphics and live visual feeds tailored to the music.",
    icon: "MonitorPlay",
    priceEstimate: "$2,000+",
  },
  {
    id: "LightingRig",
    label: "Programmable Stage Lighting",
    category: "Lighting",
    description: "Theatrical lighting to completely transform the energy and architecture of the room.",
    icon: "Sun",
    priceEstimate: "$1,200+",
  },
  {
    id: "DanceFloor",
    label: "Seamless Dance Floor",
    category: "Atmosphere",
    description: "A flawless, custom-wrapped floor anchoring the center of your event.",
    icon: "Box",
    priceEstimate: "$800+",
  },
  {
    id: "LineArrays",
    label: "Line Array Audio Towers",
    category: "Audio",
    description: "Concert-grade flown audio systems flanking the stage.",
    icon: "Speaker",
    priceEstimate: "$1,800+",
  },
  {
    id: "Balloons",
    label: "Special Effects",
    category: "Atmosphere",
    description: "Indoor-safe cold sparks, low-lying fog, and bespoke visual effects.",
    icon: "Sparkles",
    priceEstimate: "$600+",
  }
];
