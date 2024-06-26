import {Host} from '../../core/host';

export default new Host('defaultImage', {
	name: 'defaultImage',
	domains: [],
	detect: ({ pathname }) => ((/\.(webp|gif|jpe?g|png|svg)$/i)).test(pathname),
	handleLink(href: string) {
		return {
			type: 'IMAGE',
			src: href,
		};
	},
});
