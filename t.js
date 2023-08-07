const User = require('./src/models/Postegre/Tables/User');
const Clothe = require('./src/models/Postegre/Tables/Clothe');
const Set = require('./src/models/Postegre/Tables/Set');

(async () => {
	User.hasMany(Clothe);
	Clothe.belongsTo(User);
	User.hasMany(Set);
	Set.belongsTo(User);
	await sequelize.sync({ force: true });
})();
