import { Request, Response } from "express";
import ExcelJS from "exceljs";
import jwt from "jsonwebtoken";
import { getAllHeroes } from "../models/CatSuperheroe";
import { listFavoritesByUser } from "../models/Favorite";

const extractUserId = (req: Request): number | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.split(" ")[1];
  if (!token) return null;
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return null;
  try {
    const decoded = jwt.verify(token, jwtSecret) as { id: number };
    return decoded.id ?? null;
  } catch {
    return null;
  }
};

export const exportHeroesToExcel = async (req: Request, res: Response) => {
  try {
    const heroes = await getAllHeroes();
    const userId = extractUserId(req);

    let favoriteIds: Set<number> = new Set();
    if (userId) {
      const favorites = await listFavoritesByUser(userId);
      favoriteIds = new Set(favorites.map((f) => f.hero_id));
    }

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Superhéroes App";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet("Superhéroes");

    worksheet.columns = [
      { header: "Nombre del Héroe", key: "nombre_heroe", width: 22 },
      { header: "Nombre Real", key: "nombre_real", width: 22 },
      { header: "Universo", key: "universo", width: 18 },
      { header: "Poder Principal", key: "poder_principal", width: 25 },
      { header: "Fortaleza", key: "fortaleza", width: 20 },
      { header: "Resistencia", key: "resistencia", width: 20 },
      { header: "Debilidad", key: "debilidad", width: 20 },
      { header: "Es Favorito", key: "esFavorito", width: 14 },
    ];

    for (const hero of heroes) {
      worksheet.addRow({
        nombre_heroe: hero.nombre_heroe,
        nombre_real: hero.nombre_real,
        universo: hero.universo,
        poder_principal: hero.poder_principal,
        fortaleza: hero.fortaleza ?? "",
        resistencia: hero.resistencia ?? "",
        debilidad: hero.debilidad ?? "",
        esFavorito: favoriteIds.has(hero.id) ? "Sí" : "No",
      });
    }

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 12 };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF3F51B5" },
    };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };
    headerRow.height = 30;

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.alignment = { vertical: "middle" };
        row.border = {
          top: { style: "thin", color: { argb: "FFD1D9E6" } },
          bottom: { style: "thin", color: { argb: "FFD1D9E6" } },
        };
      }
    });

    worksheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: 8 },
    };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=heroes.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al exportar a Excel", detalle: String(error) });
  }
};
