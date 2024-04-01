import {Host} from '../../core/host';

export default new Host('ridewithgps', {
	name: 'ridewithgps',
	domains: ['ridewithgps.com'],
	attribution: false,
	detect: ({ pathname }) => ((/^\/(trips|routes)\/(\d+)/i)).exec(pathname),
	handleLink(href: string, [, type, id]: [any, any, any]) {
		return {
			type: 'IFRAME',
			embed: `https://ridewithgps.com/${type}/${id}/embed`,
		};
	},
});
