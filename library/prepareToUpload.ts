// prepareToUpload.ts
import mime from 'mime';
import fs from 'fs';
import path from 'path';
// import { graphqlUploadExpress } from 'graphql-upload';
// import Upload  from 'graphql-upload/Upload';
// import type { Upload } from "graphql-upload/Upload";
// import Upload from "graphql-upload/Upload.js";
// import { Upload } from 'graphql-upload';
// const Upload = require("graphql-upload/Upload.d.ts");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");

// import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

export const prepareToUpload = (filePath: string) => {
  const filename = path.basename(filePath)

  const createReadStream = () => fs.createReadStream(filePath)
  // @ts-ignore
  const mimetype = mime.getType(filePath)
  const encoding = 'utf-8'

  const image = {
    createReadStream,
    filename,
    mimetype,
    encoding,
  }

  const upload = new graphqlUploadExpress;
  // @ts-ignore
  upload.resolve(image)

  return upload
}