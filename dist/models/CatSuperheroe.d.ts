export type HeroRecord = {
    id: number;
    nombre_heroe: string;
    nombre_real: string;
    universo: string;
    poder_principal: string;
    created_at: Date;
};
export declare const getAllHeroes: () => Promise<HeroRecord[]>;
export declare const getHeroById: (id: number) => Promise<HeroRecord | undefined>;
export declare const createHero: (payload: {
    nombre_heroe: string;
    nombre_real: string;
    universo: string;
    poder_principal: string;
}) => Promise<number>;
export declare const updateHero: (id: number, payload: Partial<{
    nombre_heroe: string;
    nombre_real: string;
    universo: string;
    poder_principal: string;
}>) => Promise<number>;
export declare const deleteHero: (id: number) => Promise<number>;
//# sourceMappingURL=CatSuperheroe.d.ts.map