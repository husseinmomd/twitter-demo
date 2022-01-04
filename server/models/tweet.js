const mongoose = require("mongoose");

const TweetSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  },

  { timestamps: true }
);

const tweetModel = mongoose.model("tweet", TweetSchema);
module.exports = tweetModel;
