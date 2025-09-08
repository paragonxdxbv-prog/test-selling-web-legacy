export type Product = {
	id: string;
	title: string;
	description: string;
	price: number;
	imageUrl: string;
	buyUrl: string;
	featured: boolean;
	createdAt: number;
	updatedAt: number;
};

export type RulesDoc = {
	markdown: string;
	updatedAt: number;
};
