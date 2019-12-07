import { useState, useRef, useCallback, useEffect } from 'react';

function useForm(props) {
  const [inputs, setInputs] = useState(props);
  const [errors, setErrors] = useState({});
  const [rerender, _render] = useState({});
  const fields = useRef({});

  const render = () => _render({});

  useEffect(() => {
    for (const fieldName in fields.current) {
      if (!fields.current[fieldName].touched) break;

      const error = fields.current[fieldName].validate(inputs[fieldName]);
      if (error && !(fieldName in errors))
        setErrors(errors => ({
          ...errors,
          [fieldName]: {
            ...fields.current[fieldName],
            msg: error
          }
        }));
      else if (!error && fieldName in errors)
        setErrors(errors =>
          Object.keys(errors).reduce(
            (err, acc) =>
              acc === fieldName ? err : { ...err, [acc]: errors[acc] },
            {}
          )
        );
    }
  }, [rerender, inputs]);

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
  };
  const handleInputChange = useCallback(event => {
    // console.log(event.target);
    event.persist();
    const name = event.target.name;
    fields.current[name].touched = true;
    setInputs(inputs => ({
      ...inputs,
      [name]: event.target.value
    }));
  }, []);

  const register = (el, validation) => {
    if (!el) return;
    const name = getFieldName(el);
    if (!name) {
      console.warn('Missing name at', el);
      return;
    }
    if (name in fields.current) return;

    fields.current[name] = {
      name,
      touched: false,
      ref: el,
      validate:
        typeof validation === 'string'
          ? validationRules[validation]
          : typeof validation === 'function'
          ? validation
          : () => ''
    };
    setInputs(inputs => ({
      ...inputs,
      [name]: ''
    }));
  };

  const fieldInit = (name, validation) => ({
    name,
    value: inputs[name],
    ref: useCallback(instance => register(instance, validation), []),
    onChange: handleInputChange,
    onFocus: useCallback(() => (fields.current[name].touched = true), []),
    onBlur: useCallback(() => {
      if (fields.current[name].touched) render();
    }, [])
  });

  const getFieldName = el => {
    if (el.props) return el.props.name;
    return el.name;
  };

  return {
    fieldInit,
    register,
    handleInputChange,
    handleSubmit,
    inputs,
    errors,
    fields
  };
}
export const validationRules = {
  required: value => {
    const errorMessage = '此欄位不能為空值';
    if (!value) return errorMessage;
    if (typeof value === 'object')
      return value.length === 0 ? errorMessage : '';
    return value.trim().length === 0 ? errorMessage : '';
  },
  number: value => (isNaN(Number(value)) ? '此欄位只能輸入數字' : ''),
  max: number => value =>
    value.trim().length >= number
      ? `此欄位長度必須小於或等於${number}個字元`
      : '',
  min: number => value =>
    value.trim().length <= number
      ? `此欄位長度必須大於或等於${number}個字元`
      : ''
};

export default useForm;
