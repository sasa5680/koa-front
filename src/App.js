import './App.css';

import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { AccountProvider } from "./context/AccountContext";


import MainView from "./components/MainView";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <AccountProvider>
        <Header></Header>
        <MainView></MainView>
        <Footer></Footer>
      </AccountProvider>
    </BrowserRouter>
  );
}

export default App;
