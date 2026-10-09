export const signalSections = ['introduction', 'projects', 'about', 'experience', 'languages', 'tools', 'ai'] as const;
export type SignalSection = (typeof signalSections)[number];

// Original AZ geometry: repeated angular initials, not a measured waveform.
export const signalPaths = Array.from({ length: 7 }, (_, index) => {
  const x = index * 19;
  return `M ${28 + x} 290 L ${128 + x} 65 L ${228 + x} 290 L ${128 + x} 290 L ${298 + x} 120 L ${198 + x} 120`;
});
