import { getWords } from '../utils/splitter';
import { definitions } from './definitions';
import { describe, expect, it } from 'vitest';

const pushWords = (definition: string, words: Set<string>) => {
	getWords(definition).forEach((word) => {
		if (!words.has(word)) {
			words.add(word);
			if (definitions[word]) {
				pushWords(definitions[word], words);
			}
		}
	});
	return words;
};

const definedWords = Object.entries(definitions).filter((entry) => entry[1].length > 0);
console.log("You have defined " + definedWords.length + " out of " + Object.keys(definitions).length + " words");

describe('definition object is contained', () => {
	it('only references itself in definitions', () => {
		const keys = Object.keys(definitions);
		Object.values(definitions).forEach((definition) =>
			getWords(definition).forEach((word) => {
				expect(keys).toContain(word);
			})
		);
	});
});

describe('definition object has one cycle', () => {
	it.each(definedWords)(
		'loops through the whole thing from definition of the word %s',
		(keyWord, definition) => {
			if (definition.length > 0) {
				const words = new Set([] as Array<string>);
				const allLinkedWords = pushWords(definition, words);
				expect(allLinkedWords.size).toBeGreaterThanOrEqual(definedWords.length);
				// console.log('uses ' + [...words].filter(word => !definedWords.map(definition => definition[0]).includes(word)).length + ' undefined words')
				// console.log([...words].filter(word => !definedWords.map(definition => definition[0]).includes(word)).sort())
			}
		}
	);
});

// 'behind',    'chair',   'check',   'help',    'how',     'if',
// 'important', 'instead', 'is',      'it',      'its',     'just',
// 'keep',      'kind',    'knee',    'know',    'last',    'late',
// 'least',     'left',    'less',    'let',     'lie',     'life',
// 'like',      'line',    'little',  'live',    'long',    'look',
// 'lose',      'lot',     'loud',    'low',     'made',    'make',
// 'many',      'may',     'maybe',   'me',      'mean',    'meant',
// 'middle',    'might',   'mine',    'more',    'morning', 'most',
// 'much',      'must',    'neck',    'need',    'never',   'next',
// 'nice',      'no',      'noise',   'normal',  'nose',    'not',
// 'number',    'of',      'off',     'often',   'old',     'on',
// 'once',      'one',     'only',    'open',    'or',      'other',
// 'out',       'outside', 'over',    'own',     'pain',    'part',
// 'past',      'people',  'phone',   'picture', 'pink',    'place',
// 'play',      'point',   'pretend', 'put',     'quickly', 'quite',
// 'read',      'reason',  'rest',    'return',  'rock',    'room',
// 'round',     'run',     'sad',     'said',