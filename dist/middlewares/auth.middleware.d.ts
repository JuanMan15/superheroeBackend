import { NextFunction, Request, Response } from "express";
export type RequestWithUser = Request & {
    user?: {
        id: number;
        email: string;
    };
};
export declare const authMiddleware: (req: RequestWithUser, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.middleware.d.ts.map