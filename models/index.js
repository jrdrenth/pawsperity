// import models
const Pet = require('./Pet');
const PetType = require('./PetType');
const Service = require('./Visits/Service');
const ServiceCategory = require('./Visits/ServiceCategory');
const ServiceProvided = require('./Visits/ServiceProvided');
const ServiceProvider = require('./Visits/ServiceProvider');
const Todo = require('./Todo');
const User = require('./User');
const Visit = require('./Visits/Visit');


// User & Pet
User.hasMany(Pet, { foreignKey: 'owner_id' });
Pet.belongsTo(User, { foreignKey: 'owner_id' });

// Pet & PetType
PetType.hasMany(Pet, { foreignKey: 'pet_type_id' });
Pet.belongsTo(PetType, { foreignKey: 'pet_type_id' });

// User & Todo
User.hasMany(Todo, { foreignKey: 'user_id' });
Todo.belongsTo(User, { foreignKey: 'user_id' });

// Service & ServiceCategory
ServiceCategory.hasMany(Service, { foreignKey: 'service_category_id' });
Service.belongsTo(ServiceCategory, { foreignKey: 'service_category_id' });

// Visit
Pet.belongsToMany(ServiceProvider, { through: Visit, foreignKey: 'pet_id' });
ServiceProvider.belongsToMany(Pet, { through: Visit, foreignKey: 'service_provider_id' });

// ServiceProvided
Visit.belongsToMany(Service, { through: ServiceProvided, foreignKey: 'visit_id' });
Service.belongsToMany(Visit, { through: ServiceProvided, foreignKey: 'service_id' });


module.exports = {
  Pet,
  PetType,
  Service,
  ServiceCategory,
  ServiceProvided,
  ServiceProvider,
  Todo,
  User,
  Visit
};
