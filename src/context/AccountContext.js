import React, { useReducer, createContext, useContext, useEffect } from "react";
import { injectStore } from "../config/axios"
// 초깃값 (상태가 객체가 아니라 그냥 숫자여도 상관 없습니다.)
const initialState = {
  isLogin: false,
  isError: false,
  username: null,
  token: null,
  profile: null,
};

const AccountStateContext = createContext();
const AccountDispatchContext = createContext();

function AccountReducer(state, action) {
  
  switch (action.type) {

    case "SET" : 
    return {
      ...action.data
    }

    case "LOGIN":
      return {
        ...state,
        isLogin: true,
        token: action.data.token,
        username: action.data.username,
        thumbnail: action.data.thumbnail,
      };
      
    case "LOGOUT":
      //로컬 스토리지 내용을 삭제

      return {
        ...initialState,
      };

    default:
      throw new Error(`Unhandled action type: $`);
  }
}

export function AccountProvider({ children }) {
  
  const [state, dispatch] = useReducer(AccountReducer, initialState);
  
  //최초 로딩 시 로컬 스토리지의 데이터를 context에 복사
  useEffect(() => {
    dispatch({type: "SET", data: JSON.parse(window.localStorage.getItem("user"))});
  }, []);

  //state가 변하면 로컬 스토리지의 내용을 갱신
  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(state));
  }, [state]);  

  //axios에 store 주입
  injectStore(state);
  
  return (
    <AccountStateContext.Provider value={state}>
      <AccountDispatchContext.Provider value={dispatch}>
        {children}
      </AccountDispatchContext.Provider>
    </AccountStateContext.Provider>
  );
}

export function useAccountState() {
  return useContext(AccountStateContext);
}

export function useAccountDispatch() {
  return useContext(AccountDispatchContext);
}
