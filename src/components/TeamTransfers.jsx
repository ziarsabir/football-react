// TeamTransfers.jsx
import React from "react";

export default function TeamTransfers({ summerTransfers = [] }) {
  if (!summerTransfers.length) {
    return <p className="text-slate-600">No transfer activity in the selected window.</p>;
  }

  const badgeClass = (dir) => {
    if (dir === "IN") return "bg-emerald-100 text-emerald-700";
    if (dir === "OUT") return "bg-red-100 text-red-700"; // swapped from rose → red
    return "bg-slate-100 text-slate-700";
  };

  // helper to display a friendly fee
  const prettyFee = (t) => {
    if (t.fee !== null && t.fee !== undefined && String(t.fee).trim() !== "") {
      return String(t.fee);
    }
    if (t.type && /loan|free/i.test(t.type)) return "N/A";
    return "Undisclosed";
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {summerTransfers.map((t, idx) => (
        <div
          key={idx}
          className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="h4 leading-snug">{t.player}</div>
            <span className={`text-[11px] sm:text-xs px-2 py-1 rounded ${badgeClass(t.direction)}`}>
              {t.direction || "—"}
            </span>
          </div>

          <div className="text-sm text-slate-700 mt-1">
            <span className="font-medium">{t.from || "—"}</span>
            <span className="mx-1">→</span>
            <span className="font-medium">{t.to || "—"}</span>
          </div>

          <div className="mt-2 text-[11px] sm:text-xs text-slate-500 space-y-1">
            <div><strong>Date:</strong> {t.date ? new Date(t.date).toLocaleDateString() : "TBD"}</div>
            <div><strong>Type:</strong> {t.type || "N/A"}</div>
            <div><strong>Fee:</strong> {prettyFee(t)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
