export type MobileNavigationAction = { type: "toggle" } | { type: "open" } | { type: "close" };

export function mobileNavigationReducer(open: boolean, action: MobileNavigationAction): boolean {
  if (action.type === "toggle") return !open;
  if (action.type === "open") return true;
  return false;
}

export function getMobileNavigationAttributes(open: boolean) {
  return {
    expanded: open,
    panelVisibilityClass: open ? "block" : "hidden",
    triggerLabel: open ? { ar: "إغلاق القائمة", en: "Close menu" } : { ar: "فتح القائمة", en: "Open menu" },
  } as const;
}
