import React from "react";
import { Input, Row, Col, Select} from "antd";
import styled from "styled-components";

const { Search } = Input;
const { Option } = Select;

const onSearch = (value) => console.log(value);

export default function Nav() {

    return (
      <Body>
        <SearchSection>
          <Select defaultValue="Zhejiang">
            <Option value="Zhejiang">Zhejiang</Option>
            <Option value="Jiangsu">Jiangsu</Option>
          </Select>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </SearchSection>
      </Body>
    );
}

const Body = styled.div`
    
    height: 60px;
    width: 100%;
    background-color: azure;

    display: flex;
    align-items: center;
`

const SearchSection = styled.div`
    
    width: 80%;
    display: flex;
`

const StyledSearch = styled(Search)`
    
    width: 100%;
`