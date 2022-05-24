import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import "./App.css";
import Select from "react-select";
import { Placement } from "@popperjs/core";
import Filp from "./components/Filp";
import { Ds } from "./components/Ds";
import SelectPlacement from "./components/SelectPlacement";

function App() {
  return (
    <div className=" min-w-screen h-full min-h-screen bg-slate-500 flex flex-col">

      <div className="flex justify-center mt-12">
        <SelectPlacement />
        <Ds />
      </div>

      <Filp />
    </div>
  );
}

export default App;
