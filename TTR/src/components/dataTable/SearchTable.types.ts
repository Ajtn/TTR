export type filter = {
    filterName: string;
    inputType?: "textbox" | "select" | "radio";
    varType?: "number" | "boolean" | "string";
    extension?: string;
    scale: string;
    filterOptions?: (string | number)[];
};

export function isFilter(object: any): object is filter {
    if ("filterName" in object && "inputType" in object && "scale" in object)
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

