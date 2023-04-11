// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';

import bodyParser from "body-parser";


import { listCategories, addCategory } from './routes/categories';
import { listProducts, addProduct } from './routes/products';
import { signin, signup } from './routes/users';
import { addImage } from './routes/images';
import admin from 'firebase-admin';
import { validateToken } from './library/middleware';
import { newProduct } from './library/validate';


const serviceAccount = require("./google-firebase-admin-key.json");

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://swapnalekhmarath-1585149573340.firebaseio.com"
  });
}
  
export default withAuth(
  config({
    server: {
      port: 3001,

      extendExpressApp: (app, commonContext) => {
        // console.log('h889', bodyParser);
        
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        
        app.use('/rest', async (req, res, next) => {
          // console.log('nil876', req);
          (req as any).context = await commonContext.withRequest(req, res);
          next();
        });
  
        app.get('/rest/category/list', validateToken, listCategories);
        app.post('/rest/category/new', [validateToken], addCategory);
        app.get('/rest/product/list', validateToken, listProducts);
        app.post('/rest/product/new', [validateToken, newProduct], addProduct);
        app.post('/rest/image/add', [], addImage);
        app.post('/rest/user/signin', signin);
        app.post('/rest/user/signup', signup);
      },

    },
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: 'postgresql',
      // url: 'file:./keystone.db',
      url: 'postgres://postgres:123456@localhost:5432/shoprabbit'
    },
    lists,
    session,
  })
);
