export const stringReverse = async (
  value: string,
  delay: number,
  setString?: React.Dispatch<React.SetStateAction<string[]>>,
  setStartEnd?: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const strArr: string[] = value.split("");
  setStartEnd && setStartEnd([]);
  setString && setString([...strArr]);

  await new Promise<void>((resolve) => setTimeout(resolve, delay / 2));

  let startIndex = 0;
  let endIndex = strArr.length - 1;

  while (startIndex <= endIndex) {
    setStartEnd && setStartEnd([startIndex, endIndex]);
    await new Promise<void>((resolve) => setTimeout(resolve, delay));

    [strArr[startIndex], strArr[endIndex]] = [
      strArr[endIndex],
      strArr[startIndex],
    ];

    startIndex++;
    endIndex--;
    setStartEnd && setStartEnd([startIndex, endIndex]);
    setString && setString([...strArr]);
  }

  return strArr.join("");
};
