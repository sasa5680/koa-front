import React, { useReducer, createContext, useContext, useEffect } from "react";

const initialState = {
    isOpen: false
};

const LoginModalStateContext = createContext();
const LoginModalDispatchContext = createContext();

function AccountReducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return {
        isOpen: true,
      };

    case "CLOSE":
      return {
        isOpen: false,
      };

    default:
      throw new Error(`Unhandled action type: $`);
  }
}

export function LoginModalProvider({ children }) {

    const [state, dispatch] = useReducer(AccountReducer, initialState);

      return (
        <LoginModalStateContext.Provider value={state}>
          <LoginModalDispatchContext.Provider value={dispatch}>
            {children}
          </LoginModalDispatchContext.Provider>
        </LoginModalStateContext.Provider>
      );
}

export function useLoginModalState() {
  return useContext(LoginModalStateContext);
}

export function useLoginModalDispatch() {
  return useContext(LoginModalDispatchContext);
}

