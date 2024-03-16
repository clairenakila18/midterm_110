"use strict";

/**
 * add event on element
 */

// Add this function to your script.js file

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

document.addEventListener("click", function (event) {
  // Check if the clicked element is not the "Shop Now" button
  if (!event.target.matches("#shopNowBtn")) {
    // Get the button element
    var shopNowBtn = document.getElementById("shopNowBtn");

    // Toggle the "flicker" class on the button
    shopNowBtn.classList.toggle("flicker");
  }
});

/**
 * navbar toggle
 */

const navToggler = document.querySelector("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
};

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", activeElemOnScroll);

function updateCartCount(count) {
  const cartCountElement = document.getElementById("cartCount");
  cartCountElement.innerText = count;
}

function toggleSearchBar() {
  const searchContainer = document.getElementById("searchContainer");
  searchContainer.style.display =
    searchContainer.style.display === "none" ||
    searchContainer.style.display === ""
      ? "flex"
      : "none";
}

const addToCartButton = document.querySelector(".card-action-btn");
let cartCount = 0;

addToCartButton.addEventListener("click", () => {
  cartCount++;
  updateCartCount(cartCount);
});

const searchButton = document.querySelector('.action-btn[aria-label="Search"]');
const searchBar = document.getElementById("searchBar");

searchButton.addEventListener("click", () => {
  toggleSearchBar();
});

searchBar.addEventListener("input", () => {
  const searchTerm = searchBar.value.toLowerCase();
  const searchableElements = document.querySelectorAll(".searchable-element");

  searchableElements.forEach((element) => {
    const elementText = element.innerText.toLowerCase();
    element.style.display = elementText.includes(searchTerm) ? "block" : "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the user profile button and link elements
  var userProfileButton = document.getElementById("userProfileButton");
  var userProfileLink = document.getElementById("userProfileLink");

  // Add a click event listener to the user profile button
  userProfileButton.addEventListener("click", function () {
    // Redirect to the user profile page
    window.location.href = userProfileLink.href;
  });
});

document.getElementById("cartButton").addEventListener("click", function () {
  openCartModal();
});

document.querySelector(".close").addEventListener("click", function () {
  closeCartModal();
});

function openCartModal() {
  const modal = document.getElementById("cartModal");
  modal.style.display = "block";
  displayCartItems();
}

function closeCartModal() {
  const modal = document.getElementById("cartModal");
  modal.style.display = "none";
}

function displayCartItems() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  let totalPrice = 0;

  // Loop through the items in the cart
  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.productName} - ₱${item.price}`;
    cartItems.appendChild(listItem);
    totalPrice += parseFloat(item.price);
  });

  document.getElementById("cartTotal").textContent = totalPrice.toFixed(2);
}

document.getElementById("checkoutBtn").addEventListener("click", function () {
  const totalAmount = parseFloat(
    document.getElementById("cartTotal").textContent
  );
  alert(`Payment successful! Total amount: ₱${totalAmount.toFixed(2)}`);

  cart = [];
  updateCartBadge();
  closeCartModal();
});

let cart = [];

function addToCart(productName, price) {
  cart.push({ productName, price });

  updateCartBadge();
}

function updateCartBadge() {
  const cartBadge = document.querySelector(".btn-badge");

  cartBadge.textContent = cart.length;
}

document.querySelectorAll(".card-action-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const card = this.closest(".product-card");
    const productName = card.querySelector(".card-title").textContent;
    const price = card.querySelector(".card-price").getAttribute("value");
    addToCart(productName, price);
  });
});
