import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const accountBalnce = useSelector((store) => store.account.balance);
  // return <div className="balance">{formatCurrency(123456)}</div>;
  return <div className="balance">{formatCurrency(accountBalnce)}</div>;
}

export default BalanceDisplay;
