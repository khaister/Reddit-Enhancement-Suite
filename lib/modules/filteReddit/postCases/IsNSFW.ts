import {Case} from '../Case';

export class IsNSFW extends Case {
	static text = 'NSFW';

	static fields = ['post is marked NSFW'];

	static unique = true;

	trueText = 'nsfw';

	evaluate(thing: any) {
		return thing.isNSFW();
	}
}