import React, { useReducer, createContext, useContext, useEffect } from "react";

const initialState = {
  Posts: [], //게시글 목록
  isLoading: false, //로딩중 여부
  page: 0, // 현재 페이지
  isLast: false, //마지막 페이지 여부
  isError: false, //에러 여부
  fetch: ()=>{}, //fetch 함수
};

const PostListStateContext = createContext();
const PostListDispatchContext = createContext();

function PostListReducer(state, action) {
  switch (action.type) {
    
    case "RESET": //페이지 상태 초기화
      return {
        Posts: [], //게시글 목록
        isLoading: false, //로딩중 여부
        page: 1, // 현재 페이지
        isLast: false, //마지막 페이지 여부
        isError: false, //에러 여부
      };

    case "FETCH": //새 포스트를 가져온다.
      
    return {
      ...state,
      Posts: state.Posts.concat(action.action.content),
      page: state.page + 1,
      isLast: action.action.last,
      isLoading: false,
      isError: false,
    };

    case "LOADING": //새 포스트를 가져온다.
      
      return {
        ...state,
        isLoading: true,
      };

    case "ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,  
      }

    case "NEW": // 새로운 검색 조건을 갖는 fetch
    console.log(action.action)
    return {
      Posts: [], //게시글 목록
      isLoading: false, //로딩중 여부
      page: 0, // 현재 페이지
      isLast: false, //마지막 페이지 여부
      isError: false, //에러 여부
      fetch: action.action,
    };

    default:
      throw new Error(`Unhandled action type: $`);
  }
}

export function PostListProvider({ children }) {
  const [state, dispatch] = useReducer(PostListReducer, initialState);

  return (
    <PostListStateContext.Provider value={state}>
      <PostListDispatchContext.Provider value={dispatch}>
        {children}
      </PostListDispatchContext.Provider>
    </PostListStateContext.Provider>
  );
}

export function usePostListState() {
  return useContext(PostListStateContext);
}

export function usePostListDispatch() {
  return useContext(PostListDispatchContext);
}

