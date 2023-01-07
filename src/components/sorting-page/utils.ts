export const selectionSort = async (
  numArray: number[],
  directionSort: "up" | "down",
  delay: number = 500,
  setInd?: React.Dispatch<React.SetStateAction<number | undefined>>,
  setCurrInd?: React.Dispatch<React.SetStateAction<number | undefined>>,
  setNumbers?: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const arr: number[] = [...numArray];
  for (let i = 0; i < arr.length; i++) {
    setInd && setInd(i);
    let minInd = i;

    for (let j = i + 1; j < arr.length + 1; j++) {
      await new Promise<void>((resolve) => setTimeout(resolve, delay));
      setCurrInd && setCurrInd(j);
      if (directionSort === "up") {
        if (arr[j] < arr[minInd]) {
          minInd = j;
        }
      } else {
        if (arr[j] > arr[minInd]) {
          minInd = j;
        }
      }
    }

    [arr[i], arr[minInd]] = [arr[minInd], arr[i]];
    setNumbers && setNumbers([...arr]);
    setInd && setInd(i + 1);
  }
  return arr;
};

export const bubbleSort = async (
  numArray: number[],
  directionSort: "up" | "down",
  delay: number = 500,
  setInd?: React.Dispatch<React.SetStateAction<number | undefined>>,
  setCurrInd?: React.Dispatch<React.SetStateAction<number | undefined>>,
  setLastInd?: React.Dispatch<React.SetStateAction<number | undefined>>,
  setNumbers?: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const arr: number[] = [...numArray];

  for (let j = arr.length - 1; j >= -1; j--) {
    setLastInd && setLastInd(j);

    for (let i = 0; i < j; i++) {
      await new Promise<void>((resolve) => setTimeout(resolve, delay));

      setInd && setInd(i);
      setCurrInd && setCurrInd(i + 1);

      if (directionSort === "up") {
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
      } else {
        if (arr[i] < arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
      }
      setNumbers && setNumbers([...arr]);
    }

    setCurrInd && setCurrInd(undefined);
    setInd && setInd(undefined);
  }
  return arr;
};
