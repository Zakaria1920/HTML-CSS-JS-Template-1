// ******* Left Side Start *******
//    ******* Header *******

let ligth = document.querySelector(".light");
window.onscroll = () => {
  let scrollTop = window.scrollY;
  if (scrollTop >= 10) {
    ligth.style.marginTop = "-10px"; // Change the value as needed
  } else {
    ligth.style.marginTop = "0";
  }
};

let darkMode = document.querySelector(".light i");
darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

//    ******* Calender *******

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".calendar-dates");

const currdate = document.querySelector(".calendar-current-date");

const prev = document.querySelector("#calendar-prev");

const next = document.querySelector("#calendar-next");

const prevMon = document.querySelector(".prev-mon");

const nextMon = document.querySelector(".next-mon");

const today = document.querySelector(".today");
// Array of month names
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const manipulate = () => {
  let dayone = new Date(year, month, 1).getDay();

  let lastdate = new Date(year, month + 1, 0).getDate();

  let dayend = new Date(year, month, lastdate).getDay();

  let monthlastdate = new Date(year, month, 0).getDate();

  let lit = "";

  for (let i = dayone; i > 0; i--) {
    lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
  }

  for (let i = 1; i <= lastdate; i++) {
    let isToday =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "active"
        : "";
    lit += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = dayend; i < 6; i++) {
    lit += `<li class="inactive">${i - dayend + 1}</li>`;
  }

  currdate.innerText = `${months[month]} ${year}`;

  day.innerHTML = lit;

  if (month - 1 === -1) {
    prevMon.innerText = months[months.length - 1];
  } else {
    prevMon.innerText = months[month - 1];
  }

  if (month + 1 === 12) {
    nextMon.innerText = months[0];
  } else {
    nextMon.innerText = months[month + 1];
  }
};

manipulate();

// Attach a click event listener to each icon
prev.addEventListener("click", () => {
  // Check if the icon is "calendar-prev"
  // or "calendar-next"
  month = month - 1;

  // Check if the month is out of range
  if (month < 0) {
    // Set the date to the first day of the
    // month with the new year
    date = new Date(year, month, new Date().getDate());

    // Set the year to the new year
    year = date.getFullYear();

    // Set the month to the new month
    month = date.getMonth();
  } else {
    // Set the date to the current date
    date = new Date();
  }

  // Call the manipulate function to
  // update the calendar display
  manipulate();
});

next.addEventListener("click", () => {
  // Check if the icon is "calendar-prev"
  // or "calendar-next"
  month = month + 1;

  // Check if the month is out of range
  if (month > 11) {
    // Set the date to the first day of the
    // month with the new year
    date = new Date(year, month, new Date().getDate());

    // Set the year to the new year
    year = date.getFullYear();

    // Set the month to the new month
    month = date.getMonth();
  } else {
    // Set the date to the current date
    date = new Date();
  }

  // Call the manipulate function to
  // update the calendar display
  manipulate();
});

day.addEventListener("click", (event) => {
  const clickedElement = event.target;

  if (
    clickedElement.tagName === "LI" &&
    !clickedElement.classList.contains("inactive")
  ) {
    const lis = document.querySelectorAll(".calendar-dates li");

    lis.forEach((li) => {
      li.classList.remove("active");
    });

    clickedElement.classList.add("active");
  }
});

today.addEventListener("click", () => {
  date = new Date();
  year = date.getFullYear();
  month = date.getMonth();
  manipulate();
});
//    ******* Calender *******
// ******* Left Side End *******

// ******* Middle Side Start *******
//     ******* Slider *******

let currSlide = 0;
const dots = document.querySelectorAll(".dots .dot");
const images = document.querySelector("ul.images");
const imgs = document.querySelectorAll("ul.images img");

let isDragging = false,
  startPosi = 0,
  currentTran = 0,
  prevTrans = 0,
  animationID = 0,
  currentIndex = 0;

imgs.forEach((img, index) => {
  img.addEventListener("dragstart", (e) => e.preventDefault());

  // Touch events
  img.addEventListener("touchstart", touchStart(index));
  img.addEventListener("touchend", touchEnd);
  img.addEventListener("touchmove", touchMove);
});

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPosi = event.touches[0].pageX;
    isDragging = true;
    animationID = requestAnimationFrame(animation);
  };
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const moveBy = currentTran - prevTrans;

  if (moveBy < -100 && currentIndex < imgs.length - 1) currentIndex += 1;

  if (moveBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = event.touches[0].pageX;
    currentTran = prevTrans + currentPosition - startPosi;
  }
}

