// mobile navigation
const navbar = document.querySelector(".navbar");
const curtain = document.querySelector(".curtain");

const showHide = (...args) => {
  args.forEach((arg) => arg.classList.toggle("active"));
};

//show / hide nav menu
document.querySelectorAll(".menu").forEach((menuBtn) => {
  menuBtn.addEventListener("click", () => {
    showHide(navbar, curtain);
  });
});

curtain.addEventListener("click", () => {
  showHide(navbar, curtain);
});

// create a global variable to serve as index pointing to productArr
let index = 1;

//change product image src to value contained in productArr at the right index
const setImage = (index, productClass) => {
  const product = document.querySelector(`.${productClass}-${index}`);
  const currentProduct = document.querySelector(
    `.${productClass}.show-product`
  );
  if (currentProduct && currentProduct !== product) {
    currentProduct.classList.remove("show-product");
  }
  console.log(product);
  product.classList.add("show-product");
};

window.addEventListener("DOMContentLoaded", setImage(index, "product"));

// increase or decrease index when carousel controls are clicked
const counter = (e) => {
  const el = e.target;
  const products = document.querySelectorAll(".product");
  const productArr = [...products];
  if (el.classList.contains("next")) {
    index++;
    if (index > productArr.length) {
      index = 1;
    }
  } else {
    index--;
    if (index < 1) {
      index = productArr.length;
    }
  }
  setImage(index, "product");
};

document.querySelectorAll(".carousel-ctrl").forEach((ctrl) => {
  ctrl.addEventListener("click", counter);
});

//open lightbox
const lightbox = document.querySelector(".lightbox");
document.querySelector(".product").addEventListener("click", () => {
  showHide(lightbox);
  setImage(index, "lightbox-content");
});

document.querySelector(".close-lightbox").addEventListener("click", (s) => {
  showHide(lightbox);
});

//change main product image to corresponding thumbnail image when thumbnail is clicked
const thumbnails = document.querySelectorAll(".thumbnail");
const lightBoxThumbnails = document.querySelectorAll(".lightbox-thumbnail");

const lightBox = (event, thumbnail, productClass) => {
  const thumbnailsArr = [...thumbnail];
  const newIndex = thumbnailsArr.indexOf(event) + 1;
  setImage(newIndex, productClass);
};

thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", (e) => {
    const ele = e.target;
    const productClass = "product";
    lightBox(ele, thumbnails, productClass);
  });
});

lightBoxThumbnails.forEach((thumb) => {
  thumb.addEventListener("click", (e) => {
    const ele = e.target;
    lightBox(ele, lightBoxThumbnails, "lightbox-content");
  });
});
