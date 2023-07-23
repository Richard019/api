"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async index(req, res) {
    try {
      const alunoData = await _User2.default.findAll();
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
      const alunoData = await _User2.default.create(req.body);
      return res.json({ alunoData });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.user.id);

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
      const user = await _User2.default.findByPk(req.user.id);

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

exports. default = new UserController();
