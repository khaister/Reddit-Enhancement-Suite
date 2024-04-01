import {groupBy} from 'lodash-es';
// importing core types is okay
import type { TableOption } from '../core/module'; // eslint-disable-line

export function indexOptionTable<T extends ReadonlyArray<any>, Ctx>(
    option: TableOption<Ctx, T>,
    keyIndex: number,
    keyTransformer: (arg1: string) => string = v: string => v,
): {
    [key: string]: T[]
} {
	const source = option.fields[keyIndex].type === 'list' ?
		Array.from(expandKeys(option.value)) :
		option.value;

	return groupBy(source, arr => keyTransformer(arr[keyIndex]));

	// allows indexing by multiple keys, e.g. transforms
	// [['foo,bar', 'baz']] to
	// [['foo', 'baz'], ['bar', 'baz']]
	function* expandKeys(nestedArray: Array<T>) {
		for (const arr of nestedArray) {
			for (const subKey of arr[keyIndex].split(',')) {
				yield [...arr.slice(0, keyIndex), subKey, ...arr.slice(keyIndex + 1)];
			}
		}
	}
}
