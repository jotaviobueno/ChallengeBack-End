import repository from '../../repository/client/login.repository.js';
import sharedRepository from '../../repository/shared/sharedServices.repository.js';

class login {
    async newSession (req, res) {
      const { email, password } = req.body;

      await sharedRepository.validateSession();

      if (await sharedRepository.existUser(email))
      return res.status(400).json({
        error: {
            status: 400,
            error: true,
            info: {
             data: `non-existent user`
            } 
         }
      });

      if (! await repository.comparePassword(email, password))
      return res.status(400).json({
        error: {
            status: 400,
            error: true,
            info: {
             data: `invalid password`
            } 
         }
      });

      const getSessionToken = await repository.createSession(email);
      return res.status(200).json({
        success: {
            status: 200,
            error: false,
            info: {
             data: `Session Created`,
             token: getSessionToken
            } 
         }
      });
    }
}

export default new login();