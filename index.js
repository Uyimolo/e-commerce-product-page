const navbar = document.querySelector(".navbar");
const curtain = document.querySelector(".curtain");
// show / hide elements
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

// create a global variable to serve as index pointing to product image
let index = 1;

//
const setImage = (index, productClass) => {
  const product = document.querySelector(`.${productClass}-${index}`);
  const currentProduct = document.querySelector(
    `.${productClass}.show-product`
  );
  if (currentProduct && currentProduct !== product) {
    currentProduct.classList.remove("show-product");
  }
  product.classList.add("show-product");
};

window.addEventListener("DOMContentLoaded", setImage(index, "product"));

// change image when carousel controls are clicked
const counter = (e, productClass) => {
  const el = e.target;
  const products = document.querySelectorAll(`.${productClass}`);
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
  setImage(index, productClass);
};

document.querySelectorAll(".carousel-ctrl").forEach((ctrl) => {
  ctrl.addEventListener("click", (e) => {
    counter(e, "product");
  });
});

document.querySelectorAll(".lightbox-ctrl").forEach((ctrl) => {
  ctrl.addEventListener("click", (e) => {
    counter(e, "lightbox-content");
  });
});

//open lightbox
const lightbox = document.querySelector(".lightbox");
document.querySelectorAll(".product").forEach((product) => {
  product.addEventListener("click", () => {
    showHide(lightbox);
    setImage(index, "lightbox-content");
  });
});

document.querySelector(".close-lightbox").addEventListener("click", () => {
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
    lightBox(ele, thumbnails, "product");
  });
});

lightBoxThumbnails.forEach((thumb) => {
  thumb.addEventListener("click", (e) => {
    const ele = e.target;
    lightBox(ele, lightBoxThumbnails, "lightbox-content");
  });
});

//cart section
// quantity
let count = 0;
cartSize = document.querySelector(".cart-size");
const quantity = (e) => {
  if (e.target.classList.contains("plus")) {
    count++;
  } else {
    if (count > 0) {
      count--;
    }
  }
  cartSize.textContent = count;
};

document
  .querySelectorAll(".count")
  .forEach((counter) => counter.addEventListener("click", quantity));

//add to cart
const cartAmount = document.querySelector(".cart-amount");
const currentPrice = document.querySelector(".current-price").textContent;
let multiplier = Number(cartAmount.textContent);
const cartList = document.querySelector(".cart-list");

const addToCart = () => {

  isEmpty();
  
  multiplier += count;
  let calcPrice = currentPrice.slice(1, currentPrice.length) * multiplier;
  if (count > 0 && cartList.childNodes.length === 5) {
    cartContent = document.createElement("div");
    cartContent.classList.add("cart-content");

    cartContent.innerHTML = `<img src="images/image-product-1-thumbnail.jpg" />
    <p class="cart-desc"> Fall limited Edition Sneakers ${currentPrice} x ${multiplier} $${calcPrice}</p>
    <img src="images/icon-delete.svg" class="cart-delete" />
  `;

    const btn = document.createElement("button");
    btn.classList = "checkout cta";
    btn.textContent = "Check out";
    cartList.appendChild(cartContent);
    cartList.appendChild(btn);
    cartAmount.textContent = multiplier;
  } else {
    const cartDesc = document.querySelector(".cart-desc");
    cartDesc.textContent = `Fall limited Edition Sneakers ${currentPrice} x ${multiplier} $${calcPrice}`;
    cartAmount.textContent = multiplier;
  }
  count = 0;
  cartSize.textContent = 0;
};

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".empty").classList.add("active");
})

document.querySelector(".cta-add-to-cart").addEventListener("click", addToCart);

cartList.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("cart-delete")) {
    el.parentElement.remove();
    multiplier = 0;
    cartSize.textContent = 0;
    const checkOutBtn = document.querySelector(".checkout");
    checkOutBtn.remove();
    showHide(cartList);
    cartAmount.textContent = 0;
  }
});

const isEmpty = () => {
  if(count > 0) {
    document.querySelector(".empty").classList.remove("active");
  }
  else{
    document.querySelector(".empty").classList.add("active");
  }
}

const cartIcon = document.querySelector(".cart");
cartIcon.addEventListener("click", () => {
  showHide(cartList);
  isEmpty();
});

