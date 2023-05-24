import React, {useState, useEffect} from "react";
import DataRow from "./DataRow";
import FilterSelect from "./FilterSelect";
import Modal from "../ui/Modal";
import numberSort from "../../util/NumberSort";
import findValue from "../../util/FindValue";
import detailedData from "./detailedData";
import { filter } from "./SearchTable.types";

type searchTableProps = {
    //name of field used as key for json being displayed in table
    id: {fieldName: string, extension: boolean};
    filters: filter[];
    dataSource: {
        local: boolean,
        api?: {url: string, requestConfig: {method: string, headers: {}}},
        data?: {},
        pathToData: string[]
    };
};

type searchData = {
    orderBy?: {fieldName: string, extension: string, invert: boolean};
    searchStrings: {[fieldName: string]:string};
};

export default function SearchTable(props: searchTableProps) {

    const [tableData, setTableData] = useState<object[]>([]),
    [filters, setFilters] = useState<filter[]>([]),
    [searchData, setSearchData] = useState(initSearchData),
    [modal, setModal] = useState({visible: false, modalElements: []});

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
            const tempFilterOptions: string[] = [];
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

            return {...filter, filterOptions: tempFilterOptions};
        });
        setFilters(tempFilters);
    }

    //hides modal if escape is pressed or if x is clicked in modal
    function closeModal(event: Event):void {
        console.log(event);
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
    function initLocalData() {
        const tempData = [];
        const unsorted = followObjPath(props.dataSource.data, props.dataSource.pathToData);
        for (const key in unsorted)
            tempData.push(unsorted[key]);

        setTableData(tempData);
    }

    //Fetches data from API, finds main data array based on props pathToData, then stores a key value arrray in state
    function callApi() {
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
        const searchCategories: object = {};
        props.filters.forEach((filter) => {
            searchCategories[filter.filterName] = "";
        });
        return {searchStrings: searchCategories};
    }

    function updateSearch(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void {
        setSearchData((oldSearch) => {
            let tempSearch = oldSearch.searchStrings;
            for (const searchVal in oldSearch.searchStrings) {
                if (searchVal === event.target.name) {
                    tempSearch = {...oldSearch.searchStrings, [event.target.name]: event.target.value};
                }
            }
            return {...oldSearch, searchStrings: tempSearch};
        });

    }

    //sorts tableData by filter stored in searchData (modified by clicking icon next to filter)
    function sortTable() {
        if (searchData.orderBy) {
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
    function setOrder(event: React.MouseEvent<HTMLImageElement>) :void{
        const chosenFilter = props.filters.find((filter) => {
            if (filter.filterName === event.target.parentNode?.classList[0])
                return filter;
        });

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


    //Get names of data fields to be displayed on table based on filter props
    //ie defines what the rows in the table will be
    function getRowData(data) {
        const columns = props.filters.map((filter) => {
            return {name: filter.filterName, value: findValue(data, filter.filterName, filter.extension), sizeTag: filter.scale};
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
        let displayElement = true;
        const dataElements = tableData.map((dataE) => {
            
            filters.forEach((filter) => {
                const value = findValue(dataE, filter.filterName, filter.extension);
                if (filter.filterType === "select") {
                    if (searchData.searchStrings[filter.filterName] !== "" && value !== searchData.searchStrings[filter.filterName])
                        displayElement = false;
                }
                else {
                    if (typeof value === "string") {
                        if (!value.toUpperCase().match(searchData.searchStrings[filter.filterName].toUpperCase()))
                            displayElement = false;
                    }
                }
            });
            if (displayElement) {
                const tableFields = getRowData(dataE);
                const rowId = findValue(dataE, props.id.fieldName, props.id.extension);
                return <DataRow key={rowId} id={rowId} dataForDisplay={tableFields} handleClick={rowClicked}/>
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
                    value={searchData[filterName]}
                    handleChange={updateSearch}
                    sort={setOrder}
                    selected={searchData.orderBy}
                />
            );

        }
    }
    let modalBody = {};
    if (modal.visible) {
        modalBody = detailedData(modal.modalElements);
    }
    return (
        <>
            <table className="searchTable">
                <thead><tr className="filter-row">{tHead}</tr></thead>
                {tBody}
            </ table>
            {modal.visible && <Modal head={modalBody.head} body={modalBody.body} footer={modalBody.footer} closeFunction={closeModal}/>}
        </>
    )
}