// Skills percentage
let skillsSection = document.querySelector("#skills");
let progressSpans = document.querySelectorAll(
  "#skills .sliders .percentage span"
);

// Stats
let cards = document.querySelectorAll(".states h2");
let statsSection = document.querySelector(".states");
let started = false; // function not started

window.onscroll = () => {
  if (window.scrollY >= statsSection.offsetTop - 300) {
    if (!started) {
      cards.forEach((card) => startCount(card));
    }
    started = true;

    //skills
  } else if (window.scrollY >= skillsSection.offsetTop - 350) {
    progressSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};
// Stats Function
function startCount(ele) {
  let goal = ele.dataset.value;
  let count = setInterval(() => {
    ele.textContent++;
    if (ele.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}

// Events
let countdownDate = document.querySelectorAll(".events .countdown .time h2");
let date = new Date("Dec 8 2023 23:59:59").getTime();

let counter = setInterval(() => {
  let dateNow = new Date().getTime();
  let diffDate = date - dateNow;

  countdownDate[0] < 100
    ? (countdownDate[0].innerHTML =
        "0" + Math.floor(diffDate / (1000 * 60 * 60 * 24)))
    : Math.floor(diffDate / (1000 * 60 * 60 * 24));

  countdownDate[0].innerHTML = Math.floor(diffDate / (1000 * 60 * 60 * 24));

  if (countdownDate[0].innerText <= 10) {
    countdownDate[0].innerText =
      "0" + Math.floor(diffDate / (1000 * 60 * 60 * 24));
  } else {
    countdownDate[0].innerHTML = Math.floor(diffDate / (1000 * 60 * 60 * 24));
  }

  if (countdownDate[1].innerText <= 10) {
    countdownDate[1].innerText =
      "0" + Math.floor((diffDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  } else {
    countdownDate[1].innerHTML = Math.floor(
      (diffDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
  }

  if (countdownDate[2].innerText <= 10) {
    countdownDate[2].innerText =
      "0" + Math.floor((diffDate % (1000 * 60 * 60)) / (1000 * 60));
  } else {
    countdownDate[2].innerHTML = Math.floor(
      (diffDate % (1000 * 60 * 60)) / (1000 * 60)
    );
  }

  if (countdownDate[3].innerText <= 10) {
    countdownDate[3].innerText =
      "0" + Math.floor((diffDate % (1000 * 60)) / 1000);
  } else {
    countdownDate[3].innerHTML = Math.floor((diffDate % (1000 * 60)) / 1000);
  }

  if (diffDate < 0) clearInterval(counter);
}, 1000);

// Videos

let videoTitle = document.querySelector(".videos");
let description = document.querySelector(".video p");
let videoImg = document.querySelector(".video div");

function getVideos() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let videos = JSON.parse(this.responseText);
      videos.forEach((video) => {
        let image = video.image;
        console.log(image);
        video = `<div class="video-title">
        <h4>${video.title}</h4>
        <p>${video.time}</p>
        </div>`;
        videoTitle.innerHTML += video;
        let videoDiv = document.querySelectorAll(".video-title");
        let h4 = document.querySelectorAll(".video-title h4");
        videoDiv.forEach((video, index) => {
          video.onclick = () => {
            description.innerHTML = h4[index].innerHTML;
            h4[index].className = `<img src="images/cat-0${index + 1}.jpg" />`;
            videoImg.innerHTML = h4[index].className;
          };
        });
      });
    }
  };
  request.open("GET", "videos.json", true);
  request.send();
}

getVideos();
