import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { stringReverse } from "./utils";
import styles from "./string.module.css";
import useForm from "../../hooks/use-form";

export const StringComponent: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: "" });
  const [string, setString] = useState<string[]>([]);
  const [startEnd, setStartEnd] = useState<number[]>([]);
  const [isLoaded, setLoaded] = useState(false);


  const handleClick = async(e: FormEvent<HTMLFormElement>) => {
    setLoaded(true);
    e.preventDefault();
    await stringReverse(values.value, 1000, setString, setStartEnd);
    setValues({ value: "" });
    setLoaded(false);

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
      <form data-testid={'form'} className={styles.container} onSubmit={handleClick}>
        <Input
          maxLength={11}
          isLimitText={true}
          extraClass={styles.input}
          onChange={handleChange}
          value={values.value}
          name={"value"}
          data-testid={'input'}
        />
        <Button
          text={"Развернуть"}
          disabled={values.value ? false : true}
          type="submit"
          isLoader={isLoaded}
          extraClass={styles.button}
        />
      </form>
      <div className={styles.box} data-testid={'letters'}>
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
