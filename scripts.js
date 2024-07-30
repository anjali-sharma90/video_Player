"use strict";
/*get our elements	*/
const player = document.querySelector(".player ");
const playerVideo = document.querySelector(".player__video ");
const playPauseBtn = document.querySelector(".player__button ");
const video = document.querySelector(".player__video ");
const volSlider = document.querySelector(".player__slider__vol");
const rateSlider = document.querySelector(".player__slider__rate");
const skipButtons = document.querySelectorAll(".player__button");
const progressBar = document.querySelector(".progress__filled");
const screenSize = document.querySelector(".material-icons");
/*build our functions	*/
progressBar.style.flexBasis = "0%";
video.addEventListener("ended", function () {
  progressBar.style.width = "100%";
});
video.addEventListener("timeupdate", function () {
  const percentage = (video.currentTime / video.duration) * 100;
  // console.log(percentage);
  progressBar.style.flexBasis = `${percentage}%`;
});

//update the buttons
playPauseBtn.addEventListener("click", function () {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    video.pause();
    playPauseBtn.textContent = "▶️";
  }
});

//skip
skipButtons.forEach((skip) =>
  skip.addEventListener("click", function () {
    const skipValue = Number(skip.getAttribute("data-skip"));
    // console.log(skipValue);
    video.currentTime += skipValue;
  })
);

//handle range update

volSlider.addEventListener("input", function (e) {
  // console.log(e.target.value);
  const inputVol = e.target.value;
  video.volume = inputVol;
});

rateSlider.addEventListener("input", function (e) {
  // console.log(e.target.value);
  const inputRate = e.target.value;
  video.playbackRate = inputRate;
});

/*hook up the event listener	*/
screenSize.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    if (player.webkitRequestFullscreen()) {
      player.classList.add("fullscreen");
    } else {
      if (document.exitFullscreen) {
        document.webkitExitFullscreen();
        player.classList.remove("fullscreen");
      }
    }
  }
});

document.addEventListener("fullscreenchange", function () {
  if (document.fullscreenElement) {
    player.classList.add("fullscreen");
  } else {
    player.classList.remove("fullscreen");
  }
});

////EXTRA CHALLANGE TO FULL SCREEN
