const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

const db = require("../data/database");

class Post {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;

    if (id) {
      this._id = new ObjectId(id);
    }
  }

  async save() {
    if (!this._id) {
      const existingPost = await db
        .getDb()
        .collection("posts")
        .findOne({ _id: this._id });

      if (!existingPost) {
        // Adding New Post
        await db
          .getDb()
          .collection("posts")
          .insertOne({ title: this.title, content: this.content });
        return;
      }
    }

    // Updating existing post!
    await db
      .getDb()
      .collection("posts")
      .updateOne(
        { _id: this._id },
        { $set: { title: this.title, content: this.content } }
      );
    return;
  }

  async update(title, content, id) {
    this.title = title;
    this.content = content;
    this._id = !id ? this._id : id;
    await this.save();
    return;
  }

  async delete() {
    if (this._id) {
      await db.getDb().collection("posts").deleteOne({ _id: this._id });
    }
  }

  static async fetchAll() {
    return await db.getDb().collection("posts").find().toArray();
  }

  static async fetchOne(id) {
    if (id) {
      return await db
        .getDb()
        .collection("posts")
        .findOne({ _id: new ObjectId(id) });
    }
  }

  static async delete(id) {
    if (id) {
      await db
        .getDb()
        .collection("posts")
        .deleteOne({ _id: new ObjectId(id) });
    }
  }
}

module.exports = Post;
