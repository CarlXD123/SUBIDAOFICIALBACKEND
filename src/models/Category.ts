import { DataTypes, ModelDefined, Optional } from 'sequelize';
import db from '../config/config.database'

export type CategoryAtributos = {
    id: number,
    name: string,
    description: string
};
type CategoryCreationAttributes = Optional<CategoryAtributos, 'id'>;
const Category: ModelDefined<CategoryAtributos, CategoryCreationAttributes> = db.define("Categories", {
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000)
});
    Category.addScope('defaultScope', {
        order: [['id', 'ASC']],
    }, { override: true });

export default Category;
