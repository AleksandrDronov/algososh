import { selectionSort, bubbleSort } from "./utils";

describe("Сортировка выбором", () => {
  describe("по возрастанию", () => {
    it("пустой массив", async () => {
      const arr: number[] = [];
      const res = await selectionSort(arr, "up", 0);
      expect(res).toStrictEqual([]);
    });
    it("массив из одного элемента", async () => {
      const arr: number[] = [10];
      const res = await selectionSort(arr, "up", 0);
      expect(res).toStrictEqual([10]);
    });
    it("массив из нескольких элементов", async () => {
      const arr: number[] = [10, 1, 0, -5, 100, 3];
      const res = await selectionSort(arr, "up", 0);
      expect(res).toStrictEqual([-5, 0, 1, 3, 10, 100]);
    });
  });
  describe("по убыванию", () => {
    it("пустой массив", async () => {
      const arr: number[] = [];
      const res = await selectionSort(arr, "down", 0);
      expect(res).toStrictEqual([]);
    });
    it("массив из одного элемента", async () => {
      const arr: number[] = [10];
      const res = await selectionSort(arr, "down", 0);
      expect(res).toStrictEqual([10]);
    });
    it("массив из нескольких элементов", async () => {
      const arr: number[] = [10, 1, 0, -5, 100, 3];
      const res = await selectionSort(arr, "down", 0);
      expect(res).toStrictEqual([100, 10, 3, 1, 0, -5]);
    });
  });
});


describe("Сортировка пузырьком", () => {
  describe("по возрастанию", () => {
    it("пустой массив", async () => {
      const arr: number[] = [];
      const res = await bubbleSort(arr, "up", 0);
      expect(res).toStrictEqual([]);
    });
    it("массив из одного элемента", async () => {
      const arr: number[] = [10];
      const res = await bubbleSort(arr, "up", 0);
      expect(res).toStrictEqual([10]);
    });
    it("массив из нескольких элементов", async () => {
      const arr: number[] = [10, 1, 0, -5, 100, 3];
      const res = await bubbleSort(arr, "up", 0);
      expect(res).toStrictEqual([-5, 0, 1, 3, 10, 100]);
    });
  });
  describe("по убыванию", () => {
    it("пустой массив", async () => {
      const arr: number[] = [];
      const res = await bubbleSort(arr, "down", 0);
      expect(res).toStrictEqual([]);
    });
    it("массив из одного элемента", async () => {
      const arr: number[] = [10];
      const res = await bubbleSort(arr, "down", 0);
      expect(res).toStrictEqual([10]);
    });
    it("массив из нескольких элементов", async () => {
      const arr: number[] = [10, 1, 0, -5, 100, 3];
      const res = await bubbleSort(arr, "down", 0);
      expect(res).toStrictEqual([100, 10, 3, 1, 0, -5]);
    });
  });
});
