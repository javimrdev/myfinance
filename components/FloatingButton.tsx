"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface StockData {
  shortName: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  symbol: string;
}

export default function FloatingButton() {
  const [showModal, setShowModal] = useState(false);
  const [companyTicker, setCompanyTicker] = useState("");

  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<StockData | null>(null);

  const handleSearch = async () => {
    if (!companyTicker) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/company?symbol=${companyTicker}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const parsedResponse = await response.json();

      if (response.ok) {
        setSearchResult(parsedResponse.data);
      } else {
        alert(parsedResponse.error || "Error al buscar la empresa");
      }
    } catch (error) {
      alert("Error al realizar la búsqueda");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="flex flex-col gap-2 p-8 bg-white rounded">
            <h2>Buscar empresa</h2>
            <Input
              type="text"
              placeholder="Email"
              onChange={(e) => setCompanyTicker(e.target.value.toUpperCase())}
            />
            <Button onClick={handleSearch}>Search</Button>
            {searchResult && (
              <div className="mt-5">
                <h3>{searchResult.shortName}</h3>
                <p>Precio: ${searchResult.regularMarketPrice}</p>
                <p>
                  Cambio: {searchResult.regularMarketChangePercent?.toFixed(2)}%
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-5 right-5 w-[60px] h-[60px] rounded-full bg-blue-500 text-white text-3xl cursor-pointer border-none hover:bg-blue-600 transition-colors"
      >
        +
      </button>
    </>
  );
}
