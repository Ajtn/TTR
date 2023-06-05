//recursive function to find a value in an object given a unique key name (target)
//extension stores any generic children keys if they exist (eg {foo: {bar: {value: "actual data"}}})

export type JSONValue = string | number | JSONObject;

export interface JSONObject {
    [index: string]: JSONValue;
};

export function isJSONObject(object: any): object is JSONObject {
    if (object && typeof object === "object") {
        const objKeys = Object.keys(object);
        return objKeys.some(key => !isJSONValue(object.key));
    }
    return false;
} 

function isJSONValue(object: any): object is JSONValue {
    if (typeof object === "string" || typeof object === "number")
        return true;
    if (isJSONObject(object))
        return true;
    return false;
}


export function findValue(node: JSONObject, target: string, extension?: string):string | number | null {
    for (const key in node) {
        if (key === target) {
            if (! extension && typeof node[target] === "string" || typeof node[target] === "number") {
                return (node[target] as string | number);
            }
            if (extension && isJSONObject(node[target]) && Object.keys(node[target]).includes(extension)) {
                const tempVal = (node[target] as JSONObject)[extension];
                if (typeof tempVal === "string" || typeof tempVal === "number")
                    return tempVal;
                else {
                    console.log("bad type");
                }
            }
        } else {
            if (isJSONObject(node[key])) {
                const temp = findValue((node[key] as JSONObject), target, extension);
                if (temp)
                    return temp;
            }
        }
    }
    return null;
}
