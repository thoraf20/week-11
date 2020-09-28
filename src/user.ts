import Joi from "joi";

function validateUser(user: any) {
  let schema = Joi.object({
    username: Joi.string().required().min(6).max(50),
    email: Joi.string().email(),
    password: Joi.string().required().min(6).max(30),
  });
  return schema.validate(user);
}

function checkUser(user: any) {
  let schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required().min(6).max(30),
  });
  return schema.validate(user);

}
export {validateUser, checkUser};
