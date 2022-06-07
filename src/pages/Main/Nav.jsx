import React from "react";
import { Input, Select, Button} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styled from "styled-components";

const { Search } = Input;
const { Option } = Select;

const onSearch = (value) => console.log(value);

export default function Nav() {

    let fetch;


    return (
      <Body>
        <NewPost 
          type="primary" 
          icon={<PlusOutlined />} 
          shape="round"
          size="large"
          onClick={()=>{window.location.href="/newpost"}}
        >
          New Post
        </NewPost>
        <SearchSection>
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
    
    height: 65px;
    width: 100%;
    background-color: #161671;

    display: flex;
    align-items: center;
`

const NewPost = styled(Button)`
  cursor: pointer;
  margin-left: 40px;

`
const SearchSection = styled.div`
    
    margin-left: auto;
    margin-right: 30px;
    width: 50%;
    display: flex;
`

const StyledSearch = styled(Search)`
    
    width: 100%;
`