export type FavoriteRecord = {
    id: number;
    user_id: number;
    hero_id: number;
    created_at: Date;
};
export declare const addFavorite: (userId: number, heroId: number) => Promise<number>;
export declare const listFavoritesByUser: (userId: number) => Promise<FavoriteRecord[]>;
export declare const removeFavorite: (userId: number, heroId: number) => Promise<number>;
//# sourceMappingURL=Favorite.d.ts.map