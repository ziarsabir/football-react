import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTeamDetails, fetchTransfersByTeam } from "../api/footballApi";
import { filterSummerTransfersForTeam } from "../helper.js";
import TeamFixtures from "./TeamFixtures";
import TeamTransfers from "./TeamTransfers.jsx";

export default function TeamDetails() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [transfer, setTransfer] = useState(null);

  useEffect(() => {
  fetchTeamDetails(teamId).then((data) => {
    setTeam(data || null);
  });

  fetchTransfersByTeam(teamId).then((data) => {
    setTransfer(data.items || []);;
  });
}, [teamId]);

  const summerTransfers = transfer || [];
  
  if (!team) {
    return <p className="text-center text-slate-500 mt-10">Loading team details...</p>;
  }

  return (
    <div className="container mx-auto px-4 my-10">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8 text-center">
        <img src={team.teamLogo} alt={team.teamName} className="w-24 h-24 mx-auto mb-4" />
        <h2 className="text-3xl font-bold">{team.teamName}</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs uppercase text-slate-500">Country</div>
            <div className="font-medium">{team.country}</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs uppercase text-slate-500">Founded</div>
            <div className="font-medium">{team.founded}</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 sm:col-span-2">
            <div className="text-xs uppercase text-slate-500">Venue</div>
            <div className="font-medium">
              {team.venueName}, {team.venueCity}
            </div>
          </div>
        </div>
      </div>

      {/* Fixtures for this team */}
      <TeamFixtures />

     {/* Transfers */}
      <div className="mt-10">
        <h3 className="h2 mb-4">Transfers</h3>
        <TeamTransfers summerTransfers={summerTransfers} />
      </div>
    </div>
  );
}
