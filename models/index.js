const User = require('./User');
const Blog = require('./Blog');
//const Comment = require('./Comment');

User.hasMany(Blog, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'id'
});



module.exports = { User, Blog};
