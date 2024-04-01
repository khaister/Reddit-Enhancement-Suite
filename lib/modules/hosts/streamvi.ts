import {Host} from '../../core/host';

export default new Host('streamvi', {
	name: 'streamvi',
	domains: ['streamvi.com'],
	logo: 'https://streamvi.com/assets/logo.png',
	detect: ({ searchParams }) => {
		const code = searchParams.get('video');
		if (code) return [code.toString()];
	},
	handleLink(href: string, [code]: [any]) {
		return {
			type: 'VIDEO',
			loop: true,
			sources: [{
				source: `https://cdn.streamvi.com/uploads/${code}.mp4`,
				type: 'video/mp4',
			}],
			poster: `https://cdn.streamvi.com/uploads/${code}.jpg`,
		};
	},
});
