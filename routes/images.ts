import type { Request, Response } from 'express';
import type { Context } from '.keystone/types';
import { validationResult } from "express-validator";
import { prepareToUpload } from '../library/prepareToUpload';
import fs from 'fs';
import FormData  from 'form-data';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { exampleValue } from '../test/@keystone-6/cloudinary/src/test-fixtures.skip';

export async function addImage(req: Request, res: Response) {
    try {
      const { context } = req as typeof req & { context: Context };
      
      const data = await context.db.Image.createOne({
        data: {
          attachment: exampleValue()
        },
      });
      res.json({ data });


    } catch (e) {
      console.error('rrr55', e);
      const message = (e as Error).message;
      return res.json({ message });
    }
  }
  

  // {"variables":{"data":{"attachment":null},"id":"clephibqv0079c4hhqhfqb948"},"query":"mutation ($data: ImageUpdateInput!, $id: ID!) {\n  item: updateImage(where: {id: $id}, data: $data) {\n    id\n    attachment {\n      id\n      filename\n      publicUrlTransformed(transformation: {width: \"120\", crop: \"limit\"})\n      __typename\n    }\n    __typename\n  }\n}"}
//   operations: {"variables":{"data":{"attachment":null},"id":"clephibqv0079c4hhqhfqb948"},"query":"mutation ($data: ImageUpdateInput!, $id: ID!) {\n  item: updateImage(where: {id: $id}, data: $data) {\n    id\n    attachment {\n      id\n      filename\n      publicUrlTransformed(transformation: {width: \"120\", crop: \"limit\"})\n      __typename\n    }\n    __typename\n  }\n}"}
// map: {"1":["variables.data.attachment"]}
// 1: (binary)

// {"variables":{"data":{"attachment":null}},"query":"mutation ($data: ImageCreateInput!) {\n  item: createImage(data: $data) {\n    id\n    label: id\n    __typename\n  }\n}"}
// map: {"1":["variables.data.attachment"]}
// 1: (binary)