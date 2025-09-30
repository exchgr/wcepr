import type { MwApiResponse } from "../types/mwApiResponse.ts"

export const fetchArticle = async (date: Date): Promise<MwApiResponse> =>
	(await fetch(`https://en.wikipedia.org/w/api.php?page=Portal:Current_events/${
		date.toLocaleDateString("en-US", {year: "numeric"})
	}_${
		date.toLocaleDateString("en-US", {month: "long"})
	}_${
		date.toLocaleDateString("en-US", {day: "numeric"})
	}&action=parse&format=json&origin=*`)).json()

