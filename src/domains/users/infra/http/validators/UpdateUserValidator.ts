import { Response, Request, NextFunction } from 'express';
import * as Yup from 'yup';

import AppError from '@shared/errors/AppError';
import getValidationErrors from '@shared/utils/getValidationErrors';

const updateUserValidator = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const userData = request.body;

  try {
    const userSchema = Yup.object().shape({
      name: Yup.string()
        .matches(
          /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/,
          'Insert a valid name without especials characters',
        )
        .required('Name is a required field.'),
      email: Yup.string()
        .email('Insert a valid email.')
        .required('Email is a required field.'),
      oldpassword: Yup.string().min(
        6,
        'At least 6 characters in the oldpassword field',
      ),
      password: Yup.string().min(
        6,
        'At least 6 characters in the password field',
      ),
      password_confirmation: Yup.string()
        .oneOf(
          [Yup.ref('password')],
          'Password and password_confirmation must be equals',
        )
        .min(6, 'At least 6 characters in the password_confirmation field'),
    });

    await userSchema.validate(userData, { abortEarly: false });

    return next();
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors = getValidationErrors(error);

      return response.status(401).json({ status: 'error', errors });
    }
    throw new AppError('An error occurred while validating user data.', 401);
  }
};

export default updateUserValidator;
