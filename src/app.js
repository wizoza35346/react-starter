import React, {
  useRef,
  useMemo,
  useEffect,
  useState,
  useCallback
} from 'react';
import { hot } from 'react-hot-loader/root';
import {
  ComboBox,
  SelectableOptionMenuItemType,
  TextField
} from 'office-ui-fabric-react';
import useForm from './hooks/useForm';

function App() {
  const [comboOptions] = useState([
    {
      key: 'Header1',
      text: 'First heading',
      itemType: SelectableOptionMenuItemType.Header
    },
    { key: 'A', text: 'Option A' },
    { key: 'B', text: 'Option B' },
    { key: 'C', text: 'Option C' },
    { key: 'D', text: 'Option D' },
    {
      key: 'divider',
      text: '-',
      itemType: SelectableOptionMenuItemType.Divider
    },
    {
      key: 'Header2',
      text: 'Second heading',
      itemType: SelectableOptionMenuItemType.Header
    },
    { key: 'E', text: 'Option E' },
    { key: 'F', text: 'Option F', disabled: true },
    { key: 'G', text: 'Option G' },
    { key: 'H', text: 'Option H' },
    { key: 'I', text: 'Option I' },
    { key: 'J', text: 'Option J' }
  ]);
  const { errors, fields, fieldInit, inputs } = useForm({});

  console.log(inputs);

  return (
    <>
      <div>
        <ComboBox
          label="Username"
          options={comboOptions}
          {...fieldInit('username', 'required', 'selectedKey')}
          errorMessage={errors.username && errors.username.msg}
        ></ComboBox>

        <select {...fieldInit('username', 'required')}>
          {comboOptions.map(option => (
            <option key={option.key} value={option.key}>
              {option.text}
            </option>
          ))}
        </select>

        <TextField
          label="Username"
          {...fieldInit('username1', 'required')}
          errorMessage={errors.username1 && errors.username1.msg}
        ></TextField>
        <input {...fieldInit('username1', 'required')} />
        {errors.username1 && <span>{errors.username1.msg}</span>}
      </div>
      <button type="submit">Submit</button>
    </>
  );
}

export default hot(App);
