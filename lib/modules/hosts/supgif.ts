import {Host} from '../../core/host';

export default new Host('supgif', {
	name: 'Supgif',
	domains: ['supgif.com'],
	attribution: false,
	detect: ({ pathname }) => ((/^\/c\/([\w\-]+)/i)).exec(pathname),
	handleLink(href: string, [, id]: [any, any]) {
		return {
			type: 'IFRAME',
			embed: `https://www.supgif.com/embed/${id}`,
			fixedRatio: true,
		};
	},
});
