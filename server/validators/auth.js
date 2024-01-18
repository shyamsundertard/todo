import { check } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import pkg from 'bcryptjs';
const { compare } = pkg;
const prisma = new PrismaClient();

// Email
const email = check('email')
  .isEmail()
  .withMessage('Please provide a valid email.');

  // firstName
  const firstName = check('firstName')
  .isLength({ min: 2, max: 30 })
  .withMessage('First name must be between 2 and 50 characters.');

// lastName
const lastName = check('lastName')
  .isLength({ min: 2, max: 20 })
  .withMessage('Last name must be between 2 and 50 characters.');

// Password
const password = check('password')
  .isLength({ min: 6, max: 15 })
  .withMessage('Password has to be between 6 and 15 characters.');

// Check if email exists
const emailExists = check('email').custom(async (value) => {
  const existingUser = await prisma.user.findUnique({ where: { email: value } });

  if (existingUser) {
    throw new Error('Email already exists.');
  }
});

// Login validation
const loginFieldsCheck = check('email').custom(async (value, { req }) => {
  const user = await prisma.user.findUnique({ where: { email: value } });

  if (!user) {
    throw new Error('Email does not exist.');
  }

  const loginPassword = req.body.password;

  const validPassword = await compare(loginPassword, user.password);

  if (!validPassword) {
    throw new Error('Wrong password');
  }
});

export const registerValidation = [email,firstName,lastName, password, emailExists];
export const loginValidation = [loginFieldsCheck];