import React, {useState} from "react";
import SearchTable from "./components/dataTable/SearchTable";
import dataDump from "./assets/dataDump";
import Navbar from "./components/ui/Navbar";


function App() {

  const [openNav, setOpenNav] = useState(false);

  const filterOptions = [
    {filterName: "name", filterType: "textBox", scale: "medium"},
    {filterName: "spellType", filterType: "select", extension: "value", scale: "medium"},
    {filterName: "level", filterType: "select", extension: "value", scale: "small"},
    {filterName: "school", filterType: "select", extension: "value", scale: "large"},
    {filterName: "source", filterType: "select", extension: "value", scale: "xLarge"}
  ];

  const modalFields = [
    {objectField: "name", displayAs: "h2", modalSection: "head"},
    {objectField: "description", displayAs: "p", extension: "value", modalSection: "body"},
  ];

  const apiInfo = {
    local: false,
    api: {
      //url: "https://api.pathfinder2.fr/v1/pf2/spell",
      requestConfig: {
        method: "GET",
        headers: {
          //Authorization: 
        }
      }

    },
    pathToData: ["results"]
  };

  const localData = {
    local: true, data: dataDump, pathToData:["results"]
  };

  //Logic for navbar to expand and contract, mouse over logic overridden if expand clicked
  function expandNav(event) {
    if (event._reactName === "onMouseEnter" && openNav === false)
      setOpenNav("mouse");
    else if(event._reactName === "onMouseLeave" && openNav === "mouse")
      setOpenNav(false);
    else if (event._reactName === "onClick")
      setOpenNav(navState => !navState)
  }

  return (
    <div className="App">
      <Navbar handleClick={expandNav} mouseOn={expandNav} mouseOff={expandNav} navState={openNav} />
      <SearchTable id={{fieldName: "_id", extension: false}} filters={filterOptions} dataSource={localData} modalFields={modalFields} />
    </div>
  )
}

export default App
