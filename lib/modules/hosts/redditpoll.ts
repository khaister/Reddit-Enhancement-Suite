import {Host} from '../../core/host';

export default new Host('redditpoll', {
	name: 'redditpoll',
	domains: ['reddit.com'],
	attribution: false,
	detect({ pathname }) { return pathname.match(/^\/poll\/(\w+)/); },
	handleLink(href: string, [, id]: [any, any]) {
		return {
			type: 'IFRAME',
			expandoClass: 'selftext',
			embed: `https://www.reddit.com/poll/${id}`,
			height: '500px',
			width: '700px',
		};
	},
});