function animation() {
  setSliderPos();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPos() {
  images.style.transform = `translateX(${currentTran}px)`;
}

function setPositionByIndex() {
  currentTran = currentIndex * -parseInt(getComputedStyle(images).width);
  prevTrans = currentTran;
  setSliderPos();
  dotsFill();
}

function dotsFill() {
  dots.forEach((e) => {
    e.classList.remove("active");
  });
  dots[currentIndex].classList.add("active");
}

function slider() {
  if (parseInt(getComputedStyle(document.body).width) > 767) {
    images.style.transform = `translateX(-${
      currSlide * parseInt(getComputedStyle(imgs[0]).width)
    }px)`;

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
    dots[currSlide].classList.add("active");

    if (currSlide === imgs.length - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
  }
}
slider();
let inter = setInterval(slider, 2000);

dots.forEach((dot, ind) => {
  dot.addEventListener("click", () => {
    dots.forEach((e) => {
      e.classList.remove("active");
      dots[ind].classList.add("active");
    });
    currSlide = ind;
    slider();
    clearInterval(inter);
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".dots")) {
    clearInterval(inter);
    inter = setInterval(slider, 2000);
  }
});

//     ******* Slider *******

//     ******* Latest Posts *******

// hide/show text
const txtHide = document.querySelectorAll(".page-container .txt .hide");
const txtShow = document.querySelectorAll(".page-container .txt .show");
let hiddenText = document.querySelectorAll(".hiddenText");
let texts = [...hiddenText].map((txt) => txt.innerText);

function hideText(ind) {
  if (parseInt(getComputedStyle(document.body).width) < 767) {
    hiddenText[ind].innerText = `${hiddenText[ind].innerText.slice(0, 100)}...`;
  } else {
    hiddenText[ind].innerText = `${hiddenText[ind].innerText.slice(0, 160)}...`;
  }
  txtHide[ind].style.display = "none";
  txtShow[ind].style.display = "inline";
}

txtHide.forEach((icon, index) => {
  hideText(index);
});
function showText(ind) {
  hiddenText[ind].innerText = texts[ind];
  txtHide[ind].style.display = "inline";
  txtShow[ind].style.display = "none";
}
txtShow.forEach((icon, ind) => {
  icon.addEventListener("click", () => showText(ind));
});
txtHide.forEach((icon, ind) => {
  icon.addEventListener("click", () => hideText(ind));
});

// hide/show text end

// nums

const numsCont = document.querySelector(".numsContainter");

const container = document.querySelector(".latest-pos .page-container");
const rows = document.querySelector(".latest-pos .rows");
const pageNum = document.querySelector(".latest-pos .page-num");
const nums = document.querySelector(".latest-pos .page-num .nums");

let height = parseInt(getComputedStyle(container).height);
let rowCount = Math.round(parseInt(getComputedStyle(rows).height) / height);

function createNums() {
  let lit = "";
  for (let i = 1; i <= rowCount; i++) {
    let act =
      i === +JSON.parse(localStorage.getItem("currSpan")) ||
      (!JSON.parse(localStorage.getItem("currSpan")) && i === 1)
        ? "active"
        : "";
    lit += `<span class="${act}">${i}</span>`;
  }
  nums.innerHTML = lit;
  nums
    .querySelectorAll("span")
    .forEach((e) => e.addEventListener("dragstart", (e) => e.preventDefault()));
  nums
    .querySelectorAll("span")
    .forEach((e) =>
      e.addEventListener("selectstart", (e) => e.preventDefault())
    );
}
createNums();

let startPos = 0,
  currentTranslate = JSON.parse(localStorage.getItem("currTrans")) || 0;

nums.style.transform = `translateX(${currentTranslate}px)`;
nums.addEventListener("mousedown", startMove);
nums.addEventListener("dragstart", (e) => e.preventDefault());
document.addEventListener("mouseup", endMove);

function startMove(event) {
  startPos = event.pageX;
  nums.addEventListener("mousemove", clickMove);
}

function clickMove(event) {
  let spans = nums.querySelectorAll("span");
  let numWidth =
    parseInt(getComputedStyle(spans[0]).width) * spans.length +
    (spans.length - 1) * parseInt(getComputedStyle(nums).gap) -
    parseInt(getComputedStyle(numsCont).width);
  currentTranslate = Math.max(
    Math.min(
      event.pageX - startPos + +JSON.parse(localStorage.getItem("currTrans")),
      0
    ),
    -numWidth
  );
  nums.style.transform = `translateX(${currentTranslate}px)`;
}

function endMove() {
  isDragging = false;
  localStorage.setItem("currTrans", JSON.stringify(currentTranslate));
  nums.removeEventListener("mousemove", clickMove);
}

rows.style.transform = `translateY(-${
  JSON.parse(localStorage.getItem("currPage")) || 0
}px)`;

function changePage(ind) {
  localStorage.setItem("currPage", JSON.stringify(ind * height));
  rows.style.transform = `translateY(-${ind * height}px)`;
  nums.querySelectorAll("span").forEach((span, i) => {
    span.classList.toggle("active", i === ind);
  });
  localStorage.setItem("currSpan", JSON.stringify(ind + 1));
}

nums.querySelectorAll("span").forEach((span, ind) => {
  span.addEventListener("click", () => changePage(ind));
});
