import { getWords } from '../utils/splitter';
import { definitions } from './definitions';
import { describe, expect, it } from 'vitest';

const eqSet = (xs: Set<string>, ys: Set<string>) =>
	xs.size === ys.size && [...xs].every((x) => ys.has(x));

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
console.log(
	'You have defined ' +
		definedWords.length +
		' out of ' +
		Object.keys(definitions).length +
		' words'
);

const uniqueSets: Array<Set<string>> = [];

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
definedWords.forEach(([keyword, definition]) => {
	if (definition.length > 0) {
		const words = new Set([] as Array<string>);
		const allLinkedWords = pushWords(definition, words);
		if (!uniqueSets.find((set) => eqSet(set, allLinkedWords))) {
			uniqueSets.push(allLinkedWords);
		}
	}
});

const uniqueSortedArrays = uniqueSets.map((set) => Array.from(set).sort());

console.log(`there are ${uniqueSortedArrays.length} distinct loops\n\n`);
const firstLoop = uniqueSortedArrays[0];
console.log(`the first loop is ${JSON.stringify(firstLoop)}\n`);
console.log(
	`it's undefined elements are ${JSON.stringify(
		firstLoop.filter((keyword) => !definitions[keyword])
	)}\n`
);
const missingElements = definedWords
	.map(([keyword, definition]) => keyword)
	.filter((keyword) => !firstLoop.includes(keyword));
console.log(`It's missing elements are ${JSON.stringify(missingElements)}\n`);
const secondLoop = uniqueSortedArrays[0];
// console.log(`the first loop is ${JSON.stringify(secondLoop)}\n`);
// console.log(`it's undefined elements are ${JSON.stringify(secondLoop.filter(keyword => !definitions[keyword]))}\n`);
const missingElementsSecond = definedWords
	.map(([keyword, definition]) => keyword)
	.filter((keyword) => !secondLoop.includes(keyword));
console.log(`Seconds missing elements are ${JSON.stringify(missingElementsSecond)}\n`);

const allWordsUsedInDefinitions = Object.values(definitions)
	.map((definitionString) => getWords(definitionString))
	.flat(1);

const unreferencedWords = definedWords
	.map(([keyword, definition]) => keyword)
	.filter((word) => !allWordsUsedInDefinitions.includes(word));

console.log(`these words are defined but not referenced anywhere: ${unreferencedWords}`);

// describe('definition object has one cycle', () => {
// 	it.each(definedWords)(
// 		'loops through the whole thing from definition of the word %s',
// 		(keyWord, definition) => {
// 			if (definition.length > 0) {
// 				const words = new Set([] as Array<string>);
// 				const allLinkedWords = pushWords(definition, words);
// 				expect(allLinkedWords.size).toBeGreaterThanOrEqual(definedWords.length);
// 				// console.log(
// 				// 	'uses ' +
// 				// 		[...words].filter(
// 				// 			(word) => !definedWords.map((definition) => definition[0]).includes(word)
// 				// 		).length +
// 				// 		' undefined words'
// 				// );
// 				// console.log(
// 				// 	[...words]
// 				// 		.filter((word) => !definedWords.map((definition) => definition[0]).includes(word))
// 				// 		.sort()
// 				// );
// 			}
// 		}
// 	);
// });

// 'area',   'become',  'behind',    'change',  'focus',  'game',
// 'how',    'if',      'important', 'instead', 'is',     'it',
// 'its',    'just',    'keep',      'kind',    'knee',   'know',
// 'last',   'late',    'learn',     'least',   'less',   'let',
// 'lie',    'life',    'like',      'line',    'little', 'live',
// 'long',   'look',    'lose',      'lot',     'loud',   'low',
// 'mad',    'made',    'make',      'many',    'may',    'maybe',
// 'me',     'mean',    'meant',     'middle',  'might',  'mine',
// 'more',   'most',    'much',      'must',    'near',   'neck',
// 'need',   'nervous', 'never',     'next',    'nice',   'no',
// 'noise',  'normal',  'nose',      'not',     'number', 'of',
// 'off',    'often',   'old',       'on',      'once',   'one',
// 'only',   'open',    'or',        'other',   'out',    'outside',
// 'over',   'own',     'pain',      'part',    'party',  'past',
// 'people', 'phone',   'picture',   'piece',   'pink',   'place',
// 'play',   'point',   'pretend',   'put',     'quick',  'quickly',
// 'quite',  'read',    'reason',    'rest',
