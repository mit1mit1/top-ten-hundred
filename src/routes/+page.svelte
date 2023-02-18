<script>
	import { definitions } from '../constants/definitions';
	import { getDefinedWords, sanitizeWord } from '../utils/definitionManipulation';

	const definedWords = getDefinedWords(definitions);

	let selectedWord = definedWords[0][0];
	let splitDefinitions = definitions[sanitizeWord(selectedWord)].split(" ");

    let clicks = 0;
</script>

<h1>Top Ten Hundred of Word</h1>
<p><b>{selectedWord}</b></p>
{#each splitDefinition as word}
	<a
		on:click={() => {
			if (definitions[sanitizeWord(word)]) {
				selectedWord = word;
				splitDefinition = definitions[sanitizeWord(word)].split(" ");
                clicks++;
			}
		}}
		class={definitions[sanitizeWord(word)] ? 'clickable' : ''}
	>
		{`${word} `}
	</a>
{/each}
<p>You've taken {clicks} clicks</p>

<style>
	.clickable {
		cursor: pointer;
        font-weight: bold;
	}
</style>
