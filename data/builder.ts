export type AddonId = 
  | "DJBooth"
  | "LEDScreen"
  | "LightingRig"
  | "DanceFloor"
  | "Balloons"
  | "LineArrays"
  | "Chandelier"
  | "FloralArch"
  | "Podium";

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
    id: "Chandelier",
    label: "Kinetic Light Sculpture",
    category: "Lighting",
    description: "A suspended architectural chandelier with staggering geometric articulation.",
    icon: "Lightbulb",
    priceEstimate: "$2,500+",
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
    label: "Organic Balloon Garland",
    category: "Atmosphere",
    description: "Dense, cascading structural balloons installed dynamically.",
    icon: "Sparkles",
    priceEstimate: "$600+",
  },
  {
    id: "FloralArch",
    label: "Floral Arch Installation",
    category: "Atmosphere",
    description: "A lush, architectural floral arch framing the main stage entrance.",
    icon: "Flower2",
    priceEstimate: "$900+",
  },
  {
    id: "Podium",
    label: "Speaker Podium",
    category: "Atmosphere",
    description: "An elegant branded lectern for toasts, speeches, and presentations.",
    icon: "Mic2",
    priceEstimate: "$350+",
  },
];
