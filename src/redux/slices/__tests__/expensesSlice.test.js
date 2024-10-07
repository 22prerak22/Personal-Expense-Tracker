// src/redux/slices/__tests__/expensesSlice.test.js
import expensesReducer, {
  addExpense,
  updateExpense,
  deleteExpense,
} from "../expensesSlice";

describe("expensesSlice", () => {
  const initialState = {
    expenses: [],
  };

  test("should handle initial state", () => {
    expect(expensesReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle addExpense", () => {
    const previousState = { expenses: [] };
    const action = addExpense({
      description: "Test Expense",
      amount: 100,
      category: "Food",
      date: "2024-01-01",
    });
    expect(expensesReducer(previousState, action)).toEqual({
      expenses: [
        {
          id: expect.any(String),
          description: "Test Expense",
          amount: 100,
          category: "Food",
          date: "2024-01-01",
        },
      ],
    });
  });

  test("should handle updateExpense", () => {
    const previousState = {
      expenses: [
        {
          id: "1",
          description: "Old Expense",
          amount: 50,
          category: "Transport",
          date: "2024-01-01",
        },
      ],
    };
    const action = updateExpense({
      id: "1",
      description: "Updated Expense",
      amount: 75,
      category: "Food",
      date: "2024-01-02",
    });
    expect(expensesReducer(previousState, action)).toEqual({
      expenses: [
        {
          id: "1",
          description: "Updated Expense",
          amount: 75,
          category: "Food",
          date: "2024-01-02",
        },
      ],
    });
  });

  test("should handle deleteExpense", () => {
    const previousState = {
      expenses: [
        {
          id: "1",
          description: "Test Expense",
          amount: 100,
          category: "Food",
          date: "2024-01-01",
        },
        {
          id: "2",
          description: "Another Expense",
          amount: 200,
          category: "Transport",
          date: "2024-01-02",
        },
      ],
    };
    const action = deleteExpense("1");
    expect(expensesReducer(previousState, action)).toEqual({
      expenses: [
        {
          id: "2",
          description: "Another Expense",
          amount: 200,
          category: "Transport",
          date: "2024-01-02",
        },
      ],
    });
  });
});
