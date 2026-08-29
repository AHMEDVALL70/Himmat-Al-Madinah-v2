import { describe, expect, it } from "vitest";
import { moveImage, selectImageFiles } from "../shared/imageUpload";

const file = (name: string, size = 100, lastModified = 1, type = "image/jpeg") => ({ name, size, lastModified, type });

describe("image upload flow", () => {
  it("rejects duplicates within a batch and files beyond the limit", () => {
    const result = selectImageFiles([file("a.jpg"), file("a.jpg"), file("b.jpg"), file("c.jpg")], [], 2);
    expect(result.accepted.map((item) => item.name)).toEqual(["a.jpg", "b.jpg"]);
    expect(result.issues.map((issue) => issue.code)).toEqual(["limit", "duplicate"]);
  });

  it("rejects unsupported files while accepting valid files", () => {
    const result = selectImageFiles([file("bad.gif", 100, 2, "image/gif"), file("good.jpg")], [], 5);
    expect(result.accepted.map((item) => item.name)).toEqual(["good.jpg"]);
    expect(result.issues[0]?.code).toBe("unsupported");
  });

  it("moves an image without mutating the original array", () => {
    const items = [{ id: "a" }, { id: "b" }, { id: "c" }];
    expect(moveImage(items, "c", -1).map((item) => item.id)).toEqual(["a", "c", "b"]);
    expect(items.map((item) => item.id)).toEqual(["a", "b", "c"]);
  });

  it("keeps valid results when one image processor fails", async () => {
    const failures: string[] = [];
    const results = await (await import("../shared/imageUpload")).processImageBatch(["good", "bad"], async (item) => {
      if (item === "bad") throw new Error("decode failed");
      return `${item}-processed`;
    }, (item) => failures.push(item));
    expect(results).toEqual(["good-processed"]);
    expect(failures).toEqual(["bad"]);
  });
});
