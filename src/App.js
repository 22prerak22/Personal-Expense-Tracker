import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Summary from "./components/Summary";
import { AnimatePresence } from "framer-motion";
import { MainNaviagation } from "./components/MainNaviagation";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <ExpenseList />,
    },
    { path: "add", element: <ExpenseForm /> },
    { path: "edit/:id", element: <ExpenseForm /> },
    { path: "summary", element: <Summary /> },
  ]);
  const location = useLocation();

  if (!element) return null;

  return (
    <>
      <MainNaviagation />
      <AnimatePresence mode="wait">
        {React.cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </>
  );
}

export default App;
