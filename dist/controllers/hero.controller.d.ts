import { Request, Response } from "express";
export declare const listHeroes: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getHero: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createHeroController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateHeroController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteHeroController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=hero.controller.d.ts.map