import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";


import Register from "./pages/register";
import { Navbar } from "./widgets/layout";
import routes from "./routes";
import Interest from "./pages/interest";
import ThankYou from "./pages/thankyou";
import Failure from "./pages/failure";

function App() {
  const { pathname } = useLocation();
  
  return (
    <>
      {!(pathname === '/sign-in' || pathname === '/sign-up') && (
        <Navbar routes={routes} />
      )}
      
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/interest" element={<Interest/>} />
        <Route path="/thankyou" element={<ThankYou/>} />
        <Route path="/failure" element={<Failure/>} />
      </Routes>
    </>
  );
}

export default App;