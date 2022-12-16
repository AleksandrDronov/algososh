import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import styles from "./string.module.css";
import useForm from "../../hooks/use-form";

export const StringComponent: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: "" });
  const [string, setString] = useState<string[]>([]);
  const [startEnd, setStartEnd] = useState<number[]>([]);
  const [isLoaded, setLoaded] = useState(false);

  const stringReverse = async () => {
    const strArr: string[] = values.value.split("");
    setLoaded(true);
    setStartEnd([]);
    setString([...strArr]);

    await new Promise<void>((resolve) => setTimeout(resolve, 500));

    let startIndex = 0;
    let endIndex = strArr.length - 1;

    while (startIndex <= endIndex) {
      setStartEnd([startIndex, endIndex]);
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));

      [strArr[startIndex], strArr[endIndex]] = [
        strArr[endIndex],
        strArr[startIndex],
      ];

      startIndex++;
      endIndex--;
      setStartEnd([startIndex, endIndex]);
      setString([...strArr]);
    }

    setLoaded(false);
  };

  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    stringReverse();
    setValues({ value: "" });
  };

  const changeCircle = ([start, end]: number[], index: number) => {
    if (index < start || index > end) {
      return ElementStates.Modified;
    } else if (index === start || index === end) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.container} onSubmit={handleClick}>
        <Input
          maxLength={11}
          isLimitText={true}
          extraClass={styles.input}
          onChange={handleChange}
          value={values.value}
          name={"value"}
        />
        <Button
          text={"Развернуть"}
          disabled={values.value ? false : true}
          type="submit"
          isLoader={isLoaded}
          extraClass={styles.button}
        />
      </form>
      <div className={styles.box}>
        {string.map((letter, index) => (
          <Circle
            letter={letter}
            extraClass={styles.circle}
            key={index}
            state={changeCircle(startEnd, index)}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
