export type VisionFinding = {
  key: "property_scene" | "pool" | "air_conditioning" | "finish_quality";
  label: string;
  value: "detected" | "not_detected" | "uncertain";
  confidence: number;
};

export type VisionAnalysis = {
  enabled: boolean;
  modelVersion: string;
  findings: VisionFinding[];
  note: string;
};

export interface PropertyVisionAnalyzer {
  analyze(imageKeys: string[]): Promise<VisionAnalysis>;
}

/** Safe default until a reviewed vision model and consent policy are configured. */
export const disabledVisionAnalyzer: PropertyVisionAnalyzer = {
  async analyze() {
    return {
      enabled: false,
      modelVersion: "disabled",
      findings: [],
      note: "Image analysis is not enabled; no visual claims were used in the valuation.",
    };
  },
};
