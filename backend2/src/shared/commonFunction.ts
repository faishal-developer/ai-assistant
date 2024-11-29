import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../config/config';

export const calcSkip=(page:string | undefined,limit:string | undefined)=>{
    let newPage=Number(page || 1);
    let newLimit=Number(limit || 10);
    return {
        page:newPage,
        limit:newLimit,
        skip:(newPage-1)*newLimit
    }
}

export const generateAccessToken = (
  payload: Record<string, unknown>
): string => {
  return jwt.sign(payload, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expires_in,
  });
};

export const generateRefreashToken = (
  payload: Record<string, unknown>
): string => {
  return jwt.sign(payload, config.jwt.refresh_secret as Secret, {
    expiresIn: config.jwt.refresh_expires_in,
  });
};

export const  verifyAccessToken=(token:string):JwtPayload=>{
    return jwt.verify(token,config.jwt.secret as Secret) as JwtPayload;
}
export const  verifyRefreshToken=(token:string):JwtPayload=>{
    return jwt.verify(token,config.jwt.refresh_secret as Secret) as JwtPayload;
}