import React, {useState, useEffect} from "react";
import dataDump from "../assets/dataDump";
import DataRow from "./DataRow";
import FilterSelect from "./FilterSelect";

export default function SearchTable(props) {
    const [tableData, setTableData] = useState([]),
    [filters, setFilters] = useState({}),
    [searchData, setSearchData] = useState({}),
    [modal, setModal] = useState({visible: false, modalElements: []});

    /*
        props {
            filters: [
                {filterName: name, filterType: "inputType", pathInData: {key: "name", parentKey: null}},
                {filterName: schools, filterType: "select", filterOptions: ["option 1", "option 2"], pathInData: {key: "school", parentKey: "system"}}
            ],
            dataSource: {local: false, path: "Exampleurl.com", headers: {auth: pass}, method: "get"},

        }
            
    */

    //todo: Make this function generic, ie read in chosen filters from filters prop object and use them to populate filters state variable from pulled data
    //      prop needs to include

                    // Object.keys(item).some((key) => {
                //     if (key == filter.name)
                //         return key;
                // });
                // if (! temp.includes(item) && )


    function updateSearch(event) {
        console.log(event);
    }
    
    function setupFilters() {
        const tempFilters = {};
        props.filters.map((filter) => {
            const temp = [];
            if (filter.pathInData.parentKey) {
                dataDump.results.map((item) => {
                    if (! temp.includes(item[filter.pathInData.parentKey][filter.pathInData.key]))
                        temp.push(item[filter.pathInData.parentKey][filter.pathInData.key]);
                })
            } else {
                dataDump.results.map((item) => {
                    if (! temp.includes(item[filter.pathInData.key]))
                        temp.push(item[filter.pathInData.key]);
                })
            }
            tempFilters[filter.name] = temp;
        });
        setFilters(tempFilters);
        setTableData(dataDump);
    }

    function tableBody() {
        const dataElements = tableData.map((data) => {
            filters.map((filter) => {
                if (filter.filterType === "select") {
                    if (filter.pathInData.parentKey) {
                        if (searchData[filter.filterName] != 0 && data[filter.pathInData.parentKey][filter.pathInData.key] != searchData[filter.filterName]) {
                            return false;
                        }
                    } else {
                        if (searchData[filter.filterName] != 0 && data[filter.pathInData.key] != searchData[filter.filterName]) {
                            return false;
                        }
                    }
                } else {
                    if (!data[filter.filterName].toUpperCase().match(searchData[filter.filterName].toUpperCase())) {
                        return false;
                    }
                }
                return (
                    <DataRow key={data._id} data={data} handleClick={rowClicked} />
                )

            });
        });
    }

    useEffect(setupFilters, []);
    console.log("Search data: ");
    console.log(searchData);

    const tBody = tableBody(),
    tHead = props.filters.map((filter) => {
        if (filter.filterType !== "select") {
            return (
                <td className={`filter-td ${filter.name}`}>
                    <input name={filter.filterName} placeholder={filter.filterName} value={searchData[filter.filterName]} onChange={updateSearch} />
                </td>
            )
        } else {
            console.log(filter);
            return (
                <FilterSelect name={filter.filterName} filterData={searchData[filter.filterName]} handleChange={updateSearch} />
            )
        }
    });

    return (
        <div>
            <tr>{tHead}</tr>
            <tr>{tBody}</tr>
        </div>
    )

}