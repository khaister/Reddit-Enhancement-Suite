import {keyedMutex} from '../../utils/async';
import { apiToPromise } from '../utils/api';
import { addListener } from './messaging';

const __set = apiToPromise((items, callback) => chrome.storage.local.set(items, callback));
const _set = (key: any, value: any) => __set({ [key]: value });
const __get = apiToPromise((keys, callback) => chrome.storage.local.get(keys, callback));
const _get = async (key: any, defaultValue = null) => (await __get({ [key]: defaultValue }))[key];

addListener('storage-cas', keyedMutex(async ([key, defaultValue, oldValue, newValue]: [any, any, any, any]) => {
	const storedValue = await _get(key, defaultValue);
	if (storedValue !== oldValue) return false;
	await _set(key, newValue);
	return true;
}, ([key]: [any]) => key));
