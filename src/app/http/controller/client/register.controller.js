import repository from '../../repository/client/register.repository.js';
import sharedRepository from '../../repository/shared/sharedServices.repository.js';

class register {
    async registerUser (req, res) {
     const { full_name, email, password } = req.body;

      await sharedRepository.validateSession();

      if (! await sharedRepository.existUser(email))
      return res.status(400).json({
        error: {
           status: 400,
           error: true,
           info: {
            data: `non-existent user`
           } 
        }
     });

     await repository.registerClient(full_name, email, password);
     return res.status(201).json({
      success: {
           status: 201,
           error: false,
           info: {
            data: `account created`
           } 
        }
     });
    }
}

export default new register();