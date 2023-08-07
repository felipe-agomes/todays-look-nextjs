import sequelize from '../connection';
import Clothe from './Clothe';
import ClotheSet from './ClotheSet';
import Set from './Set';
import User from './User';

User.hasMany(Clothe);
Clothe.belongsTo(User);

User.hasMany(Set);
Set.belongsTo(User);

Clothe.belongsToMany(Set, { through: ClotheSet });
Set.belongsToMany(Clothe, { through: ClotheSet });

export { User, Clothe, Set, ClotheSet };
