//recursive function to find a value in an object given a unique key name (target)
//extension stores any generic children keys if they exist (eg {foo: {bar: {value: "actual data"}}})

export type JSONValue = string | number | JSONObject;

interface JSONObject {
    [index: string]: JSONValue;
};

export function findValue(node: JSONValue, target: string, extension?: string):string | null | number {
    if (typeof node === "object") {
        for (const key in node) {
            if (typeof key === "string") {
                if (key === target) {
                    return extension ? node[key][extension] : node[key];
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