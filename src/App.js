import "./index.css";
import React, { useState, useEffect, Redirect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";
import PageNotFound from "./components/PageNotFound";
import { FaMoon } from "react-icons/fa6";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let savedMode = localStorage.getItem("darkMode");
    if (!savedMode) {
      savedMode = "light";
      setDarkMode(false);
      localStorage.setItem("darkMode", savedMode);
    }
    setDarkMode(savedMode === "dark" ? true : false);
  }, []);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }
  return (
    <>
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className="flex justify-around items-center h-24   bg-lightgrey dark:bg-verydarkblue">
          <h1 className="font-bold font-800 dark:text-white text-xl">
            Where in the world?
          </h1>
          <div
            onClick={() => {
              toggleDarkMode();
            }}
            className="flex cursor-pointer justify-center items-center"
          >
            <span className="inline  dark:text-white">
              {" "}
              <FaMoon />{" "}
            </span>
            <span className="inline dark:text-white px-3"> Dark Mode</span>
          </div>
        </div>
        <div className="bg-lightgrey dark:bg-verydarkbluetext">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Countries />}></Route>
              <Route path="/:name" element={<CountryDetails />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
