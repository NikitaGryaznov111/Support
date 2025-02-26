import jwt from 'jsonwebtoken';
export default class TokenService {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: '24h',
    });

    return { accessToken };
  }
}
