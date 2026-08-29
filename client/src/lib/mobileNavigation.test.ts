import { describe, expect, it } from "vitest";
import { getMobileNavigationAttributes, mobileNavigationReducer } from "./mobileNavigation";

describe("mobile navigation state", () => {
  it("supports toggle, explicit open, and explicit close", () => {
    expect(mobileNavigationReducer(false, { type: "toggle" })).toBe(true);
    expect(mobileNavigationReducer(true, { type: "toggle" })).toBe(false);
    expect(mobileNavigationReducer(false, { type: "open" })).toBe(true);
    expect(mobileNavigationReducer(true, { type: "close" })).toBe(false);
  });

  it("keeps accessible labels bilingual and panel visibility synchronized", () => {
    expect(getMobileNavigationAttributes(false)).toMatchObject({ expanded: false, panelVisibilityClass: "hidden", triggerLabel: { ar: "فتح القائمة", en: "Open menu" } });
    expect(getMobileNavigationAttributes(true)).toMatchObject({ expanded: true, panelVisibilityClass: "block", triggerLabel: { ar: "إغلاق القائمة", en: "Close menu" } });
  });
});
