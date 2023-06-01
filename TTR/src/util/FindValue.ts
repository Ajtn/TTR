//recursive function to find a value in an object given a unique key name (target)
//extension stores any generic children keys if they exist (eg {foo: {bar: {value: "actual data"}}})

export type JSONValue = string | number | JSONObject;

export interface JSONObject {
    [index: string]: JSONValue;
};

export function isJSONObject(object: any): object is JSONObject {
    const objKeys = Object.keys(object);
    return objKeys.some(key => !isJSONValue(object.key));
} 

function isJSONValue(object: any): object is JSONValue {
    if (typeof object === "string" || typeof object === "number")
        return true;
    if (isJSONObject(object))
        return true;
    return false;
}

export function findValue(node: JSONValue, target: string, extension?: string):string | null | number {
    if (typeof node === "object") {
        for (const key in node) {
            if (typeof key === "string") {
                if (key === target) {
                    const result = extension ? node[key][extension] : node[key];
                    if (typeof result === "string" || typeof result === "number")
                        return result;
                } else {
                    if (typeof node[key] === "object") {
                        const val = findValue(node[key], target, extension);
                        if (val) {
                            return val;
                        }
                    }
                }
            }
        }
    }
    return null;
}