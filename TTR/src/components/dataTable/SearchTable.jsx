import React, {useState, useEffect} from "react";
import DataRow from "./DataRow";
import FilterSelect from "./FilterSelect";
import Modal from "../ui/Modal";
import numberSort from "../../util/NumberSort";
import findValue from "../../util/FindValue";

export default function SearchTable(props) {
    const [tableData, setTableData] = useState([]),
    [filters, setFilters] = useState({}),
    [searchData, setSearchData] = useState(initSearchData),
    [modal, setModal] = useState({visible: false, modalElements: []});

    /*
        props {
            id: {fieldName: '_id', extension: false}
            //filterName has to match field name in data source
            //extension is required if the required data is an object with generic field names (eg value)
            filters: [
                {filterName: name, filterType: "inputType"},
                {filterName: school, filterType: "select", extension: "value"}
            ],
            dataSource: {local: false, path: "Exampleurl.com", headers: {auth: pass}, method: "get"},
            modalFields: [
                {objectField: 'name', displayAs: 'h2', modalSection: "head"},
                {objectField: 'description', extension: "value", displayAs: 'p', modalSection: "body"},
            ]
        }
            
    */

   //initialise tableData state object based on either local data or API
    props.dataSource.local ? useEffect(initLocalData, []) : useEffect(callApi, []);
    useEffect(initFilters, [tableData, searchData.orderBy]);
    //create event listener to check for keypress to close modal
    useEffect(initKeyListener, []);

    useEffect(sortTable, [searchData.orderBy]);

    function initKeyListener() {
        window.addEventListener("keydown", closeModal);
        return () => {
            window.removeEventListener("keydown", closeModal);
        };
    }

    //initialise filter state object based on fields chosen in filters prop and unique values associated with those fields found in data source
    //ie any filters set to select will have options defined by unique values found in data 
    function initFilters() {
        const tempFilters = {};
        props.filters.map((filter) => {
            const tempFilterOptions = [];
            if (filter.filterType === "select") {
                for (const key in tableData) {
                    const tempVal = findValue(tableData[key], filter.filterName, filter.extension);
                    if (! tempFilterOptions.includes(tempVal))
                        tempFilterOptions.push(tempVal);
                }
            }
            if (typeof tempFilterOptions[0] === "number")
                tempFilterOptions.sort(numberSort);
            else 
                tempFilterOptions.sort();

            tempFilters[filter.filterName] = {...filter, filterOptions: tempFilterOptions};

        });
        setFilters(tempFilters);
    }

    //hides modal if escape is pressed or if x is clicked in modal
    function closeModal(event) {
        if (! event.code || event.code === "Escape")
            setModal((oldModal) => ({...oldModal, visible: false}));
    }

    //finds main data array in provided local data given appropriate path
    //sets tableData state with array of that data organised with IDs as keys
    function initLocalData() {
        const tempData = [];
        const unsorted = followObjPath(props.dataSource.data, props.dataSource.pathToData);
        for (const key in unsorted)
            tempData.push(unsorted[key]);

        setTableData(tempData);
    }

    //Fetches data from API, finds main data array based on props pathToData, then stores a key value arrray in state
    function callApi() {
        fetch(props.dataSource.api.url, props.dataSource.api.requestConfig)
        .then((res) => res.json())
        .then((data) => {
            const tempData = [];
            const unsorted = followObjPath(data, props.dataSource.pathToData);
            for (const key in unsorted)
                tempData.push(unsorted[key]);

            console.log("temp data in api call");
            console.log(tempData);
            setTableData(tempData);
        });
    }

    //takes an object and an array of field names intended to guide method to intended object
    function followObjPath(node, pathArray) {
        const pathClone = pathArray.map((pathVar) => pathVar);
        if (pathClone.length > 1)
            return followObjPath(node[pathClone.pop()], pathClone);
        else
            return node[pathClone.pop()];
    }

    //creates an object to reflect each filter chosen in props to prevent undefined values being checked
    function initSearchData() {
        const searchCategory = [];
        props.filters.map((filter) => {
            searchCategory[filter.filterName] = "";
        });
        const tempSearch = {...searchCategory, orderBy: {invert: false}};
        return tempSearch;
    }

    function updateSearch(event) {
        setSearchData(oldSearch => ({...oldSearch, [event.target.name]: event.target.value}));
    }

    //sorts tableData by filter stored in searchData (modified by clicking icon next to filter)
    function sortTable() {
        if (true) {
            setTableData((oldData) => {
                oldData.sort((x, y) => {
                    const xVal = findValue(x, searchData.orderBy.fieldName, searchData.orderBy.extension);
                    const yVal = findValue(y, searchData.orderBy.fieldName, searchData.orderBy.extension);
                    if (typeof xVal === "string")
                        return xVal.localeCompare(yVal);
                    else if (typeof xVal === "number") {
                        return numberSort(xVal, yVal);
                    } else
                        return 0;
                });
                if (searchData.orderBy.invert)
                    oldData.reverse();
                return oldData;
            });
        }
    }

    //function called when icon clicked next to filter elements
    //sets orderBy which is a dependancy for orderBy function
    function setOrder(event) {
        const chosenFilter = props.filters.find((filter) => {
            if (filter.filterName === event.target.parentNode.classList[0])
                return filter;
        });

        setSearchData((oldSearch) => {
            return ({
                ...oldSearch,
                orderBy:{
                    fieldName: chosenFilter.filterName,
                    extension: chosenFilter.extension,
                    invert: (oldSearch.orderBy.fieldName === chosenFilter.filterName) ? !oldSearch.orderBy.invert : false
                }
            });
        });
    }


    //Get names of data fields to be displayed on table based on filter props
    //ie defines what the rows in the table will be
    function getRowData(data) {
        const columns =[];
        props.filters.map((filter) => {
            columns[filter.filterName] = {value: findValue(data, filter.filterName, filter.extension), sizeTag: filter.scale};
        });
        return columns;
    }

    //Checks which row was clicked, loads data for that row (based on modal prop), and sets modal state with that data
    function rowClicked(event) {
        const rowId = event.target.parentNode.classList[0];
        let clickedRow = {};
        tableData.some((rowData) => {
            if (findValue(rowData, props.id.fieldName, props.id.extension) === rowId)
                clickedRow = rowData;
        });
        const modalElements = props.modalFields.map((field) => {
            return {
                ...field,
                value: findValue(clickedRow, field.objectField, field.extension),
            };
        });
        setModal({visible: true, modalElements: modalElements});
    }

    //checks each data element against current search values and generates jsx for elements that aren't filtered out
    function tableBody() {
        //jsx has to be returned outside of filter loop, this bool is used to remember anytime the value would be filtered
        let displayElement = true;
        const dataElements = [];
        for (const dKey in tableData) {
            const filterKeys = Object.keys(filters);
            filterKeys.map((fKey) => {
                if (displayElement) {
                    const value = findValue(tableData[dKey], fKey, filters[fKey].extension);
                    if (filters[fKey].filterType === "select") {
                        if (searchData[fKey] != 0 && value != searchData[fKey])
                            displayElement = false;
                    } else {
                        if (!value.toUpperCase().match(searchData[fKey].toUpperCase()))
                            displayElement = false;
                    }
                }
            });
            if (displayElement) {
                const tableFields = getRowData(tableData[dKey]);
                const rowId = findValue(tableData[dKey], props.id.fieldName, props.id.extension)
                dataElements.push(
                    <DataRow key={rowId} id={rowId} dataForDisplay={tableFields} handleClick={rowClicked} />
                );
            }
            displayElement = true;
        }
        return <tbody className="searchTable-tbody">{dataElements}</tbody>;
    }

    const tBody = tableBody();
    //Generate jsx for table top row (ie search filters) based on state data 
    const tHead = [];
    if (Object.keys(filters).length > 0) {
        for (const [filterName, filterData] of Object.entries(filters)) {
            tHead.push(
                <FilterSelect
                    key={filterName}
                    filterData={filterData}
                    value={searchData[filterName]}
                    handleChange={updateSearch}
                    sort={setOrder}
                    selected={searchData.orderBy}
                />
            );

        }
    }

    return (
        <>
            <table className="searchTable">
                <thead><tr className="filter-row">{tHead}</tr></thead>
                {tBody}
            </ table>
            {modal.visible && <Modal modalData={modal} closeFunction={closeModal}/>}
        </>
    )
}