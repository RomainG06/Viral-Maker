export class Credits {
    credits_remaining: number;
    updatedAt: Date;

    constructor(credits_remaining: number, updatedAt: Date) {
        this.credits_remaining = credits_remaining;
        this.updatedAt = updatedAt;
    }
}
