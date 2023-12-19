let Big_Names = ["", "Thousand", "Million", "Billion", "Trillion"];

export function short_nums(numinp, dec = 3) {
	if (numinp == 0) {
		return "0";
	}
	let len = Math.floor(Math.log10(Math.abs(numinp)));
	let exp = Math.floor(len / 3);
	let first_digits =
		Math.floor(numinp / 10 ** (len - (len % 3) - dec)) / 10 ** dec;
	return `${first_digits} ${Big_Names[exp]}`;
}


export function accessNestedPropertyList(obj, arr) {
    return arr.reduce((nestedObj, key) => {
        if (key === "") {
            return nestedObj;
        }
        return (nestedObj !== undefined && nestedObj[key] !== undefined) ? nestedObj[key] : undefined;
    }, obj);
}

export function getNestedProperty(obj, string) {
    const arr = string.split(".")
    return accessNestedPropertyList(obj, arr)

    
}


export function attempValuesOfObject(obj, ...props) {
    for (let prop of props) {
        const value = getNestedProperty(obj, prop);
        if (value !== undefined) {
            return value;
        }
    }
}