import fs from "fs";

let filePath = "d:/clients/eventorganizer/components/StageBuilder.tsx";
let c = fs.readFileSync(filePath, "utf8");

const replacements = {
  "bg-white": "bg-[var(--color-bg-secondary)]",
  "text-neutral-900": "text-[var(--color-text-primary)]",
  "text-neutral-700": "text-[var(--color-text-primary)]",
  "text-neutral-600": "text-[var(--color-text-muted)]",
  "text-neutral-500": "text-[var(--color-text-muted)]",
  "text-neutral-400": "text-[var(--color-text-muted)]",
  "bg-neutral-100": "bg-[var(--color-border)]",
  "border-neutral-100": "border-[var(--color-border)]",
  "border-neutral-200": "border-[var(--color-border)]",
  "bg-neutral-900": "bg-[var(--color-text-primary)]",
  "bg-[#FCFAF5]": "bg-[var(--color-bg-primary)]",
  "bg-[radial-gradient(ellipse_at_center,_#FCFAF5_0%,_#FFFFFF_70%)]": "bg-[radial-gradient(ellipse_at_center,_var(--color-bg-primary)_0%,_var(--color-bg-secondary)_70%)]",
  "bg-neutral-800": "bg-[var(--color-text-primary)]/90",
  "bg-neutral-50": "bg-[var(--color-bg-primary)]",
  "text-white": "text-[var(--color-bg-primary)] !important-text-white-overwrite-to-fix", // We'll fix this below
};

// Apply simple string replacements
for (const [key, value] of Object.entries(replacements)) {
  c = c.split(key).join(value);
}

// Fix the gold buttons which should remain actual white text
c = c.split("bg-[#C9A84C] text-[var(--color-bg-primary)] !important-text-white-overwrite-to-fix").join("bg-[#C9A84C] text-[#FFFFFF]");
c = c.split("bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] !important-text-white-overwrite-to-fix").join("bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]");
// Also the lock checkmark icon
c = c.split("className=\"text-[var(--color-bg-primary)] !important-text-white-overwrite-to-fix\"").join("className=\"text-[#FFFFFF]\"");

fs.writeFileSync(filePath, c);
console.log("Done refactoring StageBuilder");
