import "./App.css";

import Filp from "./components/Filp";
import { Ds } from "./components/DownShift";
import SelectPlacement from "./components/SelectPlacement";

function App() {
  return (
    <div className=" min-w-screen h-full min-h-screen bg-slate-500 flex flex-col">
      <div className="flex justify-center mt-12">
        {/* react-select */}
        <SelectPlacement />

        {/* DownShift js */}
        <Ds />
      </div>

      <Filp />
    </div>
  );
}

export default App;
