import repository from '../../../repository/client/ChangePassword/changePassword.repository.js';
import sharedRepository from '../../../repository/shared/sharedServices.repository.js';

class ChangePassword {
    
    async getToken (req, res) {
        const { email } = req.body;

        await repository.verifyAllTokens();
        await repository.verifyTokensForEmail(email);

        const getUserInfo = await repository.verifyClient(email)
        if (! getUserInfo)
        return res.status(400).json({
            error: {
               status: 400,
               error: true,
               info: {
                data: `non-existent user`
               } 
            }
        });

        const createToken = await repository.createToken(email);
        return res.status(400).json({
            success: {
               status: 200,
               error: false,
               info: {
                data: `token was sended to email`,
                token: createToken
               } 
            }
        });
    }

    async changePassword (req, res) {
        const {token} = req.params;
        const {newPassword} = req.body;

        const getTokenInfo = await repository.existToken(token);
        if (! getTokenInfo)
        return res.status(400).json({
            error: {
               status: 400,
               error: true,
               info: {
                data: `token not found`
               } 
            }
        });

        await repository.verifyAllTokens();
        await repository.verifyTokensForEmail(getTokenInfo.email);

        const getUserInfo = await repository.existUser(getTokenInfo.email);
        if (! getUserInfo)
        return res.status(400).json({
            error: {
               status: 400,
               error: true,
               info: {
                data: `token not found`
               } 
            }
        });

        if (await repository.verifyTokensForEmail(newPassword, getUserInfo.password))
        return res.status(400).json({
            error: {
               status: 400,
               error: true,
               info: {
                data: `password passed and same as already registered`
               } 
            }
        });
        
        await repository.changePassword(getUserInfo.email, newPassword, token);
        return res.status(200).json({
            success: {
               status: 200,
               error: false,
               info: {
                data: `changed password`
               } 
            }
        });

    }
}

export default new ChangePassword();

