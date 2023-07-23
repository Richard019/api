import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const alunoData = await User.findAll();
      return res.json({ alunoData });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        errors: ['Credenciais inválidas'],
      });
    }

    try {
      const alunoData = await User.create(req.body);
      return res.json({ alunoData });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.json({
          errors: ['Usuário não encontrado'],
        });
      }

      const updated = await user.update(req.body);
      return res.json({ updated });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.json({
          errors: ['Usuário não encontrado'],
        });
      }
      const deleted = await user.destroy({ where: { id: req.user.id } });
      return res.json({ deleted });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
