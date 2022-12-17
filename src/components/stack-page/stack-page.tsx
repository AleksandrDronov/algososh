import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { stack } from "./Stack";
import useForm from "../../hooks/use-form";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: "" });
  const [strArr, setStrArr] = useState<string[]>([]);
  const [state, setState] = useState(ElementStates.Default);
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    return () => {
      stack.delElements();
      setStrArr([]);
    };
  }, []);

  const handleClickPush = (e: FormEvent<HTMLFormElement>) => {
    setLoaded(true)
    e.preventDefault();
    stack.push(values.value);
    setStrArr([...stack.getElements()]);
    setValues({ value: "" });
    changeState();
    setLoaded(false)
  };

  const handleClickPop = async () => {
    await changeState();
    stack.pop();
    setStrArr([...stack.getElements()]);
  };

  const handleClickReset = () => {
    stack.delElements();
    setStrArr([...stack.getElements()]);
    setValues({ value: "" });
  };

  const disableButton = values.value ? false : true;
  const disableButtonDel = strArr.length ? false : true;

  const changeState = async () => {
    setState(ElementStates.Changing);
    await new Promise<void>((resolve) => setTimeout(resolve, 500));
    setState(ElementStates.Default);
  };

  return (
    <SolutionLayout title="Стек">
      <form
        className={styles.container}
        onSubmit={handleClickPush}
        onReset={handleClickReset}
      >
        <Input
          maxLength={4}
          isLimitText={true}
          extraClass={styles.input}
          onChange={handleChange}
          value={values.value}
          placeholder={"Введите значение"}
          name={"value"}
        />
        <Button
          text={"Добавить"}
          disabled={disableButton}
          extraClass={styles.button}
          type={"submit"}
          isLoader={isLoaded}
        />
        <Button
          text={"Удалить"}
          disabled={disableButtonDel}
          extraClass={styles.button}
          onClick={handleClickPop}
        />
        <Button
          text={"Очистить"}
          disabled={disableButtonDel}
          extraClass={`${styles.button} ${styles.button__reset}`}
          type={"reset"}
        />
      </form>
      <div className={styles.box}>
        {strArr.map((letter, index, arr) => (
          <Circle
            letter={letter}
            extraClass={styles.circle}
            key={index}
            index={index}
            head={index === arr.length - 1 ? "top" : null}
            state={index === arr.length - 1 ? state : ElementStates.Default}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
