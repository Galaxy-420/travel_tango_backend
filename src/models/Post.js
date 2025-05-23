const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./User");
const Tags = require("./Expense");

// Define the Post model
const Post = sequelize.define("Post", {
  title: { type: DataTypes.STRING, allowNull: false },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const formattedValue = value.trim().replace(/\s+/g, "-").toLowerCase();
      this.setDataValue("slug", formattedValue);
    },
  },
  content: { type: DataTypes.TEXT, allowNull: false },
  teaser: { type: DataTypes.TEXT, allowNull: false },
  cover_img: { type: DataTypes.STRING, allowNull: true },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: { type: DataTypes.STRING, allowNull: false },
  showOnHomePage: { type: DataTypes.BOOLEAN, defaultValue: true },
  comments: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  status: {
    type: DataTypes.ENUM("published", "draft", "archived"),
    allowNull: false,
    defaultValue: "draft",
  },
});

// Define associations
Post.belongsTo(User);
User.hasMany(Post);

Post.belongsToMany(Tags, { through: "PostTags" });
Tags.belongsToMany(Post, { through: "PostTags" });

module.exports = Post;
