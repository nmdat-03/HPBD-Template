function setVh() {
  const vh = window.visualViewport
    ? window.visualViewport.height * 0.01
    : window.innerHeight * 0.01;

  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setVh();

if (window.visualViewport) {
  visualViewport.addEventListener("resize", setVh);
  visualViewport.addEventListener("scroll", setVh);
} else {
  window.addEventListener("resize", setVh);
}

let datetxt = "10 / 01 / 2026";
let charArrDate = datetxt.split("");
let currentIndex = 0;
let date__of__birth = document.querySelector(".date__of__birth span");

setTimeout(function () {
  timeDatetxt = setInterval(function () {
    if (currentIndex < charArrDate.length) {
      date__of__birth.textContent += charArrDate[currentIndex];
      currentIndex++;
    } else {
      let i = document.createElement("i");
      i.className = "fa-solid fa-star";
      document.querySelector(".date__of__birth").prepend(i);
      document.querySelector(".date__of__birth").appendChild(i.cloneNode(true));
      clearInterval(timeDatetxt);
    }
  }, 100);
}, 12000);

let mailBox = document.querySelector(".mail");
let boxmail = document.querySelector(".boxMail");
let mailContainer = document.querySelector(".boxMail-container");
let closeBtn = document.querySelector(".fa-xmark");

let OPEN_DELAY = 2500;
let isMailOpened = false;

mailBox.addEventListener("click", function () {
  boxmail.classList.add("active");

  if (isMailOpened) return;
  isMailOpened = true;

  setTimeout(() => {
    boxmail.classList.add("open");

    music.currentTime = 0;
    music.play();
    musicBtn.classList.add("playing");
    musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;

    setTimeout(startTyping, OPEN_DELAY);
  }, 3000);
});

closeBtn.addEventListener("click", function (e) {
  e.stopPropagation();

  boxmail.classList.remove("active");
  boxmail.classList.remove("open");
  isMailOpened = false;
  resetTyping();

  music.pause();
  music.currentTime = 0;
  musicBtn.classList.remove("playing");
  musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
  isPlaying = false;
});

/* ------------------------------------------ */
/*              MUSIC BUTTON                  */
/* ------------------------------------------ */
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    musicBtn.classList.add("playing");
    musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
    musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
  }
  isPlaying = !isPlaying;
});

/* ------------------------------------------ */
/*              CARD CONTENT                  */
/* ------------------------------------------ */
const titleText = "Đến: name 💖";
const bodyText = `Chúc em tuổi mới luôn xinh đẹp, rạng rỡ, và thật tự tin trên con đường mà mình đã chọn.

Mong rằng tuổi mới sẽ mang đến cho em thật nhiều niềm vui, những điều bất ngờ ngọt ngào, và mọi ước mơ của em sẽ sớm thành hiện thực. Happy birthday 🎉`;

const titleBox = document.querySelector(".title-text");
const bodyBox = document.querySelector(".body-text");
const titleCursor = document.querySelector(".title-cursor");
const bodyCursor = document.querySelector(".body-cursor");

let ti = 0,
  bi = 0;
let TITLE_SPEED = 150;
let BODY_SPEED = 60;
let SWITCH_DELAY = 800;
let titleInterval, bodyInterval;

function resetTyping() {
  clearInterval(titleInterval);
  clearInterval(bodyInterval);
  clearInterval(signatureInterval);

  ti = bi = si = 0;

  titleBox.textContent = "";
  bodyBox.textContent = "";
  document.querySelector(".typing-signature").textContent = "";

  if (!document.querySelector(".title-cursor")) {
    document.querySelector(".typing-title").appendChild(titleCursor);
  }

  bodyCursor.style.display = "none";
  document.querySelector(".signature-cursor").style.display = "none";
}

function startTyping() {
  resetTyping();

  titleInterval = setInterval(() => {
    if (ti < titleText.length) {
      titleBox.textContent += titleText.charAt(ti++);
    } else {
      clearInterval(titleInterval);
      titleCursor.remove();
      setTimeout(startBody, SWITCH_DELAY);
    }
  }, TITLE_SPEED);
}

function startBody() {
  bodyCursor.style.display = "inline";
  bodyInterval = setInterval(() => {
    if (bi < bodyText.length) {
      bodyBox.textContent += bodyText.charAt(bi++);
    } else {
      clearInterval(bodyInterval);
      bodyCursor.style.display = "none";
      startSignature();
    }
  }, BODY_SPEED);
}

const signatureText = "— Minh Đạt —";
let si = 0;
let signatureInterval;

function startSignature() {
  clearInterval(signatureInterval);

  const sigBox = document.querySelector(".typing-signature");
  const sigCursor = document.querySelector(".signature-cursor");
  sigCursor.style.display = "inline";

  signatureInterval = setInterval(() => {
    if (si < signatureText.length) {
      sigBox.textContent += signatureText.charAt(si++);
    } else {
      clearInterval(signatureInterval);
      sigCursor.style.display = "none";
    }
  }, 120);
}

/* ------------------------------------------ */
/*           BACKGROUND HEART EFFECT          */
/* ------------------------------------------ */
function createHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.innerHTML = "❤";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = Math.random() * 14 + 12 + "px";
  h.style.animationDuration = Math.random() * 4 + 6 + "s";
  document.getElementById("heart-layer").appendChild(h);
  setTimeout(() => h.remove(), 10000);
}
if (window.innerWidth < 768) {
  setInterval(createHeart, 900); // mobile
} else {
  setInterval(createHeart, 400); // desktop
}

/* ------------------------------------------ */
/*           BACKGROUND STAR EFFECT           */
/* ------------------------------------------ */
const c = document.getElementById("stars"),
  ctx = c.getContext("2d");

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  c.width = innerWidth * dpr;
  c.height = innerHeight * dpr;
  c.style.width = innerWidth + "px";
  c.style.height = innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let stars = [];
let starCount = window.innerWidth < 768 ? 60 : 150;
for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    r: Math.random() * 1.5,
    s: Math.random() * 0.5 + 0.2,
  });
}

function drawStars() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.s;
    if (star.y > c.height) {
      star.y = 0;
      star.x = Math.random() * c.width;
    }
  });
  requestAnimationFrame(drawStars);
}
drawStars();

