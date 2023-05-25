export type filter = {
    filterName: string;
    filterType: string;
    extension?: string;
    scale: string;
    filterOptions?: string[];
};

export function isFilter(object: any): object is filter {
    if ("filterName" in object && "filterType" in object && "scale" in object)
        return true;
    else 
        return false;
}

export type modalField = {
    fieldName: string;
    displayAs: string;
    modalSection: string;
    extension?: string;
    value?: string;
};