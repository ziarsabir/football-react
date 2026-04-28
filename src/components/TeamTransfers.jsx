// TeamTransfers.jsx
import React from "react";

export default function TeamTransfers({ summerTransfers = [] }) {
  const start = new Date("2025-06-16").getTime();
  const end = new Date("2026-01-25").getTime();

  const filteredTransfers = summerTransfers.filter((t) => {
    const time = new Date(t.transferDate).getTime();
    return !Number.isNaN(time) && time >= start && time <= end;
  });

  if (!filteredTransfers.length) {
    return (
      <p className="text-slate-600">
        No transfer activity in the selected window.
      </p>
    );
  }

  const badgeClass = (dir) => {
    if (dir === "IN") return "bg-emerald-100 text-emerald-700";
    if (dir === "OUT") return "bg-red-100 text-red-700";
    return "bg-slate-100 text-slate-700";
  };

  const prettyFee = (fee, type) => {
    if (fee !== null && fee !== undefined && String(fee).trim() !== "") {
      return String(fee);
    }

    if (type && /loan|free/i.test(type)) return "N/A";

    return "Undisclosed";
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredTransfers.map((t) => (
        <div
          key={t.id}
          className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="h4 leading-snug">{t.playerName || "Unknown player"}</div>

            <span
              className={`text-[11px] sm:text-xs px-2 py-1 rounded ${badgeClass(
                t.direction
              )}`}
            >
              {t.direction || "—"}
            </span>
          </div>

          <div className="text-sm text-slate-700 mt-1">
            <span className="font-medium">{t.fromTeamName || "—"}</span>
            <span className="mx-1">→</span>
            <span className="font-medium">{t.toTeamName || "—"}</span>
          </div>

          <div className="mt-2 text-[11px] sm:text-xs text-slate-500 space-y-1">
            <div>
              <strong>Date:</strong>{" "}
              {t.transferDate
                ? new Date(t.transferDate).toLocaleDateString()
                : "TBD"}
            </div>

            <div>
              <strong>Type:</strong> {t.transferType || "N/A"}
            </div>

            <div>
              <strong>Fee:</strong> {prettyFee(t.transferFee, t.transferType)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}