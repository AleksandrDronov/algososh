import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import useForm from "../../hooks/use-form";

export const FibonacciPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ number: "" });
  const [string, setString] = useState<number[]>([]);
  const [isLoaded, setLoaded] = useState(false);

  const fibIterative = async () => {
    const num: number = Number(values.number);
    const numArr: number[] = [];
    setLoaded(true);
    setString([]);

    for (let i = 0; i < num + 1; i++) {
      if (i === 0 || i === 1) {
        numArr.push(1);
      } else {
        numArr.push(numArr[i - 2] + numArr[i - 1]);
      }
      setString([...numArr]);
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
    }

    setLoaded(false);
  };

  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fibIterative();
    setValues({ number: "" });
  };

  const disableButton =
    (values.number ? false : true) ||
    (Number(values.number) > 19 || Number(values.number) < 1 ? true : false);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.container} onSubmit={handleClick}>
        <Input
          type={"number"}
          max={19}
          min={1}
          isLimitText={true}
          extraClass={styles.input}
          onChange={handleChange}
          value={values.number}
          placeholder={"Введите число"}
          name={"number"}
        />
        <Button
          text={"Рассчитать"}
          disabled={disableButton}
          type="submit"
          isLoader={isLoaded}
          extraClass={styles.button}
        />
      </form>
      <div className={styles.box}>
        {string.map((num, index) => (
          <Circle
            letter={num}
            index={index}
            extraClass={styles.circle}
            key={index}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
