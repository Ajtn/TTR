import React, {useState, useEffect} from "react";
import dataDump from "../assets/dataDump";
import DataRow from "./DataRow";
import FilterSelect from "./FilterSelect";
import Modal from "./Modal";
import SpellData from "./SpellData";


export default function FilterTable(props) {
    const [tableData, setData] = useState([]),
    [searchData, setSearch] = useState({name: "", level: 0, school: "0", source: "0"}),
    [schools, setSchools] = useState([]),
    [levels, setLevels] = useState([1, 2, 3, 4]),
    [sources, setSources] = useState([]),
    [modal, setModal] = useState({visible: false, rowData: {}});

    //configure header object
    const requestConfig = {
        method: "GET",
        headers: {
            Authorization: props.apiKey
        }
    };

    
    // //pulls data from hook sent with props then modifies tableData state object with response
    // function grabSetData() {
    //     fetch(props.endPoint, requestConfig)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         const tempSchools = [],
    //         tempLevels = [],
    //         tempSources = [];
    //         data.results.map((item) => {
    //             if (! tempSchools.includes(item.system.school.value))
    //                 tempSchools.push(item.system.school.value);

    //             if (! tempLevels.includes(item.system.level.value))
    //                 tempLevels[item.system.level.value] = item.system.level.value;
    //                 //tempLevels.push(item.system.level.value);

    //             if (! tempSources.includes(item.system.source.value))
    //                 tempSources.push(item.system.source.value);
    //         })
    //         setSchools(tempSchools);
    //         setLevels(tempLevels);
    //         setSources(tempSources);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }

    function grabSetData() {
        const tempSchools = [],
        tempLevels = [],
        tempSources = [];
        dataDump.results.map((item) => {
            if (! tempSchools.includes(item.system.school.value))
                tempSchools.push(item.system.school.value);

            if (! tempLevels.includes(item.system.level.value))
                tempLevels[item.system.level.value] = item.system.level.value;
                //tempLevels.push(item.system.level.value);

            if (! tempSources.includes(item.system.source.value))
                tempSources.push(item.system.source.value);
        })
        setSchools(tempSchools);
        setLevels(tempLevels);
        setSources(tempSources);
        setData(dataDump.results);
    }


    function updateSearch(event) {
        console.log(event.target.value)
        setSearch(oldSearch => ({...oldSearch, [event.target.name]: event.target.value}));
    }

    //use effect required for external API call, empty dependency array as this only needs to happen once
    useEffect(grabSetData, []);

    function rowClicked(event) {
        //find data corresponding to id in event
        const dataId = event.target.parentNode.attributes.dataid;
        const data = tableData.find((entry) => {
            if (entry._id == dataId.value)
                return entry;
        })
        //setModal((oldModal) => ({visible: !oldModal.visible, rowData: data}));
        setModal({visible: true, rowData: data});
    }
    
    function applyFilters() {
        const dataElements = tableData.map((data) => {
            if (searchData.level != 0 && data.system.level.value != searchData.level)
                return false;
            if (searchData.school != 0 && data.system.school.value !== searchData.school)
                return false;
            if (searchData.source != 0 && data.system.source.value !== searchData.source)
                return false;
            if (!data.name.toUpperCase().match(searchData.name.toUpperCase()))
                return false;
            return (
                <DataRow key={data._id} data={data} handleClick={rowClicked} />
            )
        });
        return dataElements;
    }

    function closeModal(event) {
        console.log(event)
        if (event._reactName !== "onKeyDown" || event.code === "Escape") {
            setModal((oldModal) => ({...oldModal ,visible: !oldModal.visible}));
        }
    }

    const tBody = applyFilters();

    return (
        <div className="filter-table-div">
            <table className="filter-table">
                <thead>
                    <tr className="filter-top-row">
                        <td className="filter-td-top-row td-name"><input name="name" placeholder="Spell name" value={searchData.name} onChange={updateSearch} /></td>

                        <FilterSelect name="level" filterData={levels} handleChange={updateSearch} />
                        <FilterSelect name="school" filterData={schools} handleChange={updateSearch} />
                        <FilterSelect name="source" filterData={sources} handleChange={updateSearch} />
                    </tr>
                </thead>
                <tbody>
                    {tBody}
                </tbody>
            </table>
            <Modal handleClick={closeModal} header={modal.rowData.name} visible={modal.visible} >
                <SpellData data={modal.rowData} />
            </Modal>
        </div>
    );
}

//5cfe0fea-a504-4ee4-8f88-baf84aeabef2

// <td className="filter-td-top-row td-school"><select defaultValue={0} name="school" onChange={updateSearch}>
// <option value={0}>Filter by school</option>
// {schools.map(school => <option key={school} value={school}>{school}</option>)}
// </select></td>
// <td className="filter-td-top-row td-source"><select defaultValue={0} name="source" onChange={updateSearch}>
// <option value={0}>Filter by source</option>
// {sources.map(source => <option key={source} value={source}>{source}</option>)}
// </select></td>