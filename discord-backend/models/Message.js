const { Schema, default: mongoose } = require("mongoose");

const messageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  date: { type: Date },
  type: { type: String },
});

module.exports = mongoose.model("Message", messageSchema);
