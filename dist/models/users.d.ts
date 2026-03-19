export type UserRecord = {
    id: number;
    nombre: string;
    email: string;
    password: string;
    created_at: Date;
};
export declare const findUserByEmail: (email: string) => Promise<UserRecord | undefined>;
export declare const findUserById: (id: number) => Promise<UserRecord | undefined>;
export declare const createUser: (payload: {
    nombre: string;
    email: string;
    password: string;
}) => Promise<number>;
//# sourceMappingURL=users.d.ts.map