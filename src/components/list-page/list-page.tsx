import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { list } from "./LinkedList";
import useForm from "../../hooks/use-form";
import styles from "./list-page.module.css";
import image from "../../images/ChevronRight.svg";

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ node: "", index: "" });
  const [strArr, setStrArr] = useState<string[]>([]);
  const [state, setState] = useState(ElementStates.Default);
  const [isLoaded, setLoaded] = useState({
    buttonA: false,
    buttonB: false,
    buttonC: false,
    buttonD: false,
    buttonE: false,
    buttonF: false,
  });
  const [node, setNode] = useState<{
    value: string;
    index: number | null;
    head: boolean;
  }>({
    value: "",
    index: null,
    head: true,
  });

  useEffect(() => {
    setStrArr([...list.getArrayValues()]);
    return () => {
      setStrArr(["0", "34", "8", "1"]);
    };
  }, []);

  const handleClickPrepend = async () => {
    setLoaded({ ...isLoaded, buttonA: true });
    list.prepend(values.node);
    setNode({ value: values.node, index: 0, head: true });
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setStrArr([...list.getArrayValues()]);
    setNode({ value: "", index: 0, head: true });
    setValues({ node: "", index: "" });
    await changeState();
    setLoaded({ ...isLoaded, buttonA: false });
  };

  const handleClickAppend = async () => {
    setLoaded({ ...isLoaded, buttonB: true });
    list.append(values.node);
    setNode({ value: values.node, index: list.size - 2, head: true });
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setStrArr([...list.getArrayValues()]);
    setNode({ value: "", index: list.size - 1, head: true });
    setValues({ node: "", index: "" });
    await changeState();
    setLoaded({ ...isLoaded, buttonB: false });
  };

  const handleClickDeleteHead = async () => {
    setLoaded({ ...isLoaded, buttonC: true });
    list.deleteHead();
    setNode({ value: "", index: 0, head: false });
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setStrArr([...list.getArrayValues()]);
    setNode({ value: "", index: null, head: false });
    setValues({ node: "", index: "" });
    setLoaded({ ...isLoaded, buttonC: false });
  };

  const handleClickDeleteTail = async () => {
    setLoaded({ ...isLoaded, buttonD: true });
    list.deleteTail();
    setNode({ value: "", index: list.size, head: false });
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setStrArr([...list.getArrayValues()]);
    setNode({ value: "", index: null, head: false });
    setValues({ node: "", index: "" });
    setLoaded({ ...isLoaded, buttonD: false });
  };

  const handleClickInsert = async () => {
    setLoaded({ ...isLoaded, buttonE: true });
    const index = Number(values.index);
    if (index < 0 || index > list.size) {
      setLoaded({ ...isLoaded, buttonE: false });
      return;
    }
    list.insertAt(values.node, index);
    for (let i = 0; i <= index; i++) {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      setNode({ value: values.node, index: i, head: true });
      setState(ElementStates.Changing);
    }
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setStrArr([...list.getArrayValues()]);
    setNode({ value: "", index: index, head: true });
    setValues({ node: "", index: "" });
    await changeState();
    setLoaded({ ...isLoaded, buttonE: false });
  };

  const handleClickDelete = async () => {
    setLoaded({ ...isLoaded, buttonF: true });

    const index = Number(values.index);
    if (index < 0 || index > list.size) {
      setLoaded({ ...isLoaded, buttonE: false });
      return;
    }
    list.deleteAt(index);
    for (let i = 0; i <= index; i++) {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      setNode({ value: values.index, index: i, head: false });
      setState(ElementStates.Changing);
    }
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setNode({ value: "", index: index, head: false });
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setStrArr([...list.getArrayValues()]);
    setNode({ value: "", index: null, head: true });
    setValues({ node: "", index: "" });
    await changeState();
    setLoaded({ ...isLoaded, buttonF: false });
  };

  const disableInput =
    isLoaded.buttonA ||
    isLoaded.buttonB ||
    isLoaded.buttonC ||
    isLoaded.buttonD ||
    isLoaded.buttonE ||
    isLoaded.buttonF;

  const disableButton = values.node && !disableInput ? false : true;
  const disableButtonDel = !disableInput ? false : true;
  const disableButtonIndex =
    values.node && (values.index && Number(values.index) >= 0 && Number(values.index) < strArr.length) && !disableInput ? false : true;
  const disableButtonIndexDel = (values.index && Number(values.index) >= 0 && Number(values.index) < strArr.length) && !disableInput ? false : true;

  const changeState = async () => {
    setState(ElementStates.Modified);
    await new Promise<void>((resolve) => setTimeout(resolve, 500));
    setState(ElementStates.Default);
  };

  return (
    <SolutionLayout title=" Связный список">
      <div className={styles.container}>
        <Input
          maxLength={4}
          isLimitText={true}
          extraClass={styles.input}
          onChange={handleChange}
          value={values.node}
          placeholder={"Введите значение"}
          name={"node"}
          disabled={disableInput}
        />
        <Button
          text={"Добавить в head"}
          disabled={disableButton}
          extraClass={styles.button}
          type={"submit"}
          onClick={handleClickPrepend}
          isLoader={isLoaded.buttonA}
        />
        <Button
          text={"Добавить в tail"}
          disabled={disableButton}
          extraClass={styles.button}
          onClick={handleClickAppend}
          isLoader={isLoaded.buttonB}
          data-testid={"addToTail"}
        />
        <Button
          text={"Удалить из head"}
          disabled={disableButtonDel}
          extraClass={styles.button}
          onClick={handleClickDeleteHead}
          isLoader={isLoaded.buttonC}
          data-testid={"deleteFromHead"}
        />
        <Button
          text={"Удалить из tail"}
          extraClass={styles.button}
          disabled={disableButtonDel}
          onClick={handleClickDeleteTail}
          isLoader={isLoaded.buttonD}
          data-testid={"deleteFromTail"}

        />
      </div>
      <div className={styles.container}>
        <Input
          type={"number"}
          extraClass={styles.input}
          onChange={handleChange}
          value={values.index}
          placeholder={"Введите индекс"}
          name={"index"}
          disabled={disableInput}
        />
        <Button
          text={"Добавить по индексу"}
          disabled={disableButtonIndex}
          extraClass={styles.button__index}
          onClick={handleClickInsert}
          isLoader={isLoaded.buttonE}
          data-testid={"addByIndex"}
        />
        <Button
          text={"Удалить по индексу"}
          disabled={disableButtonIndexDel}
          extraClass={styles.button__index}
          onClick={handleClickDelete}
          isLoader={isLoaded.buttonF}
          data-testid={"deleteByIndex"}

        />
      </div>
      <div className={styles.box}>
        {strArr.map((letter, index, arr) => (
          <div key={index} className={styles.circle}>
            <Circle
              letter={letter}
              extraClass={styles.circle}
              index={index}
              head={
                node.head && node.value && index === node.index ? (
                  <Circle
                    letter={node.value}
                    isSmall={true}
                    state={ElementStates.Changing}
                  />
                ) : index === 0 ? (
                  "head"
                ) : null
              }
              tail={
                !node.head && !node.value && index === node.index ? (
                  <Circle
                    letter={letter}
                    isSmall={true}
                    state={ElementStates.Changing}
                  />
                ) : index === strArr.length - 1 ? (
                  "tail"
                ) : null
              }
              state={index === node.index ? state : ElementStates.Default}
            />
            <div className={styles.image}>
              <img src={image} alt="" />
            </div>
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
