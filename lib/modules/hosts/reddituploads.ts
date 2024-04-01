import {Host} from '../../core/host';

export default new Host('reddituploads', {
	name: 'reddituploads',
	domains: ['reddituploads.com'],
	attribution: false,
	detect: () => true,
	handleLink(href: string) {
		return {
			type: 'IMAGE',
			src: href,
		};
	},
});
