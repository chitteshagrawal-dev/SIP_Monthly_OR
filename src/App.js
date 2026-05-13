import { useState } from "react";
import SipMonthlyReport from "./sip_monthly_report";
import NullSessionDive from "./null_session_dive";
import FunnelPageDive from "./funnel_page_dive";

// ══════════════════════════════════════════════════════════════════════════════
// APP NAVIGATOR
// Routes between 3 pages using state (no router library needed):
//   "report"   → SIP Monthly Report (main dashboard)
//   "null"     → NULL Session Deep Dive
//   "funnel"   → Funnel Page Deep Dive (sip_returning / explore_causes)
// ══════════════════════════════════════════════════════════════════════════════
export default function App(){
  const [page, setPage] = useState("report");
  const [funnelInitialPage, setFunnelInitialPage] = useState("sip_returning");

  // Navigate from main report → NULL session dive
  const goToNullDive = () => setPage("null");
  // Navigate from NULL session dive → Funnel page deep dive
  const goToFunnelDive = (whichPage) => {
    setFunnelInitialPage(whichPage);
    setPage("funnel");
  };
  // Navigate back from NULL session dive → main report
  const backToReport = () => setPage("report");
  // Navigate back from funnel deep dive → NULL session dive
  const backToNullDive = () => setPage("null");

  if (page === "null") {
    return <NullSessionDive onBack={backToReport} onPageDeepDive={goToFunnelDive}/>;
  }
  if (page === "funnel") {
    return <FunnelPageDive onBack={backToNullDive} initialPage={funnelInitialPage}/>;
  }
  return <SipMonthlyReport onViewSessionJourneys={goToNullDive}/>;
}
