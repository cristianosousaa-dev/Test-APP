export const briefServices = [
  "Software à medida",
  "Automação e integrações",
  "Site ou loja",
] as const;
export type BriefContext = { service?: string; plan?: string };
export const selectBriefContext = (context: BriefContext = {}) => {
  window.dispatchEvent(new CustomEvent("orchestr:brief", { detail: context }));
};
