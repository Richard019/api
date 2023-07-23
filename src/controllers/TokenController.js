import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credencias inválidas'],
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    const { id } = user;
    try {
      const token = await jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      return res.json({ token, user: { nome: user.nome, email, id } });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new TokenController();
