import Navbar from "@/components/layout/navbar";
import React from "react";

export default function Mainlayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
