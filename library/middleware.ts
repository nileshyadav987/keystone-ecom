import admin from 'firebase-admin';
import type { Request, Response } from 'express';

export const validateToken = async (req: Request, res: Response, next: any) => {
    
    const token = req.headers['token'];
    try {
        if(token) {
            console.log('token here', token);
            const fireData = await admin.firestore().collection('tokens').doc((token as string).split("/")[0]).get();
            const data = (fireData as any).data();
            if(data === undefined) {
                throw "";
            } else {
                if((token as string).split("/")[1] === data.userInfo.id) {
                    res.locals.user = data.userInfo.id;
                    next();
                } else {
                    throw "";
                }
            }
        } else {
            throw "";
        }
    } catch(e){
        console.error('error', e);
        res.status(500).json({ message: 'Token error' });
    }
}
