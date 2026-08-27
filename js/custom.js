// visual

$(function () {
  let i = 0;

  const $visual = $(".visual-fade li");
  const $menus = $(".visual-menu-list");
  const $titles = $(".visual-menu-title h3");
  const $line = $(".visual-line");

  // 초기
  $visual.hide().eq(0).show();
  $menus.hide().eq(0).css("display", "flex");

  $titles.removeClass("active").eq(0).addClass("active");

  $line.addClass("on");

  setInterval(function () {
    i = (i + 1) % $visual.length;

    // 이미지
    $visual.stop(true, true).fadeOut();
    $visual.eq(i).stop(true, true).fadeIn();

    // 메뉴
    $menus.hide().eq(i).css("display", "flex");

    // 제목
    $titles.removeClass("active").eq(i).addClass("active");

    // 선 애니메이션 다시 실행
    $line.removeClass("on");

    setTimeout(function () {
      $line.addClass("on");
    }, 30);
  }, 3000);
});

// notice
const items = document.querySelectorAll(".slide-item");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const pauseBtn = document.querySelector(".pause");

const currentText = document.querySelector(".current");
const totalText = document.querySelector(".total");

let currentIndex = 0;
let isPlaying = true;

totalText.textContent = String(items.length).padStart(2, "0");

function updateSlide(index) {
  items.forEach((item) => item.classList.remove("active"));
  items[index].classList.add("active");

  currentText.textContent = String(index + 1).padStart(2, "0");
}

function nextSlide() {
  currentIndex++;
  if (currentIndex >= items.length) currentIndex = 0;
  updateSlide(currentIndex);
}

function prevSlide() {
  currentIndex--;
  if (currentIndex < 0) currentIndex = items.length - 1;
  updateSlide(currentIndex);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

let autoSlide = setInterval(nextSlide, 3000);

pauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    clearInterval(autoSlide);
    pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    autoSlide = setInterval(nextSlide, 3000);
    pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }

  isPlaying = !isPlaying;
});

// banner

const bannerList = document.querySelector(".banner-slide ul");
const bannerItems = document.querySelectorAll(".banner-slide li");

// 첫 번째 li 가져오기, 요소의 실제 너비 가져오기 + gap
const itemWidth = bannerItems[0].offsetWidth + 32;

// banner 버튼
const bannerNextBtn = document.querySelector(".banner-next");
const bannerPrevBtn = document.querySelector(".banner-prev");
const bannerPauseBtn = document.querySelector(".banner-pause");

// 다음
function nextBanner() {
  bannerList.style.transition = "0.5s ease";
  bannerList.style.transform = `translateX(-${itemWidth}px)`;

  // 시간 지연 -> 안에 있는 코드를 일정 시간 뒤에 실행
  setTimeout(() => {
    // 첫 번째 li를 ul 맨 뒤로 보내기
    bannerList.appendChild(bannerList.firstElementChild);

    bannerList.style.transition = "none";
    bannerList.style.transform = "translateX(0)";
  }, 500);
}

// 이전
function prevBanner() {
  // 마지막 li를 ul 맨 앞으로 보내기
  bannerList.prepend(bannerList.lastElementChild);

  // 애니메이션 없이 왼쪽으로 이동
  bannerList.style.transition = "none";
  bannerList.style.transform = `translateX(-${itemWidth}px)`;

  // 브라우저에 위치 적용
  bannerList.offsetHeight;

  // 다시 원래 위치까지 슬라이드
  bannerList.style.transition = "0.5s ease";
  bannerList.style.transform = "translateX(0)";
}

// 버튼 클릭
bannerNextBtn.addEventListener("click", nextBanner);
bannerPrevBtn.addEventListener("click", prevBanner);

// 자동 실행
let autoBanner = setInterval(nextBanner, 3000);

// 일시정지 / 재생
bannerPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    clearInterval(autoBanner);
    bannerPauseBtn.classList.replace("fa-circle-pause", "fa-circle-play");
  } else {
    autoBanner = setInterval(nextBanner, 3000);
    bannerPauseBtn.classList.replace("fa-circle-play", "fa-circle-pause");
  }

  isPlaying = !isPlaying;
});
