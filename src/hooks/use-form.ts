import { ChangeEvent, useState } from "react";

type TInputs = {
  [name: string]: string;
};

export default function useForm(inputValues: TInputs) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
