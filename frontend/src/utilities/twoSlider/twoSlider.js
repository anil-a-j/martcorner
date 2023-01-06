export const twoSliderX = (e) => {
  if (e.target.classList.contains("active")) {
    return false;
  } else {
    if (e.target.previousElementSibling)
      e.target.previousElementSibling.classList.remove("active");
    if (e.target.nextElementSibling)
      e.target.nextElementSibling.classList.remove("active");
    e.target.classList.add("active");
  }

  if (e.target.previousElementSibling) {
    e.target.parentElement.parentElement.children[0].style.transform =
      "translateX(-100%)";
    e.target.parentElement.parentElement.children[1].style.transform =
      "translateX(-100%)";
  }
  if (e.target.nextElementSibling) {
    e.target.parentElement.parentElement.children[0].style.transform =
      "translateX(0%)";
    e.target.parentElement.parentElement.children[1].style.transform =
      "translateX(0%)";
  }
};

export const twoSliderY = (e) => {
  if (e.target.classList.contains("active")) {
    return false;
  } else {
    if (e.target.previousElementSibling)
      e.target.previousElementSibling.classList.remove("active");
    if (e.target.nextElementSibling)
      e.target.nextElementSibling.classList.remove("active");
    e.target.classList.add("active");
  }

  if (e.target.previousElementSibling) {
    e.target.parentElement.parentElement.children[0].style.transform =
      "translateY(-100%)";
    e.target.parentElement.parentElement.children[1].style.transform =
      "translateY(-100%)";
  }
  if (e.target.nextElementSibling) {
    e.target.parentElement.parentElement.children[0].style.transform =
      "translateY(0%)";
    e.target.parentElement.parentElement.children[1].style.transform =
      "translateY(0%)";
  }
};
