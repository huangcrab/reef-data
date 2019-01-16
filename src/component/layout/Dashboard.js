import React from "react";
import WaterTests from "../tests/WaterTests";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="row">
      <div className="col-md-10">
        <WaterTests />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  );
}
