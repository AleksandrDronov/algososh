import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import useForm from "../../hooks/use-form";
import styles from "./queue-page.module.css";

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  public head = 0;
  public tail = 0;
  private readonly size: number = 0;
  public length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail % this.size] = item;
    this.length++;
    this.tail++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    delete this.container[this.head % this.size];
    this.head++;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head];
  };

  isEmpty = () => this.length === 0;

  getElements = (): (T | null)[] => this.container;

  delElements = (): void => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };
}

const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: "" });
  const [strArr, setStrArr] = useState<(string | null)[]>([]);
  const [state, setState] = useState(ElementStates.Default);
  const [action, setAction] = useState("");

  useEffect(() => {
    setStrArr([...queue.getElements()]);
    return () => {
      queue.delElements();
      setStrArr([...queue.getElements()]);
    };
  }, []);

  const handleClickPush = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAction("push");
    await changeState();
    queue.enqueue(values.value);
    setStrArr([...queue.getElements()]);
    setValues({ value: "" });
  };

  const handleClickPop = async () => {
    setAction("");
    await changeState();
    queue.dequeue();
    setStrArr([...queue.getElements()]);
  };

  const handleClickReset = () => {
    queue.delElements();
    setStrArr([...queue.getElements()]);
    setValues({ value: "" });
  };

  const disableButton = values.value ? false : true;
  const disableButtonDel = strArr.find((item) => item !== undefined)
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
        />
        <Button
          text={"Удалить"}
          disabled={disableButtonDel}
          extraClass={styles.button}
          onClick={handleClickPop}
        />
        <Button
          text={"Очистить"}
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
