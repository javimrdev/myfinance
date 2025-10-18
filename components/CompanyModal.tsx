"use client";

import React, { useState } from "react";
import FloatingButton from "./FloatingButton";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CompanyModal() {
  const [showModal, setShowModal] = useState(false);
  const [companyTicker, setCompanyTicker] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!companyTicker) return;
    
    setLoading(true);
    const response = await fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        ticker: companyTicker
      }),
    });

    const data = await response.json();
    setLoading(false);
    
    if (response.ok) {
      alert("Empresa guardada correctamente!");
      setCompanyTicker("");
      setShowModal(false);
    } else {
      alert(data.error || "Error al guardar la empresa");
    }
  };

  return (
    <>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ background: "#fff", padding: "20px", borderRadius: "5px" }}>
            <h2>Agregar empresa</h2>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Input
                type="text"
                placeholder="Símbolo del stock (ej: AAPL)"
                value={companyTicker}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyTicker(e.target.value.toUpperCase())}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && !loading && handleSave()}
                disabled={loading}
                className="w-[200px]"
              />
              <Button 
                onClick={handleSave}
                disabled={loading}
                className="ml-2"
              >
                {loading ? "Verificando..." : "Guardar"}
              </Button>
            </div>
          </div>
        </div>
      )}
      <FloatingButton />
    </>
  );
}