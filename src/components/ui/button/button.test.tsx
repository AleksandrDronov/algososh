import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Кнопка рендерится без ошибок", () => {
  it("Кнопка c текстом", () => {
    const button = renderer.create(<Button text="Кнопка" />);

    expect(button).toMatchSnapshot();
  });
  it("Кнопка без текста", () => {
    const button = renderer.create(<Button />);

    expect(button).toMatchSnapshot();
  });
  it("Кнопка заблокирована", () => {
    const button = renderer.create(<Button disabled={true} />);

    expect(button).toMatchSnapshot();
  });
  it("Кнопка с индикацией загрузки", () => {
    const button = renderer.create(<Button isLoader={true} />);

    expect(button).toMatchSnapshot();
  });
  it("Колбек кнопки", () => {
    window.alert = jest.fn();
    const onClick = () => alert("Кнопка нажата");
    render(<Button onClick={onClick} text={"Кнопка"}/>);
    const link = screen.getByText("Кнопка");
    fireEvent.click(link);
    expect(window.alert).toHaveBeenCalledWith("Кнопка нажата");
  });
});
