const btnToogle = document.getElementById("btn-up");
const foo = document.getElementById("footer");
const inpC = document.getElementById("container-inp");
const heightTaskes = document.getElementById("taskes");
btnToogle.addEventListener("click", () => {
  btnToogle.classList.toggle("btn-down");
  let h = foo.style.height == "40vh" ? "10vh" : "40vh";
  foo.style.height = h;

  let h2 = heightTaskes.style.maxHeight == "65%" ? "85%" : "65%";
  heightTaskes.style.maxHeight = h2;

  let d = inpC.style.display == "flex" ? "none" : "flex";
  inpC.style.display = d;
});
