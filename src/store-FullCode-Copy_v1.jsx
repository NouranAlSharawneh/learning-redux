import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
};

const customerReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "buy a lipstick" },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

// const ACCOUNT_DEPOSIT = "account/deposit";

// Action creators
const deposit = (amount) => {
  return { type: "account/deposit", payload: amount };
};

const withdraw = (amount) => {
  return { type: "account/withdraw", payload: amount };
};

const requestLoan = (amount, purpose) => {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
};

const payLoan = () => {
  return { type: "account/payLoan" };
};

store.dispatch(deposit(500));
store.dispatch(withdraw(300));
store.dispatch(requestLoan(1000, "Buy lipstick"));
store.dispatch(payLoan());

console.log(store.getState());

// Action creators
const createCustomer = (fullName, nationalID) => {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
};

const updateName = (fullName) => {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
};

store.dispatch(createCustomer("Nouran Sharawneh", "4526226"));
store.dispatch(updateName("Nouran Sharawneh"));
console.log(store.getState());
