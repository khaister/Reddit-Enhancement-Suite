export const fakeSubreddits = [
	'mod',
	'friends',
	'random',
	'myrandom',
	'all',
	'contrib',
	'popular',
] as const;

export function isFakeSubreddit(subreddit: string): boolean {
	return fakeSubreddits.some(fakeSubreddit => fakeSubreddit === subreddit.toLowerCase());
}
