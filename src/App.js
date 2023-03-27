import { BrowserRouter, Route, Routes } from "react-router-dom";
import Vehcile from "./components/vehcile";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Vehcile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
