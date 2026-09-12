let page = document.querySelector("body"),
  carousels = document.querySelectorAll("header .SC-carousel .SC-carousel-inner .SC-carousel-item"),
  prevButton = document.querySelector("header .SC-carousel button.prev"),
  nextButton = document.querySelector("header .SC-carousel button.next"),
  currentCarousel = localStorage.getItem("currentCarousel") || 0,
  LoadingPopup = document.querySelector("#LoadingPopup"),
  navBarImg = document.querySelector(".navbar-brand img"),
  xIcon = document.querySelector("link[type='image/x-icon']"),
  correctImg = document.querySelectorAll(".title img"),
  navbar = document.querySelector("nav"),
  navBarLinks = document.querySelectorAll(".navbar .navbar-nav a"),
  latestProducts = document.querySelector("#Latest .container"),
  featuredProducts = document.querySelector("#Featured .container .row"),
  loginPupup = document.querySelector("#Login"),
  loginOpen = navbar.querySelector(".login"),
  loginClose = loginPupup.querySelector(".close"),
  floatingProduct = document.querySelector("#floatingProduct"),
  productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [],
  shopOpen = navbar.querySelector(".cart"),
  shop = document.querySelector("#Shop"),
  shopClose = shop.querySelector(".close"),
  shopContent = shop.querySelector(".content .row"),
  favouriteItems = JSON.parse(localStorage.getItem("favouriteItems")) || [],
  favouriteOpen = navbar.querySelector(".fav"),
  favouritePopup = document.querySelector("#Favourite"),
  favouriteClose = favouritePopup.querySelector(".close"),
  favourioteContent = document.querySelector("#Favourite .content .row");

//to load the last color was used , stored in local storage and give the carousel padding on resize for smaller screen <992
changeCarousel();
setCarouselPadding();
showLatestProduct(latest);
showFeaturedProduct(features);

popupEvents(loginPupup, loginOpen, loginClose);
popupEvents(shop, shopOpen, shopClose, "cart");
popupEvents(favouritePopup, favouriteOpen, favouriteClose, "favourite");

//slecting after creating the items
let latestImages = latestProducts.querySelectorAll(".product .part1 ul li img"),
  latestSizes = latestProducts.querySelectorAll(".sizes ul li");

//Loading popup before content load
window.addEventListener("DOMContentLoaded", function () {
  LoadingPopup.classList.remove("active");
});

//givin gpadding for the carousel item = to the navbar height on resize the window /responsive
window.addEventListener("resize", function () {
  setCarouselPadding();
});

//next button on the carousel change the color
nextButton.addEventListener("click", function () {
  currentCarousel++;

  if (currentCarousel == carousels.length) {
    currentCarousel = 0;
  }

  changeCarousel();
});

prevButton.addEventListener("click", function () {
  currentCarousel--;

  if (currentCarousel == -1) {
    currentCarousel = carousels.length - 1;
  }

  changeCarousel();
});

navBarLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    let section = document.querySelector(link.getAttribute("href")),
      activeLink = document.querySelector(".navbar .nav-link.active");

    activeLink.classList.remove("active");
    link.classList.add("active");

    window.scrollTo({
      top: section.offsetTop - navbar.offsetHeight,
      behavior: "smooth",
    });
  });
});

window.addEventListener("scroll", function () {
  navBarLinks.forEach(function (link) {
    let section = document.querySelector(link.getAttribute("href")),
      activeLink = document.querySelector(".navbar .nav-link.active");

    if (window.scrollY >= section.offsetTop - navbar.offsetHeight - 50) {
      activeLink.classList.remove("active");
      link.classList.add("active");
      navbar.classList.add("scrolled");
      if (window.scrollY <= 10) {
        navbar.classList.remove("scrolled");
      }
    }
  });
});

//FloatingProduct Popup
floatingProduct.addEventListener("click", function () {
  floatingProduct.classList.remove("show");
  setTimeout(function () {
    floatingProduct.classList.remove("active");
  }, 800);
});
floatingProduct.querySelector(".content").addEventListener("click", function (e) {
  e.stopPropagation();
});

let search = document.querySelector(".search"),
  searchBox = document.querySelector(".search-box"),
  searchInput = document.querySelector(".search-box input");

search.addEventListener("click", function (e) {
  e.stopPropagation();

  if (searchBox.classList.contains("active")) {
    searchBox.classList.remove("active");

    setTimeout(function () {
      searchBox.classList.add("d-none");
    }, 500);
  } else {
    searchBox.classList.remove("d-none");

    setTimeout(function () {
      searchBox.classList.add("active");
    }, 1);
  }
});

searchBox.addEventListener("click", function (e) {
  e.stopPropagation();
});

document.addEventListener("click", function () {
  searchBox.classList.remove("active");

  setTimeout(function () {
    searchBox.classList.add("d-none");
  }, 500);
});

searchInput.addEventListener("input", function () {
  let searchValue = searchInput.value.toLowerCase().trim();

  let searchResults = products.filter(function (product) {
    let name = product.name.toLowerCase(),
      id = product.id.toString();

    return name.includes(searchValue) || id.includes(searchValue);
  });

  if (searchResults.length == 0) {
    featuredProducts.innerHTML = `
      <div class="alert no-search-bg text-center w-100">
        Nothing found
      </div>
    `;
  } else {
    showFeaturedProduct(searchResults);
  }

  document.querySelector("#Featured").scrollIntoView({
    behavior: "smooth",
  });
});
