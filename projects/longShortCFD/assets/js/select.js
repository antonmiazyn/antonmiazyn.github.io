let select = document.querySelectorAll(".hero__account-form .select-input");
let value = document.querySelectorAll(".hero__account-form .select-input .select-input_value");
let flag = document.querySelector(".hero__account-form .select-input .select-input_flag img");
let selection = document.querySelectorAll(".hero__account-form .select-selection");
let caret = document.querySelectorAll(".select-input .select-caret");

for(let i = 0; i < select.length; i++) {
  select[i].onclick = () => {
    if(caret[i].classList.contains("open")) {
      selection.forEach((item, i) => {
        item.classList.add("hidden");
      });
      caret[i].classList.remove("open");
      caret[i].classList.add("close");
      selection[i].classList.remove("hidden");
    } else if(caret[i].classList.contains("close")) {
      selection.forEach((item, i) => {
        item.classList.add("hidden");
      });
      caret[i].classList.remove("close");
      caret[i].classList.add("open");
    }
  }

  let codes = ["375", "38", "7", "48"];
  let countries = ["belarus", "ukraine", "russia", "poland"];

  select[1].onclick = () => {
    if(caret[1].classList.contains("open")) {
      selection.forEach((item, i) => {
        item.classList.add("hidden");
      });
      caret[1].classList.remove("open");
      caret[1].classList.add("close");
      selection[1].classList.remove("hidden");
    } else if(caret[1].classList.contains("close")) {
      selection.forEach((item, i) => {
        item.classList.add("hidden");
      });
      caret[1].classList.remove("close");
      caret[1].classList.add("open");
    }
  }

  for(let j = 0; j < (selection[i].children).length; j++) {
    selection[i].children[j].onclick = () => {
      value[i].innerHTML = selection[i].children[j].textContent;
    }
    for(let l = 0; l < (selection[1].children).length; l++) {
      selection[1].children[l].onclick = () => {
        value[1].innerHTML = selection[1].children[l].textContent;
        value[2].innerHTML = "+" + codes[l];
        flag.src = "../../assets/img/flag/flag_" + countries[l] + ".png";
      }
    }
    for(let k = 0; k < (selection[2].children).length; k++) {
      selection[2].children[k].onclick = () => {
        value[2].innerHTML = selection[2].children[k].textContent;
        value[1].innerHTML = selection[1].children[k].textContent;
        flag.src = "../../assets/img/flag/flag_" + countries[k] + ".png";
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
