import React from "react";

export default function TeamTransfers({ summerTransfers = [] }) {
  if (!summerTransfers.length) {
    return <p className="text-slate-600">No transfer activity in the selected window.</p>;
  }

  const badge = (dir) =>
    dir === "IN"
      ? "bg-green-100 text-green-700"
      : dir === "OUT"
      ? "bg-rose-100 text-rose-700"
      : "bg-slate-100 text-slate-700";

  // helper to display a friendly fee
  const prettyFee = (t) => {
    // If the API returned something (string or number), show it as-is.
    if (t.fee !== null && t.fee !== undefined && String(t.fee).trim() !== "") {
      return String(t.fee);
    }
    // Otherwise fall back:
    if (t.type && /loan|free/i.test(t.type)) return "N/A";
    return "Undisclosed";
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {summerTransfers.map((t, idx) => (
        <div key={idx} className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{t.player}</div>
            <span className={`text-xs px-2 py-1 rounded ${badge(t.direction)}`}>
              {t.direction || "—"}
            </span>
          </div>

          <div className="text-sm text-slate-600 mt-1">
            <span className="font-medium">{t.from || "—"}</span>
            <span className="mx-1">→</span>
            <span className="font-medium">{t.to || "—"}</span>
          </div>

          <div className="mt-2 text-xs text-slate-500">
            <div><strong>Date:</strong> {t.date ? new Date(t.date).toLocaleDateString() : "TBD"}</div>
            <div><strong>Type:</strong> {t.type || "N/A"}</div>
            <div><strong>Fee:</strong> {prettyFee(t)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}