import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Input, Button, Row, Col } from 'antd';
// import {
//   ComboBox,
//   SelectableOptionMenuItemType,
//   TextField
// } from 'office-ui-fabric-react';
// import useForm from './hooks/useForm';

function App() {
  const size = 'large';

  return (
    <>
      Hello React!!
      <Row>
        <Col style={{ background: 'black' }} span={12}>
          Col1
        </Col>
        <Col span={12}>
          <Input type="text" />
        </Col>
      </Row>
      <Button type="primary">click me</Button>
    </>
  );
}

export default hot(App);
