export const sanitizeWord = (word: string) => word.replace(/[.,/#!$%^&*;":{}=_`~()?/-]/g, '');
export const getObjectKey = (word: string) => sanitizeWord(word).toLowerCase();

export const getWords = (definition: string) => {
	return definition
		.split(/[ ,/-]+/)
		.map(getObjectKey)
		.filter((word) => word.length > 0);
};

export const getDefinedWords = (definitions: Record<string, Array<string>>) =>
	Object.entries(definitions).filter((entry) => entry[1][0].length > 0);
