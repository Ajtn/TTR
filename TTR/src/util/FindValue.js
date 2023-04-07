//recursive function to find a value in an object given a unique key name (target)
//extension stores any generic children keys if they exist (eg {foo: {bar: {value: "actual data"}}})

export default function findValue(node, target, extension) {
    for (const key in node) {
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