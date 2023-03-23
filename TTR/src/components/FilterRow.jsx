import React from "react";
import FilterSelect from "./FilterSelect";

export default function FilterRow(props) {
    console.log(props.searchElements)

    const filters =  props.searchElements.map((element) => {
        if (element.filterType === "select") { 
            return <FilterSelect name={element.filterName} filterData={element.filterData} />
        } else {
            return <td className={`filter-td-top-row td-${element.filterName}`}><input name={element.filterName} placeholder={element.filterName} value={searchData.name} onChange={updateSearch} /></td>
        }
        
    })

    return (
        <tr className="filter-row">
            {filters}
        </tr>
    );
}

{/* <tr className="filter-top-row">
<td className="filter-td-top-row td-name"><input name="name" placeholder="Spell name" value={searchData.name} onChange={updateSearch} /></td>

<FilterSelect name="level" filterData={levels} handleChange={updateSearch} />
<FilterSelect name="school" filterData={schools} handleChange={updateSearch} />
<FilterSelect name="source" filterData={sources} handleChange={updateSearch} />
</tr> */}