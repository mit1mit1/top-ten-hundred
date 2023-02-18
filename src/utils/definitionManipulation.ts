export const sanitizeWord = (word: string) => word.toLowerCase().replace(/[.,/#!$%^&*;":{}=_`~()?/-]/g, '');

export const getWords = (definition: string) => {
	return definition
		.split(/[ ,/-]+/)
		.map(sanitizeWord)
		.filter((word) => word.length > 0);
};

export const getDefinedWords = (definitions: Record<string, Array<string>>) =>
	Object.entries(definitions).filter((entry) => entry[1][0].length > 0);
