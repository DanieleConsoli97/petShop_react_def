
import Home from "./pages/Home";
import { GlobalProvider } from "./context/GlobalContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;