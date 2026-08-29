import { describe, expect, it } from "vitest";
import { getImageIdentity, isSupportedImage, MAX_IMAGE_BYTES } from "../shared/imageValidation";

describe("property image validation", () => {
  it("uses a stable identity that distinguishes same-name files by metadata", () => {
    expect(getImageIdentity({ name: "front.jpg", size: 100, lastModified: 1 })).not.toBe(getImageIdentity({ name: "front.jpg", size: 101, lastModified: 1 }));
    expect(getImageIdentity({ name: "front.jpg", size: 100, lastModified: 1 })).toBe("front.jpg|100|1");
  });

  it("accepts supported images within the size limit and rejects invalid files", () => {
    expect(isSupportedImage({ name: "front.jpg", size: MAX_IMAGE_BYTES, lastModified: 1, type: "image/jpeg" })).toBe(true);
    expect(isSupportedImage({ name: "front.gif", size: 100, lastModified: 1, type: "image/gif" })).toBe(false);
    expect(isSupportedImage({ name: "large.jpg", size: MAX_IMAGE_BYTES + 1, lastModified: 1, type: "image/jpeg" })).toBe(false);
  });
});
