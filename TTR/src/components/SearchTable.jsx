import React, {useState, useEffect} from "react";
import dataDump from "../assets/dataDump";
import DataRow from "./DataRow";
import FilterSelect from "./FilterSelect";
import Modal from "./Modal";

export default function SearchTable(props) {
    const [tableData, setTableData] = useState([]),
    [filters, setFilters] = useState({}),
    [searchData, setSearchData] = useState(initialiseSearchData),
    [modal, setModal] = useState({visible: false, modalElements: []});
    let x = 0;

    /*
        props {
            id: {fieldName: '_id', extension: false}
            filters: [
                //two different options for pathing shown in first and second entry, second entry assumes filterName matches exactly with json key
                {filterName: name, filterType: "inputType", pathInData: {key: "name", parentKey: null}},
                {filterName: name, filterType: "inputType", extension: "value"},
                {filterName: schools, filterType: "select", filterOptions: ["option 1", "option 2"], pathInData: ["system", "school", "value"]}
            ],
            dataSource: {local: false, path: "Exampleurl.com", headers: {auth: pass}, method: "get"},
            modalData: [
                {dataName: 'name', displayAs: 'h2'},
                {dataName: 'description', extension: "value", displayAs: 'p'},
            ]

        }
            
    */

    /*
        Todo:
            -Finish making component generic
                -setup new props for DataRow as an array of the data to be shown
                -setupFilters appends .value to access values associated with data
            -improve style
                -CSS hardcoded with class names
            -reorder elements to display alphabetically or numerically
            -replace all instances of key/id with props defined id

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


    function findValue(node, target, extension) {
        x = x +1;
        for (const key in node) {
            if (key === target) {
                return extension ? node[key][extension] : node[key];
            } else {
                if (typeof node[key] === "object") {
                    const val = findValue(node[key], target, extension);
                    if (val) {
                        return val;
                    }
                }
            }
        }
    }

    //Get names of data fields to be displayed on table based on filter props
    function getRowData(data) {
        const columns =[];
        props.filters.map((filter) => {
            columns[filter.filterName] = findValue(data, filter.filterName, filter.extension);
        });
        return columns;
    }


    function setupFilters() {
        const tempFilters = {};
        props.filters.map((filter) => {
            const tempFilterOptions = [];
            if (filter.filterType === "select") {
                dataDump.results.map((item) => {
                    const tempVal = findValue(item, filter.filterName, filter.extension);
                    if (! tempFilterOptions.includes(tempVal))
                        tempFilterOptions.push(tempVal);
                });
            }
            tempFilters[filter.filterName] = {...filter, filterOptions: tempFilterOptions};
        });
        setFilters(tempFilters);
        setTableData(dataDump.results);
    }
 
    //checks each data element against current search values and generates jsx for elements that aren't filtered out
    function tableBody() {
        //jsx has to be returned outside of filter loop, this bool is used to remember anytime the value would be filtered
        let displayElement = true;
        const dataElements = tableData.map((data) => {
            const displayData = [];
            const filterKeys = Object.keys(filters);
            filterKeys.map((key) => {
                if (displayElement) {
                    const value = findValue(data, key, filters[key].extension);
                    if (filters[key].filterType === "select") {
                        if (searchData[key] != 0 && value != searchData[key])
                            displayElement = false;
                    } else {
                        if (!value.toUpperCase().match(searchData[key].toUpperCase())) {
                            displayElement = false;
                        }
                    }
                }

            })
            if (displayElement) {
                const id = findValue(data, props.id.fieldName, props.id.extension);
                const tableFields = getRowData(data);
                return (
                    <DataRow key={id} dataForDisplay={tableFields} />
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
    
    console.log(`x: ${x}`);


    return (
        <>
            <table>
                <thead><tr>{tHead}</tr></thead>
                {tBody}
            </ table>
            <Modal />
        </>
    )

}