import React from 'react'
import Login from './components/Login'
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { APIContextProvider } from "./context/Context";
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <APIContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={localStorage.getItem("email") ? (<Dashboard />) : (<Navigate replace to={"/"} />)} path="/Dashboard"/>
        </Routes>
      </APIContextProvider>
    </BrowserRouter>
  </>
  )
}

export default App
