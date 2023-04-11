import type { Request, Response } from 'express';
import type { Context } from '.keystone/types';
import { validationResult } from "express-validator";
import { prepareToUpload } from '../library/prepareToUpload';

export async function listProducts(req: Request, res: Response) {
    const { context } = req as typeof req & { context: Context };
    const data = await context.query.Product.findMany({
        query: `
            id
            title
            price
            source
            category {
                id
                title
            }
        `
    });
    res.json({data: data});
}

export async function addProduct(req: Request, res: Response) {
    try {
      const { context } = req as typeof req & { context: Context };

      var errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw { message: errors.array()[0].msg };
      } else {
        const input = req.body;
        console.log(req.files);
        return res.json({ data: 'nil' });
      }
    } catch (e) {
      console.error('rrr55', e);
      const message = (e as Error).message;
      return res.json({ message });
    }
  }
  