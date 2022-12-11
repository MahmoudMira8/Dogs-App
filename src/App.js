import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./components/Home";
import DogDetails from "./components/DogDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:name" element={<DogDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
