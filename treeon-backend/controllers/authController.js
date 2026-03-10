const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const donorModel = require('../models/donorModel');
const farmerModel = require('../models/farmerModel');
const emailService = require('../services/emailService');

/**
 * Register a new user (donor or farmer)
 */
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await userModel.create({
      email,
      passwordHash,
      firstName,
      lastName,
      role,
    });

    // Create role-specific record
    if (role === 'donor') {
      await donorModel.create({ donorId: user.user_id, isAnonymous: false });
    } else if (role === 'farmer') {
      await farmerModel.create({ farmerId: user.user_id });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.user_id, role: user.user_role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    // Send welcome email (optional)
    await emailService.sendWelcome(user.email, user.first_name);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.user_role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user.user_id, role: user.user_role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.user_role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout (optional – simply discard token on client side)
 */
exports.logout = (req, res) => {
  res.json({ message: 'Logged out' });
};

/**
 * Refresh access token (requires valid refresh token strategy – here we just issue new token)
 */
exports.refreshToken = async (req, res, next) => {
  try {
    const userId = req.user.userId; // set by authenticate middleware
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const token = jwt.sign(
      { userId: user.user_id, role: user.user_role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

/**
 * Forgot password – sends reset link via email
 */
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user) {
      // Don't reveal whether email exists
      return res.json({ message: 'If that email is registered, a reset link will be sent.' });
    }

    // Generate password reset token (short-lived)
    const resetToken = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Store token in database (or use a separate password_resets table)
    await userModel.storeResetToken(user.user_id, resetToken);

    // Send email with reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    await emailService.sendPasswordReset(user.email, resetLink);

    res.json({ message: 'If that email is registered, a reset link will be sent.' });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset password using token
 */
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check token in database (optional extra validation)
    const storedToken = await userModel.getResetToken(user.user_id);
    if (storedToken !== token) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    // Update password
    await userModel.updatePassword(user.user_id, passwordHash);
    await userModel.clearResetToken(user.user_id);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};