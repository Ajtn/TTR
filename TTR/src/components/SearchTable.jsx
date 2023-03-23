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
            }

        });
        console.log(tempFilters);
        setFilters(tempFilters);
        setTableData(dataDump.results);
    }

    console.log("filters: ");
    console.log(filters);

    function tableBody() {
        const dataElements = tableData.map((data) => {
            for (const [filterName, value] of Object.entries(filters)) {
                if (value.filterType === "select") {
                    if (value.pathInData.parentKey) {
                        if (searchData[value.filterName] != 0 && data[value.pathInData.parentKey][value.pathInData.key] != searchData[value.filterName]) {
                            return false;
                        }
                    } else {
                        if (searchData[value.filterName] != 0 && data[value.pathInData.key] != searchData[value.filterName]) {
                            return false;
                        }
                    }
                } else {
                    // console.log("data: ");
                    // console.log(value);
                    if (!data[value.filterName].toUpperCase().match(searchData[value.filterName].toUpperCase())) {
                        return false;
                    }
                }
                return (
                    <DataRow key={data._id} data={data} handleClick={updateSearch} />
                )
            }


        });
        return <tbody className="searchTable-tbody">{dataElements}</tbody>;
    }

    const tBody = tableBody();

    if (filters) {
        const tHead = filters.map((filter) => {
            if (filter.filterType !== "select") {
                return (
                    <td key={filter.filterName} className={`filter-td td-${filter.filterName}`}>
                        <input name={filter.filterName} placeholder={filter.filterName} value={searchData[filter.filterName]} onChange={updateSearch} />
                    </td>
                )
            } else {
                return (
                    <FilterSelect key={filter.filterName} name={filter.filterName} filterData={filter.filterOptions} handleChange={updateSearch} />
                )
            }
        });
    }


    // const tHead = props.filters.map((filter) => {
    //     if (filter.filterType !== "select") {
    //         return (
    //             <td key={filter.filterName} className={`filter-td td-${filter.filterName}`}>
    //                 <input name={filter.filterName} placeholder={filter.filterName} value={searchData[filter.filterName]} onChange={updateSearch} />
    //             </td>
    //         )
    //     } else {
    //         return (
    //             <FilterSelect key={filter.filterName} name={filter.filterName} filterData={filter.filterOptions} handleChange={updateSearch} />
    //         )
    //     }
    // });

    return (
        <table>
            <thead><tr>{tHead}</tr></thead>
            {tBody}
        </ table>
    )

}