import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { hot } from 'react-hot-loader/root';
import Hooks from './hooks-test';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import useForm from './hooks/useForm';

function App({ name }) {
  console.log('redering...');
  // const [state, setState] = useState([]);
  const { errors, fields, fieldInit } = useForm({});

  console.log(fields);

  return (
    <>
      <div>{name}</div>
      <Hooks
        label="Username"
        {...fieldInit('username1')}
        errorMessage={errors.username1 && errors.username1.msg}
      ></Hooks>
      <div>
        <TextField
          label="Username"
          {...fieldInit('username')}
          errorMessage={errors.username && errors.username.msg}
        ></TextField>
        <TextField
          label="Username"
          {...fieldInit('username1', 'required')}
          errorMessage={errors.username1 && errors.username1.msg}
        ></TextField>
        {/* <input
          name="username1"
          value={inputs['username1']}
          onChange={handleInputChange}
          onBlur={handleInputChange}
          ref={instance => register(instance)}
        /> */}
      </div>
      <button type="submit">Submit</button>
    </>
  );
}

export default hot(App);
