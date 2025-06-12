const jwt = require('jsonwebtoken');
const Users = require('../models/users'); // pakai model Sequelize
const transporter = require('../services/mailer');

exports.showLoginPage = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.send(`
        <script>
          alert('Email tidak terdaftar.');
          window.location.href = '/';
        </script>
      `);
    }

    if (user.password !== password) {
      return res.send(`
        <script>
          alert('Password salah.');
          window.location.href = '/';
        </script>
      `);
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/monitoring');
  } catch (err) {
    console.error(err);
    return res.send(`
      <script>
        alert('Terjadi kesalahan saat login.');
        window.location.href = '/';
      </script>
    `);
  }
};

exports.showHome = (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect('/');
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.render('v_monitoring'); // pastikan file ini ada di folder /views
  } catch {
    res.redirect('/');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};

exports.showForgotPasswordPage = (req, res) => {
  res.render('forgot-password');
};

exports.handleForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.send(`
        <script>
          alert('Email tidak terdaftar.');
          window.location.href = '/forgot-password';
        </script>
      `);
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const link = `http://localhost:${process.env.PORT}/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Password',
      html: `Klik link untuk reset password: <a href="${link}">${link}</a>`
    });

    return res.send(`
      <script>
        alert('Cek email untuk reset password.');
        window.location.href = '/';
      </script>
    `);
  } catch (err) {
    console.error(err);
    return res.send(`
      <script>
        alert('Terjadi kesalahan.');
        window.location.href = '/forgot-password';
      </script>
    `);
  }
};

exports.showResetPasswordPage = (req, res) => {
  const { token } = req.params;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.render('reset-password', { token });
  } catch {
    return res.send(`
      <script>
        alert('Token tidak valid.');
        window.location.href = '/forgot-password';
      </script>
    `);
  }
};

exports.handleResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await Users.update(
      { password },
      { where: { email: decoded.email } }
    );

    return res.send(`
      <script>
        alert('Password berhasil diubah.');
        window.location.href = '/';
      </script>
    `);
  } catch (err) {
    console.error(err);
    return res.send(`
      <script>
        alert('Token tidak valid.');
        window.location.href = '/forgot-password';
      </script>
    `);
  }
};
