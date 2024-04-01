import {addListener, sendMessage} from './messaging';

(process.env.BUILD_TARGET === 'firefox' ? chrome.pageAction : chrome.action).onClicked.addListener(tab => {
	sendMessage('pageActionClick', undefined, tab.id);
});

addListener('pageAction', ({ operation, state }, { tab }) => {
	switch (operation) {
		case 'show':
			(process.env.BUILD_TARGET === 'firefox' ? chrome.pageAction.show : chrome.action.enable)(tab.id);
			(process.env.BUILD_TARGET === 'firefox' ? chrome.pageAction : chrome.action).setIcon({
				tabId: tab.id,
				path: {
					'19': state ? 'css-on-small.png' : 'css-off-small.png', // eslint-disable-line quote-props
					'38': state ? 'css-on.png' : 'css-off.png', // eslint-disable-line quote-props
				},
			});
			(process.env.BUILD_TARGET === 'firefox' ? chrome.pageAction : chrome.action).setTitle({
				tabId: tab.id,
				title: state ? 'Subreddit Style On' : 'Subreddit Style Off',
			});
			break;
		case 'hide':
			(process.env.BUILD_TARGET === 'firefox' ? chrome.pageAction.hide : chrome.action.disable)(tab.id);
			break;
		default:
			throw new Error(`Invalid action operation: ${operation}`);
	}
});
