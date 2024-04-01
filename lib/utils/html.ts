const escapeLookups = {
	'&': '&amp;',
	'"': '&quot;',
	"'": '&apos;', // eslint-disable-line quotes
	'<': '&lt;',
	'>': '&gt;',
	'/': '&#47;',
} as const;

export function escapeHTML(str?: string | null): string {
	return str ?
		str.toString().replace(/[&"'<>\/]/g, m => escapeLookups[m]) :
		'';
}
