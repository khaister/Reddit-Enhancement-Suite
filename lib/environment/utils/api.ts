export function apiToPromise(func: (...args: unknown[]) => void): (...args: unknown[]) => Promise<any> {
	return (...args) =>
		new Promise((resolve: (result: Promise<never>) => void, reject: (error?: any) => void) => {
			func(...args, (...results) => {
				if (chrome.runtime.lastError) {
					reject(new Error(chrome.runtime.lastError.message));
				} else {
					resolve(results.length > 1 ? results : results[0]);
				}
			});
		});
}
