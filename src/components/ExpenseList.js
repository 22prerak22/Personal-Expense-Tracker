import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense } from "../redux/slices/expensesSlice";
import { motion } from "framer-motion";
import Card from "./UI/Card";
import "./ExpenseList.css";

// Component for displaying the list of expenses
const ExpenseList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);

  // Function to handle deleting an expense
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      dispatch(deleteExpense(id));
    }
  };

  return (
    <Card>
      <motion.div
        key="ExpenseList"
        initial={{ opacity: 0, transition: { duration: 1 } }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        exit={{ opacity: 0, transition: { duration: 1 } }}
        className="expense-list"
      >
        <h2>All Expenses</h2>
        {expenses?.length === 0 ? (
          <p>No expenses recorded.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount ($)</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.description}</td>
                  <td>{exp.amount.toFixed(2)}</td>
                  <td>{exp.category}</td>
                  <td>{new Date(exp.date).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/edit/${exp.id}`}>
                      <motion.button
                        whileHover={{
                          backgroundColor: "#b2c1e1",
                          color: "#19346b",
                          transition: { duration: 0.5 },
                        }}
                      >
                        Edit
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{
                        backgroundColor: "#b2c1e1",
                        color: "#19346b",
                        transition: { duration: 0.5 },
                      }}
                      onClick={() => handleDelete(exp.id)}
                    >
                      Delete
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </Card>
  );
};

export default ExpenseList;
