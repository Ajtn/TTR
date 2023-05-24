import React, {useState} from "react";
import SearchTable from "./components/dataTable/SearchTable";
import dataDump from "./assets/dataDump";
import Navbar from "./components/ui/Navbar";

/*
  Todo:
    -create .d.ts file and make consistent object types for filters and displayed data
    -
*/

function App() {

  const [openNav, setOpenNav] = useState({clickOpen: false, mouseOpen: false});

  const filterOptions = [
    {filterName: "name", filterType: "textBox", scale: "medium"},
    {filterName: "spellType", filterType: "select", extension: "value", scale: "medium"},
    {filterName: "level", filterType: "select", extension: "value", scale: "small"},
    {filterName: "school", filterType: "select", extension: "value", scale: "large"},
    {filterName: "source", filterType: "select", extension: "value", scale: "xLarge"}
  ];

  const modalFields = [
    {fieldName: "name", displayAs: "h2", modalSection: "head"},
    {fieldName: "description", displayAs: "p", extension: "value", modalSection: "body"},
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
  function expandNav(event: React.MouseEvent | React.KeyboardEvent): void {
    if (event.type === "click")
      setOpenNav(navState => ({...navState, clickOpen: !navState.clickOpen}));
    else
      setOpenNav(navState => ({...navState, mouseOpen: !navState.mouseOpen}));
  }

  return (
    <div className="App">
      <Navbar handleClick={(expandNav)} mouseOn={expandNav} mouseOff={expandNav} navState={openNav.mouseOpen || openNav.clickOpen} />
      <SearchTable id={{fieldName: "_id", extension: false}} filters={filterOptions} dataSource={localData} modalConfig={modalFields} />
    </div>
  )
}

export default App
