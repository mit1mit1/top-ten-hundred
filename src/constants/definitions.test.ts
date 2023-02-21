import { getDefinedWords, getWords } from '../utils/definitionManipulation';
import { definitions } from './definitions';
import { describe, expect, it } from 'vitest';

const eqSet = (xs: Set<string>, ys: Set<string>) =>
	xs.size === ys.size && [...xs].every((x) => ys.has(x));

const pushWords = (definition: Array<string>, words: Set<string>) => {
	definition.forEach((partialDefinition) => {
		getWords(partialDefinition).forEach((word) => {
			if (!words.has(word)) {
				words.add(word);
				if (definitions[word]) {
					pushWords(definitions[word], words);
				}
			}
		});
	});
	return words;
};

const definedWords = getDefinedWords(definitions);
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
		Object.values(definitions).forEach((definition) => {
			definition.forEach((partialDefinition) => {
				getWords(partialDefinition).forEach((word) => {
					expect(keys).toContain(word);
				});
			});
		});
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
console.log(`the first loop is ${JSON.stringify(firstLoop)} (${firstLoop.length})\n`);
const firstUndefined = firstLoop.filter(
	(keyword) => !definedWords.map((definition) => definition[0]).includes(keyword)
);
console.log(
	`it's undefined elements are ${JSON.stringify(
		firstUndefined
	)} (${firstUndefined.length})\n`
);
const missingElements = definedWords
	.map(([keyword, definition]) => keyword)
	.filter((keyword) => !firstLoop.includes(keyword));
console.log(`It's missing elements are ${JSON.stringify(missingElements)} (${missingElements.length})\n`);
// const secondLoop = uniqueSortedArrays[1];
// // console.log(`the first loop is ${JSON.stringify(secondLoop)}\n`);
// // console.log(`it's undefined elements are ${JSON.stringify(secondLoop.filter(keyword => !definitions[keyword]))}\n`);
// const missingElementsSecond = definedWords
// 	.map(([keyword, definition]) => keyword)
// 	.filter((keyword) => !secondLoop.includes(keyword));
// console.log(`Seconds missing elements are ${JSON.stringify(missingElementsSecond)}\n`);

const allWordsUsedInDefinitions = Object.values(definitions)
	.flat(2)
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
// , "out", "over", "own", "part", "past", "pay", "pick"
// "piece"
// "pink"
// "play"
// "point"
// "pretty"
// "put"
// "quite"
// "reason"
// "rest"
// "road"
// "rock"
// "room"
// "round"
// "sad"
// "safe"
// "said"
// "same"
// "say"
// "seem"
// "seen"
// "set"
// "shot"
// "should"
// "shut"
// "side"
// "skin"
// "so"
// "soft"
// "some"
// "sort"
// "spend"
// "spot"
// "start"
// "stay"
// "step"
// "stick"
// "still"
// "strong"
// "stuck"
// "stuff"
// "than"
// "that"
// "their"
// "these"
// "thick"
// "though"
// "thought","through","to","under","use","usually","very","want","was","what","which","while","whole","wide","will","worry","would"
