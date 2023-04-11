import type { Request, Response } from "express";
import type { Context } from ".keystone/types";

export async function listCategories(req: Request, res: Response) {
  const { context } = req as typeof req & { context: Context };
  console.log("current user is ", res.locals.user);
  const data = await context.db.Category.findMany({
    where: {
      author: { id: { equals: res.locals.user } }
    }
  });
  res.json({ data: data });
}
export async function addCategory(req: Request, res: Response) {
  try {
    const { context } = req as typeof req & { context: Context };
    const input = req.body;
    
    const data = await context.db.Category.createOne({
      data: {
        title: input.title,
        author: { connect: { id: res.locals.user } },
      },
    });
    res.json({ data });
  } catch (e) {
    const message = (e as Error).message;
    res.json({ message });
  }
}
