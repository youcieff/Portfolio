"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button className="button button-quiet no-print" type="button" onClick={() => window.print()}>
      <Printer size={16} aria-hidden="true" /> Download PDF / Print
    </button>
  );
}
