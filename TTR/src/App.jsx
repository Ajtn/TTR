import SearchTable from "./components/dataTable/SearchTable";
import dataDump from "./assets/dataDump";


function App() {

  const filterOptions = [
    {filterName: "name", filterType: "inputType", scale: "medium"},
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
          Authorization: "5cfe0fea-a504-4ee4-8f88-baf84aeabef2"
        }
      }

    },
    pathToData: ["results"]
  };

  const localData = {
    local: true, data: dataDump, pathToData:["results"]
  };

  return (
    <div className="App">
      <SearchTable id={{fieldName: "_id", extension: false}} filters={filterOptions} dataSource={localData} modalFields={modalFields} />
    </div>
  )
}

export default App
