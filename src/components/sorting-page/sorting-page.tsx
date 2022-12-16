import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [ind, setInd] = useState<number>();
  const [currInd, setCurrInd] = useState<number>();
  const [lastInd, setLastInd] = useState<number>();
  const [isLoaded, setLoaded] = useState(false);
  const [radioValue, setRadio] = useState<string>("selection");

  const randomArr = () => {
    setInd(undefined);
    setCurrInd(undefined);
    setLastInd(undefined);
    const arr: number[] = [];
    let count = 3 + Math.round(Math.random() * 14);

    for (let i = 0; i < count; i++) {
      const randomNum = Math.round(Math.random() * 100);
      arr.push(randomNum);
    }
    setNumbers([...arr]);
  };

  const selectionSort = async (directionSort: string) => {
    setLoaded(true);
    const arr: number[] = [...numbers];
    for (let i = 0; i < arr.length; i++) {
      setInd(i);
      let minInd = i;

      for (let j = i + 1; j < arr.length + 1; j++) {
        await new Promise<void>((resolve) => setTimeout(resolve, 500));
        setCurrInd(j);
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
      setNumbers([...arr]);
      setInd((prev: any) => prev + 1);
    }
    setLoaded(false);
  };

  const bubbleSort = async (directionSort: string) => {
    setLoaded(true);
    const arr: number[] = [...numbers];

    for (let j = arr.length - 1; j >= -1; j--) {
      setLastInd(j);

      for (let i = 0; i < j; i++) {
        await new Promise<void>((resolve) => setTimeout(resolve, 500));

        setInd(i);
        setCurrInd(i + 1);

        if (directionSort === "up") {
          if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          }
        } else {
          if (arr[i] < arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          }
        }
        setNumbers([...arr]);
      }

      setCurrInd(undefined);
      setInd(undefined);
    }
    setLoaded(false);
  };

  const changeColumnSelect = (
    index: number,
    ind: any,
    currInd: number | undefined
  ) => {
    if (index === ind || index === currInd) {
      return ElementStates.Changing;
    } else if (index < ind) {
      return ElementStates.Modified;
    }
    return ElementStates.Default;
  };

  const changeColumnBubble = (
    index: number,
    ind: number | undefined,
    currInd: number | undefined,
    lastInd: any
  ) => {
    if (index === ind || index === currInd) {
      return ElementStates.Changing;
    } else if (index > lastInd) {
      return ElementStates.Modified;
    }
    return ElementStates.Default;
  };

  const disableButton = numbers.length ? false : true;

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.container}>
        <RadioInput
          label={"Выбор"}
          extraClass={styles.radio}
          name={"sort"}
          defaultChecked={true}
          value={radioValue}
          onClick={() => setRadio("selection")}
          disabled={isLoaded}
        />
        <RadioInput
          label={"Пузырёк"}
          name={"sort"}
          value={radioValue}
          onClick={() => setRadio("bubble")}
          disabled={isLoaded}
        />
        <Button
          text={"По возрастанию"}
          disabled={disableButton}
          onClick={() =>
            radioValue === "selection" ? selectionSort("up") : bubbleSort("up")
          }
          isLoader={isLoaded}
          extraClass={`${styles.button__sort} ${styles.button}`}
          sorting={Direction.Ascending}
        />
        <Button
          text={"По убыванию"}
          disabled={disableButton}
          isLoader={isLoaded}
          onClick={() =>
            radioValue === "selection"
              ? selectionSort("down")
              : bubbleSort("down")
          }
          extraClass={styles.button}
          sorting={Direction.Descending}
        />
        <Button
          text={"Новый массив"}
          isLoader={isLoaded}
          onClick={randomArr}
          extraClass={`${styles.button__array} ${styles.button}`}
        />
      </form>
      <div className={styles.box}>
        {numbers.map((item: number, index: number) => (
          <Column
            index={item}
            key={index}
            state={
              radioValue === "selection"
                ? changeColumnSelect(index, ind, currInd)
                : changeColumnBubble(index, ind, currInd, lastInd)
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
