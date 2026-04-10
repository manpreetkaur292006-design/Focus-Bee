import React from "react";
import Header from "./Components/Header";
import Display from "./Components/Display";
import Buttons from "./Components/Buttons";
import "./App.css";

const App = () => {
  return (
    <>
      <main id="app">
        <section id="calculator">
          <Header />
          <Display />
          <Buttons />
        </section>
      </main>
    </>
  );
};

export default App;
