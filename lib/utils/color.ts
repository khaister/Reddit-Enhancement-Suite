import tinycolor from 'tinycolor2';

export function colorToArray(colorString: string): [number, number, number] {
	const { r, g, b } = tinycolor(colorString).toRgb();
	return [r, g, b];
}

export function colorFromArray([r, g, b]: [any, any, any]): string {
	return tinycolor({ r, g, b }).toHexString();
}
