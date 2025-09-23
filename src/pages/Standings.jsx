import React from "react";
import StandingsTable from "../components/StandingsTable";

export default function Standings() {
  return (
    <div className="container mx-auto px-4 my-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Premier League Standings</h1>
      <div className="bg-white shadow-lg rounded-xl p-4">
        <StandingsTable />
      </div>
    </div>
  );
}