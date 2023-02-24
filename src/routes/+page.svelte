<script lang="ts">
	import { definitions } from '../constants/definitions';
	import { getDefinedWords, sanitizeWord, getObjectKey } from '../utils/definitionManipulation';

	const definedWords = getDefinedWords(definitions);
	const getSplitDefinitions = (selectedWord: string) =>
		definitions[getObjectKey(selectedWord)].map((definition) => definition.split(' '));

	let selectedWord = definedWords[0][0];
	let splitDefinitions = getSplitDefinitions(selectedWord);

	let clicks = 0;
</script>

<h1>Top Ten Hundred of Word</h1>
<p><b>{sanitizeWord(selectedWord)}</b></p>
{#each splitDefinitions as splitDefinition}
	{#each splitDefinition as word}
		<a
			on:click={() => {
				if (definitions[getObjectKey(word)]) {
					selectedWord = word;
					splitDefinitions = getSplitDefinitions(word);
					clicks++;
				}
			}}
			class={definitions[getObjectKey(word)] ? 'clickable' : ''}
		>
			{`${word} `}
		</a>
	{/each}
{/each}
<p>You've taken {clicks} clicks</p>

<style>
	.clickable {
		cursor: pointer;
		font-weight: bold;
	}
</style>
