import { AddStockButton } from "../features/symbol/components/AddStockButton";

export default function Home() {
  return (
    <div className="w-full flex justify-between">
      <h1 className="text-3xl font-bold">Welcome to MyFinance Dashboard</h1>;
      <AddStockButton />
    </div>
  );
}
