import React from "react";
import CompanyModal from "@/components/CompanyModal";
import { Title } from "./components/Title";
import { AddStockButton } from "./components/AddStockButton";

export default function Home() {
  return (
    <div className="w-full flex justify-between">
      <Title text="Welcome to MyFinance Dashboard" />
      <AddStockButton />
    </div>
  );
}
