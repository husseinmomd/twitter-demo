const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "config.env" });
const Tweet = require("./models/tweet");

const app = express();
const db = process.env.DB_URL;
mongoose
  .connect(db)
  .then(() => console.log("connected"))
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello");
});

function isValid(tweet) {
  return (
    tweet.name &&
    tweet.name.toString().trim() !== "" &&
    tweet.content &&
    tweet.content.toString().trim() !== ""
  );
}

app.get("/tweets", async (req, res) => {
  try {
    const allTweets = await Tweet.find({});
    return res.status(201).json(allTweets);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/tweets", async (req, res) => {
  if (isValid(req.body)) {
    const { name, content } = req.body;
    try {
      const createdtweet = await Tweet.create({
        name,
        content,
      });
      return res
        .status(201)
        .json({ msg: "tweet was sent succussfully", data: createdtweet });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ msg: err });
    }
  } else {
    res.status(422).json({ msg: "name and content are required !" });
  }
});
// app.post("/tweets", async (req, res) => {
//   if (isValid(req.body)) {
//     const { name, content } = req.body.toString();
//     try {
//       const tweet = await Tweet.create({
//         name,
//         content,
//       });
//       res.status(201).json(tweet);
//       console.log(tweet);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(422).json({
//       msg: "name and content are required !",
//     });
//   }
// });

app.listen(5000, () => {
  console.log("listenning at port 5000");
});
