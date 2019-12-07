import React, { memo, useEffect } from 'react';
const useHooks = props => {
  // useEffect(() => {
  //   console.log(name);
  // }, []);
  console.log('render');
  return <div>Hi {props.value}</div>;
};

export default memo(useHooks);
