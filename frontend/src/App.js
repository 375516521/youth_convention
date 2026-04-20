import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RegisterYouth from "./pages/RegisterYouth";
import YouthList from "./pages/YouthList";

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: 10 }}>
          <Link to="/">Dashboard</Link> |{" "}
          <Link to="/register">Register Youth</Link> |{" "}
          <Link to="/youth">Youth List</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<RegisterYouth />} />
          <Route path="/youth" element={<YouthList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
