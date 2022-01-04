// import * as timeago from "timeago.js";

const form = document.querySelector("form");
const loading = document.querySelector(".loading");
const API_URL = "http://localhost:5000/tweets";
loading.style.display = "";
const tweetAll = document.querySelector(".all-tweets");

getAllTweets();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submitted");
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");

  const tweet = {
    name,
    content,
  };

  form.style.display = "none";
  loading.style.display = "";

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(tweet),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((createdtweet) => {
      console.log(createdtweet);
      form.reset();
      form.style.display = "";
      getAllTweets();
      loading.style.display = "none";
    });
});
function getAllTweets() {
  tweetAll.innerHTML = "";
  fetch(API_URL)
    .then((respons) => respons.json())
    .then((createdtweet) => {
      createdtweet.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      });

      createdtweet.forEach((tweet) => {
        const div = document.createElement("div");

        const header = document.createElement("h3");
        header.textContent = tweet.name;
        const contents = document.createElement("p");
        contents.textContent = tweet.content;
        const data = document.createElement("small");

        data.textContent = tweet.createdAt;

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(data);
        tweetAll.appendChild(div);
      });
      loading.style.display = "none";
      console.log(createdtweet);
    });
}
