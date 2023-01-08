import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "src/types/element-states";

describe("Circle рендерится без ошибок", () => {
  it("без буквы", () => {
    const circle = renderer.create(<Circle />);
    expect(circle).toMatchSnapshot();
  });
  it("с буквами", () => {
    const circle = renderer.create(<Circle letter={"fcd"} />);
    expect(circle).toMatchSnapshot();
  });
  it("с head", () => {
    const circle = renderer.create(<Circle head={"head"} />);
    expect(circle).toMatchSnapshot();
  });
  it("с react-элементом в head", () => {
    const circle = renderer.create(<Circle head={<Circle/>} />);
    expect(circle).toMatchSnapshot();
  });
  it("с tail", () => {
    const circle = renderer.create(<Circle head={"tail"} />);
    expect(circle).toMatchSnapshot();
  });
  it("с react-элементом в tail", () => {
    const circle = renderer.create(<Circle tail={<Circle/>} />);
    expect(circle).toMatchSnapshot();
  });
  it("с index", () => {
    const circle = renderer.create(<Circle index={10} />);
    expect(circle).toMatchSnapshot();
  });
  it("с пропcом isSmall ===  true", () => {
    const circle = renderer.create(<Circle isSmall={true} />);
    expect(circle).toMatchSnapshot();
  });
  it("в состоянии default", () => {
    const circle = renderer.create(<Circle state={ElementStates.Default}/>);
    expect(circle).toMatchSnapshot();
  });
  it("в состоянии changing", () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing}/>);
    expect(circle).toMatchSnapshot();
  });
  it("в состоянии modified", () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified}/>);
    expect(circle).toMatchSnapshot();
  });
});
