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
