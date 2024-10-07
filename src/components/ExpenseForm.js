import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, updateExpense } from "../redux/slices/expensesSlice";
import "./ExpenseForm.css";
import Card from "./UI/Card";
import Modal from "./UI/Modal"; // Import the Modal component

// ExpenseForm component for adding and editing expenses
const ExpenseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);
  const expenseToEdit = useSelector((state) =>
    state.expenses.find((exp) => exp.id === id)
  );

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isEdit && !expenseToEdit) {
      navigate("/");
    }
  }, [isEdit, expenseToEdit, navigate]);

  const initialValues = isEdit
    ? {
        description: expenseToEdit.description,
        amount: expenseToEdit.amount,
        category: expenseToEdit.category,
        date: expenseToEdit.date.split("T")[0],
      }
    : {
        description: "",
        amount: "",
        category: "",
        date: "",
      };

  const validationSchema = Yup.object({
    description: Yup.string().required("Description is required."),
    amount: Yup.number()
      .typeError("Amount must be a number.")
      .positive("Amount must be positive.")
      .required("Amount is required."),
    category: Yup.string().required("Category is required."),
    date: Yup.date().required("Date is required."),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEdit) {
        await dispatch(
          updateExpense({ id, ...values, amount: Number(values.amount) })
        );
      } else {
        await dispatch(
          addExpense({ ...values, amount: Number(values.amount) })
        );
      }
      navigate("/");
    } catch (error) {
      setErrorMessage("Failed to save expense. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="new-expense">
      <motion.div
        key="ExpenseForm"
        initial={{ opacity: 0, transition: { duration: 1 } }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        <h2>{isEdit ? "Edit Expense" : "Add Expense"}</h2>

        {errorMessage && (
          <Modal onClose={() => setErrorMessage("")}>
            <h2>Error</h2>
            <p>{errorMessage}</p>
            <button onClick={() => setErrorMessage("")}>Close</button>
          </Modal>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ isSubmitting, errors, touched }) => (
            <Form noValidate>
              <div className="new-expense__controls">
                <div className="new-expense__control">
                  <label htmlFor="description">
                    Description<span aria-hidden="true">*</span>:
                  </label>
                  <Field
                    type="text"
                    id="description"
                    name="description"
                    className={
                      errors.description && touched.description
                        ? "input-error"
                        : ""
                    }
                    aria-required="true"
                  />
                  <ErrorMessage
                    name="description"
                    component="span"
                    className="error"
                  />
                </div>

                {/* Amount Field */}
                <div className="new-expense__control">
                  <label htmlFor="amount">
                    Amount ($)<span aria-hidden="true">*</span>:
                  </label>
                  <Field
                    type="number"
                    id="amount"
                    name="amount"
                    step="0.01"
                    className={
                      errors.amount && touched.amount ? "input-error" : ""
                    }
                    aria-required="true"
                  />
                  <ErrorMessage
                    name="amount"
                    component="span"
                    className="error"
                  />
                </div>

                {/* Category Field */}
                <div className="new-expense__control">
                  <label htmlFor="category">
                    Category<span aria-hidden="true">*</span>:
                  </label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className={
                      errors.category && touched.category ? "input-error" : ""
                    }
                    aria-required="true"
                  >
                    <option value="">--Select Category--</option>
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="span"
                    className="error"
                  />
                </div>

                {/* Date Field */}
                <div className="new-expense__control">
                  <label htmlFor="date">
                    Date<span aria-hidden="true">*</span>:
                  </label>
                  <Field
                    type="date"
                    id="date"
                    name="date"
                    className={errors.date && touched.date ? "input-error" : ""}
                    aria-required="true"
                  />
                  <ErrorMessage
                    name="date"
                    component="span"
                    className="error"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{
                  backgroundColor: "#b2c1e1",
                  color: "#19346b",
                  transition: { duration: 0.5 },
                }}
                type="submit"
                disabled={isSubmitting}
              >
                {isEdit ? "Update Expense" : "Add Expense"}
              </motion.button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </Card>
  );
};

export default ExpenseForm;
