import {Host} from '../../core/host';

export default new Host('memedad', {
	name: 'memedad',
	domains: ['memedad.com'],
	logo: 'https://memedad.com/favicon.ico',
	detect: ({ pathname }) => ((/^\/meme\/([0-9]+)/i)).exec(pathname),
	handleLink(href: string, [, id]: [any, any]) {
		return {
			type: 'IMAGE',
			src: `https://memedad.com/memes/${id}.jpg`,
		};
	},
});
