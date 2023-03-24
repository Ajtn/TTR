import React, {useState, useEffect} from "react";
import dataDump from "../assets/dataDump";
import DataRow from "./DataRow";
import FilterSelect from "./FilterSelect";

export default function SearchTable(props) {
    const [tableData, setTableData] = useState([]),
    [filters, setFilters] = useState({}),
    [searchData, setSearchData] = useState(initialiseSearchData),
    [modal, setModal] = useState({visible: false, modalElements: []});

    //const [searchData, setSearchData] = useState(props.filters.map());

    /*
        props {
            filters: [
                {filterName: name, filterType: "inputType", pathInData: {key: "name", parentKey: null}},
                {filterName: schools, filterType: "select", filterOptions: ["option 1", "option 2"], pathInData: {key: "school", parentKey: "system"}}
            ],
            dataSource: {local: false, path: "Exampleurl.com", headers: {auth: pass}, method: "get"},

        }
            
    */

    /*
        Todo:
            -Finish making component generic
                -DataRow is a subcomponent that hardcodes value for spell data
                -setupFilters appends .value to access values associated with data
            -setup change functions to modify searchData
            -improve style
                -CSS hardcoded with class names

    */
    useEffect(setupFilters, []);

    function initialiseSearchData() {
        //temp array to store each data type that will be used in search data (as defined by filters prop)
        console.log("Initialise search data");
        const searchCategory = [];
        props.filters.map((filter) => {
            searchCategory[filter.filterName] = "";
        });
        const tempSearch = {...searchCategory};
        return tempSearch;
    }

    function updateSearch(event) {
        setSearchData(oldSearch => ({...oldSearch, [event.target.name]: event.target.value}));
    }
    
    function setupFilters() {
        console.log("setting up filters");
        const tempFilters = {};
        props.filters.map((filter) => {
            if (filter.filterType === "select") {
                const temp = [];
                if (filter.pathInData.parentKey) {
                    //** to do:
                    //generalise JSON retrieval (currently using .value, this can be made into a prop if necessary)
                    dataDump.results.map((item) => {
                        if (! temp.includes(item[filter.pathInData.parentKey][filter.pathInData.key].value))
                            temp.push(item[filter.pathInData.parentKey][filter.pathInData.key].value);
                    })
                } else {
                    dataDump.results.map((item) => {
                        if (! temp.includes(item[filter.pathInData.key]))
                            temp.push(item[filter.pathInData.key]);
                    })
                }
                tempFilters[filter.filterName] = {...filter, filterOptions: temp};
            } else {
                tempFilters[filter.filterName] = {...filter};
            }

        });
        setFilters(tempFilters);
        setTableData(dataDump.results);
    }

    //checks each data element against current search values and generates jsx for elements that aren't filtered out
    function tableBody() {
        //jsx has to be returned outside of filter loop, this bool is used to remember anytime the value would be filtered
        let displayElement = true;
        const dataElements = tableData.map((data) => {
            const filterKeys = Object.keys(filters);
            filterKeys.map((key) => {
                if (displayElement) {
                    if (filters[key].filterType === "select") {
                        if (filters[key].pathInData.parentKey) {
                            if (searchData[key] != 0 && data[filters[key].pathInData.parentKey][filters[key].pathInData.key].value != searchData[key]) {
                                displayElement = false;
                            }
                        } else {
                            if (searchData[key] != 0 && data[filters[key].pathInData.key] != searchData[key]) {
                                displayElement = false;
                            }
                        }
                    } else {
                        if (!data[key].toUpperCase().match(searchData[key].toUpperCase())) {
                            displayElement = false;
                        }
                    }
                }

            })
            if (displayElement) {
                return (
                    <DataRow key={data._id} data={data} handleClick={updateSearch} />
                );
            }
            displayElement = true;
        });
        return <tbody className="searchTable-tbody">{dataElements}</tbody>;
    }

    const tBody = tableBody();
    //Generate jsx for table top row (ie search filters) based on state data 
    const tHead = [];
    if (Object.keys(filters).length > 0) {
        for (const [filterName, filterData] of Object.entries(filters)) {
            if (filterData.filterType !== "select") {
                tHead.push(
                    <td key={filterName} className={`filter-td td-${filterName}`}>
                        <input name={filterName} placeholder={filterName} value={searchData[filterName]} onChange={updateSearch} />
                    </td>
                )
            } else {
                tHead.push(
                    <FilterSelect key={filterName} name={filterName} filterData={filterData.filterOptions} handleChange={updateSearch} />
                )
            }
        }

    }
    



    return (
        <table>
            <thead><tr>{tHead}</tr></thead>
            {tBody}
        </ table>
    )

}