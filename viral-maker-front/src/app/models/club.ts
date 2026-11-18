export class Club {
    id?: string;
    name: string;
    description: string;
    sport_id: number;
    city: string;
    logo_url?: string;
    user_id_owner: string;
    slug?: string;
    createdAt?: Date | string;

    constructor(data: Omit<Club, 'id' | 'slug' | 'createdAt'> & Partial<Pick<Club, 'id' | 'slug' | 'createdAt'>>) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.sport_id = data.sport_id;
        this.city = data.city;
        this.logo_url = data.logo_url;
        this.user_id_owner = data.user_id_owner;
        this.slug = data.slug;
        this.createdAt = data.createdAt;
    }
}
