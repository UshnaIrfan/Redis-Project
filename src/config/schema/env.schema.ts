import * as Joi from 'joi';
export const envSchema = Joi.object({

  MONGO_URI: Joi.string().required().description('MongoDB URI'),
  REDIS_URL: Joi.string().required().description('Redis URI'),
  REDIS_USER: Joi.string().description('Redis user name'),
  REDIS_PASS: Joi.string().description('Redis user password'),


});