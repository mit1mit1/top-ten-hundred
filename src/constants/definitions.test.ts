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

// 'clean',      'clear',     'close',  'day',     'deep',
// 'did',        'direction', 'do',     'does',    'done',
// 'down',       'each',      'easy',   'eat',     'either',
// 'else',       'empty',     'even',   'every',   'everyone',
// 'everything', 'except',    'face',   'father',  'figure',
// 'fire',       'first',     'follow', 'for',     'forward',
// 'from',       'get',       'glass',  'go',      'gone',
// 'good',       'green',     'ground', 'grow',    'hair',
// 'half',       'hand',      'happen', 'hard',    'has',
// 'have',       'her',       'him',    'hit',     'hope',
// 'hot',        'how',       'human',  'i',       'if',
// 'important',  'in',        'inside', 'instead', 'into',
// 'is',         'it',        'its',    'just',    'keep',
// 'knee',       'know',      'late',   'left',    'less',
// 'let',        'lie',       'life',   'like',    'line',
// 'little',     'live',      'long',   'look',    'lose',