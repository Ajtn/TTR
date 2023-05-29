import React, {useState, useEffect} from "react";
import DataRow from "./DataRow";
import FilterSelect from "./FilterSelect";
import Modal from "../ui/Modal";
import numberSort from "../../util/NumberSort";
import {findValue, JSONValue} from "../../util/FindValue";
import DetailedData from "./detailedData";
import { filter, isFilter, modalField } from "./SearchTable.types";

type searchTableProps = {
    //name of field used as key for json being displayed in table
    id: {fieldName: string, extension: string};
    filters: filter[];
    dataSource: {
        local: boolean,
        api?: {url: string, requestConfig: {method: string, headers: {}}},
        data?: {},
        pathToData: string[]
    };
    modalConfig: modalField[];
};

type searchData = {
    orderBy?: {fieldName: string, extension: string, invert: boolean};
    searchStrings: {[fieldName: string]:string | number};
};

export default function SearchTable(props: searchTableProps) {
    const modalFields: modalField[] = [];

    const [tableData, setTableData] = useState<object[]>([]),
    [filters, setFilters] = useState<filter[]>([]),
    [searchData, setSearchData] = useState(initSearchData),
    [modal, setModal] = useState({visible: false, modalElements: modalFields});

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
    function initFilters():void {
        const tempFilters = props.filters.map((filter) => {
            const tempFilterOptions: (string | number)[] = [];
            if (filter.inputType === "select") {
                for (const key in tableData) {
                    const tempVal = findValue(tableData[key] as JSONValue, filter.filterName, filter.extension);
                    if (tempVal === null)
                        return;
                    if (! tempFilterOptions.includes(tempVal))
                        tempFilterOptions.push(tempVal);
                }
            }
            if (typeof tempFilterOptions[0] === "number")
                tempFilterOptions.sort(numberSort);
            else 
                tempFilterOptions.sort();

            return {...filter, filterOptions: tempFilterOptions};
        });
        setFilters(tempFilters);
    }

    //hides modal if escape is pressed or if x is clicked in modal
    function closeModal(event: Event):void {
        if (event instanceof KeyboardEvent) {
            if (event.key === "Escape") {
                setModal((oldModal) => ({...oldModal, visible: false}));
            }
        } else {
            setModal((oldModal) => ({...oldModal, visible: false}));
        }
    }

    //finds main data array in provided local data given appropriate path
    //sets tableData state with array of that data organised with IDs as keys
    function initLocalData():void {
        const tempData = [];
        const unsorted = followObjPath(props.dataSource.data, props.dataSource.pathToData);
        for (const key in unsorted)
            tempData.push(unsorted[key]);

        setTableData(tempData);
    }

    //Fetches data from API, finds main data array based on props pathToData, then stores a key value arrray in state
    function callApi():void {
        if (typeof props.dataSource.api !== "undefined") {
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
    }

    //takes an object and an array of field names intended to guide method to intended object
    function followObjPath(node:{}, pathArray:string[]):{} {
        const pathClone = pathArray.map((pathVar) => pathVar);
        if (pathClone.length > 1)
            return followObjPath(node[pathClone.pop()], pathClone);
        else
            return node[pathClone.pop()];
    }

    //creates an object to reflect each filter chosen in props to prevent undefined values being checked
    function initSearchData():searchData {
        const searchCategories: searchData = {searchStrings: {}};
        props.filters.forEach((filter) => {
            if (filter.varType === "number")
                return searchCategories.searchStrings[filter.filterName] = 0;
            else
                return searchCategories.searchStrings[filter.filterName] = "";
        });
        return searchCategories;
    }


    function updateSearch(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void {
        setSearchData((oldSearch) => {
            let tempSearch = oldSearch.searchStrings;
            for (const searchVal in oldSearch.searchStrings) {
                if (searchVal === event.target.name) {      
                    if (typeof oldSearch.searchStrings[searchVal] === "number")
                        tempSearch = {...oldSearch.searchStrings, [event.target.name]: parseInt(event.target.value)};
                    else
                        tempSearch = {...oldSearch.searchStrings, [event.target.name]: event.target.value};
                }
            }
            return {...oldSearch, searchStrings: tempSearch};
        });

    }

    //sorts tableData by filter stored in searchData (modified by clicking icon next to filter)
    function sortTable():void {
        if (searchData.orderBy) {
            setTableData((oldData) => {
                oldData.sort((x, y) => {
                    const xVal = findValue(x as JSONValue, searchData.orderBy.fieldName, searchData.orderBy?.extension);
                    const yVal = findValue(y as JSONValue, searchData.orderBy.fieldName, searchData.orderBy?.extension);
                    if (typeof xVal === "string" && typeof yVal === "string")
                        return xVal.localeCompare(yVal);
                    else if (typeof xVal === "number" && typeof yVal === "number") {
                        return numberSort(xVal, yVal);
                    } else
                        return 0;
                });
                if (searchData.orderBy?.invert)
                    oldData.reverse();
                return oldData;
            });
        }
    }

    //function called when icon clicked next to filter elements
    //sets orderBy which is a dependancy for orderBy function
    function setOrder(event: React.MouseEvent<HTMLImageElement>):void {
        let tempNode = event.target as HTMLElement;
        const chosenFilter = props.filters.find((filter) => {
            if (filter.filterName === tempNode.parentElement?.classList[0])
                return filter;
        });

        if (isFilter(chosenFilter)) {
            setSearchData((oldSearch) => {
                return ({
                    ...oldSearch,
                    orderBy:{
                        fieldName: chosenFilter?.filterName,
                        extension: chosenFilter?.extension,
                        invert: (oldSearch.orderBy?.fieldName === chosenFilter?.filterName) ? !oldSearch.orderBy?.invert : false
                    }
                });
            });
        }

    }


    //Get names of data fields to be displayed on table based on filter props
    //ie defines what the rows in the table will be
    function getRowData(data:unknown) {
        const columns = props.filters.map((filter) => {
            const tempVal = findValue(data as JSONValue, filter.filterName, filter.extension);
            if (tempVal)
                return {name: filter.filterName, value: tempVal, sizeTag: filter.scale};
            else
                return false;
        });
        return columns.filter(col => col !== false);
    }
    
    //Checks which row was clicked, loads data for that row (based on modal prop), and sets modal state with that data
    function rowClicked(event: React.MouseEvent):void {
        const tempNode = event.target as HTMLElement;
        if ("parentElement" in tempNode) {
            const rowId = tempNode.parentElement?.classList[0];
            let clickedRow = {};
            tableData.some((rowData) => {
                if (findValue(rowData as JSONValue, props.id.fieldName, props.id.extension) === rowId)
                    clickedRow = rowData;
            });
            const modalElements = props.modalConfig.map((field) => {
                return {
                    ...field,
                    value: findValue(clickedRow, field.fieldName, field.extension? field.extension : ""),
                };
            });
            setModal({visible: true, modalElements: modalElements});
        }

    }

    //checks each data element against current search values and generates jsx for elements that aren't filtered out
    function tableBody() {
        let displayElement = true;
        const dataElements = tableData.map((dataE) => {
            
            filters.forEach((filter) => {
                const value = findValue(dataE as JSONValue, filter.filterName, filter.extension);
                if (filter.inputType === "select") {
                    if ((searchData.searchStrings[filter.filterName] !== "" && searchData.searchStrings[filter.filterName] !== 0) && value !== searchData.searchStrings[filter.filterName]) {
                        displayElement = false;
                    }
                } else {
                    if (typeof value === "string") {
                        if (!value.toUpperCase().match((searchData.searchStrings[filter.filterName] as string).toUpperCase()))
                            displayElement = false;
                    }
                }
            });
            if (displayElement) {
                const tableFields = getRowData(dataE);
                const rowId = findValue(dataE as JSONValue, props.id.fieldName, props.id.extension);
                return <DataRow key={rowId} id={rowId as string} dataForDisplay={tableFields} handleClick={rowClicked}/>
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
            tHead.push(
                <FilterSelect
                    key={filterName}
                    filterData={filterData}
                    handleChange={updateSearch}
                    value={searchData.searchStrings[filterName]}
                    sort={setOrder}
                    selected={searchData.orderBy}
                />
            );

        }
    }
    let modalElements = {};
    if (modal.visible) {
        modalElements = DetailedData(modal.modalElements);
    }
    return (
        <>
            <table className="searchTable">
                <thead><tr className="filter-row">{tHead}</tr></thead>
                {tBody}
            </ table>
            {modal.visible && <Modal modalContent={modalElements} closeFunction={closeModal}/>}
        </>
    )
}