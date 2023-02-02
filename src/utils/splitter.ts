export const getWords = (definition: string) => {
	return definition
		.split(/[ ,/-]+/)
		.map((word) => word.toLowerCase().replace(/[.,/#!$%^&*;":{}=_`~()?/-]/g, ''))
		.filter((word) => word.length > 0);
};
