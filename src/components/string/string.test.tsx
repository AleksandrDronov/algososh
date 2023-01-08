/* eslint-disable testing-library/prefer-screen-queries */
import { stringReverse } from "./utils";

describe("Корректно разворачивает строку", () => {
  it("с чётным количеством символов", async () => {
    const str: string = "abcd";
    const res = await stringReverse(str, 0);
    expect(res).toBe("dcba");
  });
  it("с нечетным количеством символов", async () => {
    const str: string = "abcde";
    const res = await stringReverse(str, 0);
    expect(res).toBe("edcba");
  });
  it("с одним символом", async () => {
    const str: string = "a";
    const res = await stringReverse(str, 0);
    expect(res).toBe("a");
  });
  it("пустую строку", async () => {
    const str: string = "";
    const res = await stringReverse(str, 0);
    expect(res).toBe("");
  });
});
