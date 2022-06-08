import React, { useState, useCallback } from "react";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Spin } from "antd";
import { InputStyle } from "../../common/style";

import styled from "styled-components";

export default function CheckedInput({onCheck, name, rule, form}) {

  const [value, setValue] = useState("");
  const [state, setState] = useState({
    isChecked : false,
    isLoading : false,
    isFailed : false,
  })

  const onFormChange = (e) => {
    setValue(e.target.value);

    //값이 바뀌면 이전의 중복 확인이 무효화된다.
    setState({ ...state, isChecked: false });

  };

  /* 데이터 중복 확인 */
  const dupCheck = async () => {
    
    //이미 에러가 있으면 blur 상황에도 중복체크를 하지 않는다
    if (form.getFieldError(name).length >= 1) return;
    
    //데이터가 없으면 중복체크 하지 않는다.
    if (value.length <= 0) return;

    setState({ ...state, isLoading: true });
    //함수 호출
    try {
      const res = await onCheck(value);
      console.log(res.data);
      if(res.data.exists === false) {
        setState({ ...state, isChecked: true });

      } else {
        setState({ ...state, isLoading: false, isFailed: true });
        form.setFields([{ name: name, errors: ["이미 사용중입니다."] }]);
      }
      
    } catch (error) {
      setState({ ...state, isLoading: false, isFailed: true });
      form.setFields([{ name: name, errors: ["에러가 발생했습니다."] }]);
      
    }
  };

  const suffixFailed = (
    <CheckOutlined
      style={{
        fontSize: 20,
        color: "red",
        cursor: "pointer",
      }}
      onClick={dupCheck}
    />
  );

  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;
  const suffixLoading = <Spin indicator={antIcon} />;

  const suffixDone = (
    <CheckOutlined
      style={{
        fontSize: 20,
        color: "green",
      }}
    />
  );

  const Suffix = () => {

    if(state.isLoading) return suffixLoading;

    if(state.isChecked) return suffixDone;

    if(state.isFailed) return suffixFailed;

    return <></>;
  }

  return (
    <Form.Item name={name} rules={rule} hasFeedback>
      <StyledInput onChange={onFormChange} suffix={<Suffix/>} onBlur={dupCheck} />
    </Form.Item>
  );
}

const StyledInput = styled(Input)`
/*   ${InputStyle}
 */  overflow: hidden;
`;