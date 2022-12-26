import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "../pages/Main/Main";
import PrivateRoute from "./PrivateRoute";
import SignUp from "../pages/SignUp/SignUp"
import NewPost from "../pages/NewPost/NewPost"
import Post from "../pages/Post/Post"
import About from "../pages/About";
import UserPage from "../pages/User/UserPage";
import styled from "styled-components";
import { useAccountState } from "../context/AccountContext";
import SignInPage from "../pages/SignInPage";

export default function MainView(){

    return (
      <Body>
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <PrivateRoute
            exact
            path="/newpost"
            component={NewPost}
          ></PrivateRoute>
          <Route exact path="/post/:id" component={Post}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/user/:username" component={UserPage}></Route>
          <Route exact path="/signin" component={SignInPage}></Route>
        </Switch>
      </Body>
    );
}

const Body = styled.div`
  background-color: #fcfcfc ;
`;
 