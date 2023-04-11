import type { Request, Response } from "express";
import type { Context } from ".keystone/types";
import { createAuth } from "@keystone-6/auth";
import admin from 'firebase-admin';


export async function signin(req: Request, res: Response) {
  const { context } = req as typeof req & { context: Context };
  const input = req.body;
  try {
    var data = await context.graphql.raw({
      variables: { identity: input.email, secret: input.password },
      query: `
        mutation ($identity: String!, $secret: String!) {
            authenticate: authenticateUserWithPassword(
            email: $identity
            password: $secret
            ) {
            ... on UserAuthenticationWithPasswordSuccess {
                item {
                id
                __typename
                name
                email
                mobile
                }
                __typename
            }
            ... on UserAuthenticationWithPasswordFailure {
                message
                __typename
            }
            __typename
            }
        }    
        `,
    });
    if (
      (data as any).data.authenticate.__typename ===
      "UserAuthenticationWithPasswordSuccess"
    ) {
      console.log("ffo", (data as any).data.authenticate.__typename);
      data = (data as any).data.authenticate.item;
      // get token from firestore
      const payload = {
        userInfo: data,
        createdAt: new Date().valueOf(),
        lastUsedAt: new Date().valueOf()
      };
      const fireData = await admin.firestore().collection('tokens').add(payload);
      const token = (fireData as any)._path.segments[1];
      // const token = (fireData as any).token;
      res.json({ data, token: token + '/' + (data as any).id });
    } else {
      throw { message: "Wrong email or password" };
    }
  } catch (e) {
    console.error('error==========', e);
    const message = (e as Error).message;
    res.status(400).json({ message });
  }
}

export async function signup(req: Request, res: Response) {
  try {
    const { context } = req as typeof req & { context: Context };
    const input = req.body;
    const user = await context.db.User.createOne({
      data: {
        name: input.name,
        email: input.email,
        password: input.password,
        mobile: input.mobile,
      },
    });
    
    res.json({ data: { user } });
  } catch (e) {
    const message = (e as Error).message;
    if (
      message.toLocaleLowerCase().indexOf("email") > -1 &&
      message.toLocaleLowerCase().indexOf("unique") > -1
    ) {
      res.json({ message: "Email already exist" });
    } else {
      res.json({ message });
    }
  }
}
