import React, {useState} from "react";
import SearchTable, {searchTableProps} from "./components/dataTable/SearchTable";
import dataDump from "./assets/dataDump";
import Navbar from "./components/ui/Navbar";
import { filter, modalField } from "./components/dataTable/SearchTable.types";
import eldenItemsTest from "./assets/eldenItemsTest";


function App() {

  const [openNav, setOpenNav] = useState({clickOpen: false, mouseOpen: false}),
  [currentApp, setCurrentApp] = useState(1);



  //filter settings for pathfinder spell API
  const pfSpellFilters: filter[] = [
    {filterName: "name", inputType: "textbox", scale: "medium"},
    {filterName: "spellType", inputType: "select", extension: "value", scale: "medium"},
    {filterName: "level", inputType: "select", varType: "number", extension: "value", scale: "small"},
    {filterName: "school", inputType: "select", extension: "value", scale: "large"},
    {filterName: "source", inputType: "select", extension: "value", scale: "xLarge"}
  ];

  const pfSpellModal: modalField[] = [
    {fieldName: "name", displayAs: "h2", modalSection: "head"},
    {fieldName: "description", displayAs: "p", extension: "value", modalSection: "body"},
  ];

  const pfApiInfo = {
    local: false,
    api: {
      //baseUrl: "https://api.pathfinder2.fr/v1/pf2/spell",
      requestConfig: {
        method: "GET",
        headers: {
          //Authorization: 
        }
      }

    },
    pathToData: ["results"]
  };

  const pfLocalData = {
    local: true, data: dataDump, pathToData:["results"]
  };

  const eldenItemsFilters: filter[] = [
    {filterName: "name", inputType: "textbox", scale: "medium"},
    {filterName: "type", inputType: "select", scale: "medium"},
    {filterName: "effect", inputType: "textbox", scale: "xLarge"},

  ];

  const eldenItemsModal: modalField[] = [
    {fieldName: "name", displayAs: "h2", modalSection: "head"},
    {fieldName: "description", displayAs: "p", modalSection: "body"},
  ];

  const eldenItemsApi = {
    local: false,
    api: {
      baseUrl: "https://eldenring.fanapis.com/api/items",
      requestConfig: {
        method: "GET"
      }
    },
    pathToData: ["data"]
  }

  const eRLocalData = {
    local: true, data: eldenItemsTest, pathToData:["data"]
  };

  const allTableConfig = [
    {id: {fieldName: "_id"}, filters: pfSpellFilters, dataSource: pfLocalData, modalConfig: pfSpellModal},
    {id: {fieldName: "id"}, filters: eldenItemsFilters, dataSource: eRLocalData, modalConfig: eldenItemsModal}
  ];

  //set which app is running by clicking navbar section
  function changeApp(iconIndex: number) {
    setCurrentApp(iconIndex);
  }

  //Logic for navbar to expand and contract, mouse over logic overridden if expand clicked
  function expandNav(event: React.MouseEvent | React.KeyboardEvent): void {
    if (event.type === "click")
      setOpenNav(navState => ({...navState, clickOpen: !navState.clickOpen}));
    else
      setOpenNav(navState => ({...navState, mouseOpen: !navState.mouseOpen}));
  }

  console.log(currentApp);

  return (
    <div className="App">
      <Navbar expandNav={(expandNav)} navState={openNav.mouseOpen || openNav.clickOpen} navigate={changeApp} />
      <SearchTable tableConfig={allTableConfig[currentApp]} />
    </div>
  )
}

export default App
