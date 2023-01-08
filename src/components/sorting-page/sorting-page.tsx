import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { selectionSort, bubbleSort } from "./utils";
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

  useEffect(() => {
    randomArr()
  }, [])
  
  const handleselectionSort = async(directionSort: "up" | "down") => {
    setLoaded(true);
    await selectionSort(numbers, directionSort, 500, setInd, setCurrInd, setNumbers);
    setLoaded(false);
  };

  
  const handlebubbleSort = async (directionSort: "up" | "down") => {
    setLoaded(true);
    await bubbleSort(numbers, directionSort, 500, setInd, setCurrInd, setLastInd, setNumbers);
    setLoaded(false);
  };

  const changeColumnSelect = (
    index: number,
    ind: number | undefined,
    currInd: number | undefined
  ) => {
    if(ind !== undefined) {
      if (index === ind || index === currInd) {
        return ElementStates.Changing;
      } else if (index < ind) {
        return ElementStates.Modified;
      }
      return ElementStates.Default;
    }
      
  };

  const changeColumnBubble = (
    index: number,
    ind: number | undefined,
    currInd: number | undefined,
    lastInd: number | undefined
  ) => {
    if(lastInd) {
      if (index === ind || index === currInd) {
        return ElementStates.Changing;
      } else if (index > lastInd) {
        return ElementStates.Modified;
      }
      return ElementStates.Default;
    }
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
            radioValue === "selection" ? handleselectionSort("up") : handlebubbleSort("up")
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
              ? handleselectionSort("down")
              : handlebubbleSort("down")
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
