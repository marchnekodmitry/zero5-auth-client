import React, {
  Dispatch,
  DispatchWithoutAction,
  ChangeEvent,
  SetStateAction,
} from 'react';

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type InitialValueType = {
  [prop: string]: string;
};

const useForm = <T extends InitialValueType>(
  initialValue: T | (() => T),
): [
    T,
    // eslint-disable-next-line function-paren-newline
    (prop: keyof T) => Dispatch<InputChangeEvent>,
    Dispatch<SetStateAction<T>>,
    DispatchWithoutAction
  ] => {
  const [value, setValue] = React.useState<T>(initialValue);

  const setValueProp = React.useCallback(
    (prop: keyof T) => (e: InputChangeEvent) => {
      e.persist();

      setValue((prev) => ({
        ...prev,
        [prop]: e.target.value,
      }));
    },
    [],
  );

  const clear = React.useCallback(() => setValue(initialValue), []);

  return [value, setValueProp, setValue, clear];
};

export default useForm;
