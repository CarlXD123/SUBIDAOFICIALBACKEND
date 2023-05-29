import { Router } from 'express';
//Importacion controller user
import cUser from '../controllers/cUser';

class UserRouter {
	public router: Router;
	constructor() {
		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get('/', cUser.getUsers);
		this.router.get('/menu/:user_id', cUser.getMenuForUser);
		this.router.get('/:userId', cUser.getUserById);
		this.router.get('/menu/mobile/:user_id', cUser.getMenuMobileForUser);
		this.router.get('/role/:user_id', cUser.getRolesByUser);
		this.router.get('/:user_id/remove_role/:role_id', cUser.removeUserRole);
		this.router.get('/valid/token/:userId/:token', cUser.validToken);

		this.router.put('/reset/password', cUser.resetPasswordUser);
		this.router.put('/:userId', cUser.updateUser);
		this.router.put('/role/:user_id', cUser.addUserRoles);

		this.router.post('/forgot/password', cUser.sendResetPassword);
		this.router.post('/employee', cUser.addEmployee);
		this.router.post('/client', cUser.addClient);
	}
}
const userRouter = new UserRouter();
export default userRouter.router;