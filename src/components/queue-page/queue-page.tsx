import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { queue } from "./Queue";
import useForm from "../../hooks/use-form";
import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: "" });
  const [strArr, setStrArr] = useState<(string | null)[]>([]);
  const [state, setState] = useState(ElementStates.Default);
  const [action, setAction] = useState("");
  const [isLoaded, setLoaded] = useState({
    buttonA: false,
    buttonB: false,
    buttonC: false,
  });

  useEffect(() => {
    setStrArr([...queue.getElements()]);
    return () => {
      queue.delElements();
      setStrArr([...queue.getElements()]);
    };
  }, []);

  const handleClickPush = async (e: FormEvent<HTMLFormElement>) => {
    setLoaded({ ...isLoaded, buttonA: true });
    e.preventDefault();
    setAction("push");
    await changeState();
    queue.enqueue(values.value);
    setStrArr([...queue.getElements()]);
    setValues({ value: "" });
    setLoaded({ ...isLoaded, buttonA: false });
  };

  const handleClickPop = async () => {
    setLoaded({ ...isLoaded, buttonB: true });
    setAction("");
    await changeState();
    queue.dequeue();
    setStrArr([...queue.getElements()]);
    setLoaded({ ...isLoaded, buttonB: false });
  };

  const handleClickReset = () => {
    setLoaded({ ...isLoaded, buttonC: true });
    queue.delElements();
    setStrArr([...queue.getElements()]);
    setValues({ value: "" });
    setLoaded({ ...isLoaded, buttonC: false });
  };

  const loaded = isLoaded.buttonA || isLoaded.buttonB || isLoaded.buttonC;
  const disableButton = values.value && !loaded ? false : true;
  const disableButtonDel = strArr.find((item) => item !== undefined) && !loaded
    ? false
    : true;

  const changeState = async () => {
    setState(ElementStates.Changing);
    await new Promise<void>((resolve) => setTimeout(resolve, 500));
    setState(ElementStates.Default);
  };

  return (
    <SolutionLayout title="Очередь">
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
          isLoader={isLoaded.buttonA}
        />
        <Button
          text={"Удалить"}
          disabled={disableButtonDel}
          extraClass={styles.button}
          onClick={handleClickPop}
          isLoader={isLoaded.buttonB}
        />
        <Button
          text={"Очистить"}
          disabled={disableButtonDel}
          extraClass={`${styles.button} ${styles.button__reset}`}
          type={"reset"}
          isLoader={isLoaded.buttonC}
        />
      </form>
      <div className={styles.box}>
        {strArr.map((letter, index, arr) => (
          <Circle
            letter={letter}
            extraClass={styles.circle}
            key={index}
            index={index}
            head={index === queue.head && letter ? "head" : null}
            tail={index === queue.tail - 1 && letter ? "tail" : null}
            state={
              action === "push"
                ? index === queue.tail
                  ? state
                  : ElementStates.Default
                : index === queue.head
                ? state
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
