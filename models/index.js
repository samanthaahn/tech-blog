const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'post',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post',
    onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };