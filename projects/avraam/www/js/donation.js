let switchButtons = document.querySelectorAll(".donation__form button");
let switchInput = document.querySelectorAll(".donation__form input")[0];

//frequency

switchButtons[0].onclick = () => {
  switchButtons[0].classList.add("active");
  switchButtons[1].classList.remove("active");
  switchButtons[1].classList.add("unactive");
}

switchButtons[1].onclick = () => {
  switchButtons[1].classList.add("active");
  switchButtons[0].classList.remove("active");
  switchButtons[0].classList.add("unactive");
}

//amount

switchButtons[2].onclick = () => {
  switchButtons[2].classList.add("active");
  switchButtons[3].classList.remove("active");
  switchButtons[3].classList.add("unactive");
  switchButtons[4].classList.remove("active");
  switchButtons[4].classList.add("unactive");
  switchInput.value = "";
}

switchButtons[3].onclick = () => {
  switchButtons[3].classList.add("active");
  switchButtons[2].classList.remove("active");
  switchButtons[2].classList.add("unactive");
  switchButtons[4].classList.remove("active");
  switchButtons[4].classList.add("unactive");
  switchInput.value = "";
}

switchButtons[4].onclick = () => {
  switchButtons[4].classList.add("active");
  switchButtons[2].classList.remove("active");
  switchButtons[2].classList.add("unactive");
  switchButtons[3].classList.remove("active");
  switchButtons[3].classList.add("unactive");
  switchInput.value = "";
}

switchInput.onfocus = () => {
  for(let i = 2; i < 5; i++) {
    switchButtons[i].classList.remove("active");
    switchButtons[i].classList.add("unactive");
  }
}

//dropdown

let dropdownList = document.querySelector(".select__dropdown");
let dropdownArrow = document.querySelector(".select-arrow");
let dropdownButton = document.querySelector(".donation__form .select");
let choisesList = document.querySelectorAll(".select__dropdown div");
let selectedContent = document.querySelector(".donation__form .select span");

document.body.onclick = function (e) {
    e = e || event;
    target = e.target || e.srcElement;
    if (target.tagName == "BUTTON" && target.id == "select__dropdown" || target.tagName == "DIV" && target.id == "select__arrow") {
      if(getComputedStyle(dropdownList).display == "none") {
        dropdownList.style.display = "block";
        dropdownArrow.style.transform = "rotate(180deg)";
        dropdownArrow.style.top = "calc(50% - 10px)";
        dropdownButton.classList.add("active");
      } else {
        dropdownList.style.display = "none";
        dropdownArrow.style.transform = "rotate(0)";
        dropdownArrow.style.top = "calc(50% - 4px)";
        dropdownButton.classList.remove("active");
      }
    } else {
      dropdownList.style.display = "none";
      dropdownArrow.style.transform = "rotate(0)";
      dropdownArrow.style.top = "calc(50% - 4px)";
      dropdownButton.classList.remove("active");
    }
}

for(let i = 0; i < choisesList.length; i++) {
  choisesList[i].onclick = () => {
    selectedContent.innerHTML = choisesList[i].textContent;
  }
}
