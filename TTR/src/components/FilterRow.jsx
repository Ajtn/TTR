import React from "react";
import FilterSelect from "./FilterSelect";

export default function FilterRow(props) {

    const filters =  props.searchElements.map((element) => {
        if (element.type === "select") { 
            return <FilterSelect name={element.name} filterData={element.filterData} />
        } else {
            return <input name={element.name} placeholder={element.name} value={searchData.name} onChange={updateSearch} />
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