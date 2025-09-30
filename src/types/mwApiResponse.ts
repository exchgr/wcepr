export type MwApiResponse = {
	parse: {
		title: string;
		pageid: number;
		revid: number;
		text: { "*": string };
		langlinks: any[];
		categories: { sortkey: string; "*": string }[];
		links: ({ ns: number; exists: string; "*": string })[];
		templates: ({ ns: number; exists: string; "*": string })[];
		images: any[];
		externallinks: string[];
		sections: any[];
		parsewarnings: any[];
		displaytitle: string;
		iwlinks: any[];
		properties: { name: string; "*": number }[]
	}
}
