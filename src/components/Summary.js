import React from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import "chart.js/auto";
import Card from "./UI/Card";
import "./Summary.css";

const Summary = () => {
  const expenses = useSelector((state) => state.expenses);
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categories = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8A2BE2",
          "#00FA9A",
        ],
      },
    ],
  };

  return (
    <Card className="summary-container">
      <motion.div
        key="summary"
        initial={{ opacity: 0, transition: { duration: 1 } }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        <h2 className="summary-title">Summary</h2>
        <p className="summary-total">
          <strong>Total Expenses:</strong> ${total.toFixed(2)}
        </p>
        <h3 className="summary-category-title">Expenses by Category</h3>
        {expenses.length === 0 ? (
          <p className="summary-no-expenses">No expenses to summarize.</p>
        ) : (
          <div className="summary-chart">
            <Pie data={data} />
          </div>
        )}
      </motion.div>
    </Card>
  );
};

export default Summary;
