import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Standings from "./pages/Standings";
import Fixtures from "./pages/Fixtures";
import Teams from "./pages/Teams";
import TeamDetails from "./components/TeamDetails";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      {/* slate (not sleet) background; Inter is global from index.css */}
      <main className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<TeamDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;