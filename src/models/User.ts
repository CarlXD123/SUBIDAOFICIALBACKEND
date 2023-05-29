import { DataTypes, ModelDefined, Optional} from "sequelize";
import db from '../config/config.database'

export type UserAtributos={
    id:number,
    username:string,
    password:string,
    urlAvatar:string,
    status:string
}
type UserCreationAttributes = Optional<UserAtributos, 'id'>;

const User : ModelDefined<UserAtributos,UserCreationAttributes>= db.define("User", {
          username: {
            type: DataTypes.STRING,
            unique: {
            name:'username',
              msg: "Correo ya existe",
            },
            validate: {
              isEmail: {
                msg: "Correo no valido",
              },
              notEmpty: {
                msg: "Correo obligatorio",
              },
            },
          },
          password: {
            type: DataTypes.STRING,
            validate: {
              notEmpty: {
                msg: "Contraseña no puede ser vacía",
              },
              len: {
                args: [4, 12],
                msg: "Contraseña debe tener entre 4 y 12 caracteres",
              },
            },
          },
          urlAvatar: {
            type: DataTypes.STRING(2000),
            defaultValue:  "src/public/imgs/avatar/avatardefault.png",
          },
          status: {
            defaultValue: "A",
            type: DataTypes.STRING(1),
          },
        });
      
         /* User.hasOne(models.Client);
          User.hasOne(models.Employee);
          User.hasMany(models.Token);
          User.belongsToMany(models.Role, {
            through: "UserRole",
          });
     */
      
        User.addScope(
          "defaultScope",
          {
            where: { status: "A" },
            order: [["id", "ASC"]],
          },
          { override: true }
        );
      
      


export default User;