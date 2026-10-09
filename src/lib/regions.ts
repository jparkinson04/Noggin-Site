// The five brain regions. Colours are CSS variables from globals.css and are
// used ONLY on the brain/dot field and region keys.
export type RegionId = "whys" | "stories" | "opinions" | "personality" | "receipts";

export const regions: { id: RegionId; name: string; colour: string; line: string }[] = [
  { id: "whys", name: "Whys", colour: "var(--region-whys)", line: "Why you do what you do, and why anyone should care." },
  { id: "stories", name: "Stories", colour: "var(--region-stories)", line: "The origin, the turning point, the one that went wrong." },
  { id: "opinions", name: "Opinions", colour: "var(--region-opinions)", line: "What you believe that plenty of people in your field don’t." },
  { id: "personality", name: "Personality", colour: "var(--region-personality)", line: "The quirks, phrases and references that make you sound like you." },
  { id: "receipts", name: "Receipts", colour: "var(--region-receipts)", line: "Proof. Results, clients and numbers you can stand behind." },
];
