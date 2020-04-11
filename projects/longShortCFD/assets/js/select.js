let codes = ["375", "38", "7", "48"];
let countries = ["belarus", "ukraine", "russia", "poland"];

/*=========================*/

let mainSelect = document.querySelectorAll(".hero__account-form .select-input");
let mainValue = document.querySelectorAll(".hero__account-form .select-input .select-input_value");
let mainFlag = document.querySelector(".hero__account-form .select-input .select-input_flag img");
let mainSelection = document.querySelectorAll(".hero__account-form .select-selection");
let mainCaret = document.querySelectorAll(".modal__account-form .select-input .select-caret");

for(let i = 0; i < mainSelect.length; i++) {
  mainSelect[i].onclick = () => {
    if(mainCaret[i].classList.contains("open")) {
      mainSelection.forEach((item, i) => {
        item.classList.add("hidden");
      });
      mainCaret[i].classList.remove("open");
      mainCaret[i].classList.add("close");
      mainSelection[i].classList.remove("hidden");
    } else if(mainCaret[i].classList.contains("close")) {
      mainSelection.forEach((item, i) => {
        item.classList.add("hidden");
      });
      mainCaret[i].classList.remove("close");
      mainCaret[i].classList.add("open");
    }
  }

  mainSelect[1].onclick = () => {
    if(mainCaret[1].classList.contains("open")) {
      mainSelection.forEach((item, i) => {
        item.classList.add("hidden");
      });
      mainCaret[1].classList.remove("open");
      mainCaret[1].classList.add("close");
      mainSelection[1].classList.remove("hidden");
    } else if(mainCaret[1].classList.contains("close")) {
      mainSelection.forEach((item, i) => {
        item.classList.add("hidden");
      });
      mainCaret[1].classList.remove("close");
      mainCaret[1].classList.add("open");
    }
  }

  for(let j = 0; j < (mainSelection[i].children).length; j++) {
    mainSelection[i].children[j].onclick = () => {
      mainValue[i].innerHTML = mainSelection[i].children[j].textContent;
    }
    for(let l = 0; l < (mainSelection[1].children).length; l++) {
      mainSelection[1].children[l].onclick = () => {
        mainValue[1].innerHTML = mainSelection[1].children[l].textContent;
        mainValue[2].innerHTML = "+" + codes[l];
        mainFlag.src = "../../assets/img/flag/flag_" + countries[l] + ".png";
      }
    }
    for(let k = 0; k < (mainSelection[2].children).length; k++) {
     mainSelection[2].children[k].onclick = () => {
        mainValue[2].innerHTML = mainSelection[2].children[k].textContent;
        mainValue[1].innerHTML = mainSelection[1].children[k].textContent;
        mainFlag.src = "../../assets/img/flag/flag_" + countries[k] + ".png";
      }
    }
  }
}

/*=========================*/

let modalSelect = document.querySelectorAll(".modal__account-form .select-input");
let modalValue = document.querySelectorAll(".modal__account-form .select-input .select-input_value");
let modalFlag = document.querySelector(".modal__account-form .select-input .select-input_flag img");
let modalSelection = document.querySelectorAll(".modal__account-form .select-selection");
let modalCaret = document.querySelectorAll(".modal__account-form .select-input .select-caret");

for(let i = 0; i < modalSelect.length; i++) {
  modalSelect[i].onclick = () => {
    if(modalCaret[i].classList.contains("open")) {
      modalSelection.forEach((item, i) => {
        item.classList.add("hidden");
      });
      modalCaret[i].classList.remove("open");
      modalCaret[i].classList.add("close");
      modalSelection[i].classList.remove("hidden");
    } else if(mainCaret[i].classList.contains("close")) {
      modalSelection.forEach((item, i) => {
        item.classList.add("hidden");
      });
      modalCaret[i].classList.remove("close");
      modalCaret[i].classList.add("open");
    }
  }

  modalSelect[1].onclick = () => {
    if(modalCaret[1].classList.contains("open")) {
      modalSelection.forEach((item, i) => {
        item.classList.add("hidden");
      });
      modalCaret[1].classList.remove("open");
      modalCaret[1].classList.add("close");
      modalSelection[1].classList.remove("hidden");
    } else if(modalCaret[1].classList.contains("close")) {
      modalSelection.forEach((item, i) => {
        item.classList.add("hidden");
      });
      modalCaret[1].classList.remove("close");
      modalCaret[1].classList.add("open");
    }
  }

  for(let j = 0; j < (modalSelection[i].children).length; j++) {
   modalSelection[i].children[j].onclick = () => {
      modalValue[i].innerHTML = modalSelection[i].children[j].textContent;
    }
    for(let l = 0; l < (modalSelection[1].children).length; l++) {
     modalSelection[1].children[l].onclick = () => {
        modalValue[1].innerHTML = modalSelection[1].children[l].textContent;
        modalValue[2].innerHTML = "+" + codes[l];
        modalFlag.src = "../../assets/img/flag/flag_" + countries[l] + ".png";
      }
    }
    for(let k = 0; k < modalSelection[2].children.length; k++) {
     modalSelection[2].children[k].onclick = () => {
        modalValue[2].innerHTML = modalSelection[2].children[k].textContent;
        modalValue[1].innerHTML = modalSelection[1].children[k].textContent;
        modalFlag.src = "../../assets/img/flag/flag_" + countries[k] + ".png";
      }
    }
  }
}

/*=========================*/

let optionButton = document.querySelectorAll(".option-input-state");
let optionMark = document.querySelectorAll(".option-input-mark");

for(let i = 0; i < optionButton.length; i++) {
  optionButton[i].onclick = () => {
    if(optionMark[i].classList.contains("hidden")) {
      optionMark[i].classList.remove("hidden");
      optionButton[i].classList.add("checked");
    } else {
      optionMark[i].classList.add("hidden");
      optionButton[i].classList.remove("checked");
    }
  }
}
