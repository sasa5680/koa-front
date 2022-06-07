import './App.css';

import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { AccountProvider } from "./context/AccountContext";
import { LoginModalProvider } from './context/LoginModalContext';
import { Pipeline, Pipe } from "react-pipeline-component";


import MainView from "./components/MainView";
import Footer from "./components/Footer";

function App() {
  return (
    <Pipeline
      components={[
        <AccountProvider children={<Pipe />} />,
        <LoginModalProvider children={<Pipe />} />,
        <BrowserRouter>
          <AccountProvider>
            <Header></Header>
            <MainView></MainView>
            <Footer></Footer>
          </AccountProvider>
        </BrowserRouter>,
      ]}
    />
  );
}

export default App;
