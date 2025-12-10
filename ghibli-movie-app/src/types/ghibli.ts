export interface Film {
	id: string;
	title: string;
	description: string;
	release_date?: string;
}

export interface Person {
	id: string;
	name: string;
	gender?: string;
	age?: string;
	eye_color?: string;
}
