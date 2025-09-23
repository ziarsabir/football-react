export const filterSummerTransfersForTeam = (
    apiResponse,
    { start = "2025-06-16", end = "2025-09-04", teamName = "" } = {}
  ) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
  
    const inWindow = (iso) => {
      const t = new Date(iso).getTime();
      return !Number.isNaN(t) && t >= startTime && t <= endTime;
    };
  
    const rows = (apiResponse ?? []).flatMap(({ player, transfers }) => {
      if (!transfers || !Array.isArray(transfers)) return [];
  
      return transfers
        .filter((tr) => tr?.date && inWindow(tr.date))
        .map((tr) => {
          const fromTeam = tr?.teams?.out || {};
          const toTeam = tr?.teams?.in || {};
  
          // compute IN / OUT for the current team
          let direction = "";
          if (teamName) {
            const fromName = (fromTeam?.name ?? "").toLowerCase();
            const toName = (toTeam?.name ?? "").toLowerCase();
            const me = teamName.toLowerCase();
            if (toName === me) direction = "IN";
            else if (fromName === me) direction = "OUT";
          }
  
          // try to pick up a fee/amount if the API provides it
          const rawFee =
            tr?.fee ?? tr?.price ?? tr?.amount ?? null; // optional fields if present
  
          return {
            date: tr?.date ?? null,
            player: player?.name ?? "",
            type: tr?.type ?? "",            // Transfer / Loan / Free / …
            from: fromTeam?.name ?? null,
            to: toTeam?.name ?? null,
            direction,                       // IN | OUT | ""
            fee: rawFee,                     // string/number or null
          };
        });
    });
  
    rows.sort((a, b) => new Date(b.date) - new Date(a.date));
    return rows;
  };