function popupEvents(popup, openButton, closeButton , type) {
  popup.addEventListener("click", function () {
    popup.classList.remove("show");
    setTimeout(function () {
      popup.classList.remove("active");
    }, 800);
  });
  popup.firstElementChild.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  openButton.addEventListener("click", function () {
      if(type == "cart"){
        changeShopContent()
      }else if (type =="favourite"){
        changeFavContent()
      }
    popup.classList.add("active");
    setTimeout(function () {
      popup.classList.add("show");
    }, 1);
  });
  closeButton.addEventListener("click", function () {
    popup.classList.remove("show");
    setTimeout(function () {
      popup.classList.remove("active");
    }, 800);
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem("productsInCart")) || [];
}
function getFavourite() {
  return JSON.parse(localStorage.getItem("favouriteItems")) || [];
}

function getProduct(id) {
  let product = products.find(function (product) {
    return product.id == id;
  });

  return product;
}

function changeColor(color) {
  page.style.setProperty("--main-color", getComputedStyle(page).getPropertyValue(`--${color}-color`));
  changeImg(navBarImg, color, "logo");
  changeImg(correctImg[0], color, "correct");
  changeImg(correctImg[1], color, "correct");
  changeXIcon(color);
}

function setCarouselPadding() {
  let navbarHeight = navbar.offsetHeight,
    navbutton = navbar.querySelector("button[aria-expanded='true']");

  if (window.innerWidth >= 992 || navbutton) {
    carousels[currentCarousel].style.paddingTop = "0";
  } else {
    carousels[currentCarousel].style.paddingTop = navbarHeight + "px";
  }
}

function changeCarousel() {
  carousels.forEach(function (carousel) {
    carousel.style.zIndex = 0;
    carousel.classList.remove("active");
  });

  carousels[currentCarousel].style.zIndex = 2;
  carousels[currentCarousel].classList.add("active");

  localStorage.setItem("currentCarousel", currentCarousel);

  changeColor(carousels[currentCarousel].dataset.colorName);
}

function changeImg(img, color, type) {
  let oldSrc = img.src,
    oldSrcArray = oldSrc.split("/");

  oldSrcArray[oldSrcArray.length - 1] = `${color}-${type}.png`;
  let newSrc = oldSrcArray.join("/");
  img.src = newSrc;
}

function changeXIcon(color) {
  let oldHref = xIcon.href,
    oldHrefArray = oldHref.split("/");

  oldHrefArray[oldHrefArray.length - 1] = `${color}-logo.png`;

  let newHref = oldHrefArray.join("/");

  xIcon.href = newHref;
}

function showImagesList(images, featured = false) {
  let imagesList = "";

  images.forEach(function (image, index) {
    imagesList += `<li onclick="changeProductImage(this , '${image}' )" class="main-button ${index == 0 ? "active" : ""}">
      ${featured == false ? `<img src="./images/products/${image}" alt="Shoes Option" class="img-fluid">` : ""}
    </li>`;
  });

  return imagesList;
}

function showSizesList(sizes, id) {
  let sizeList = "",
    item = productsInCart.find(function (product) {
      return product.id == id;
    });

  sizes.forEach(function (size, index) {
    let active = "";

    if (item && item.size == size) {
      active = "active";
    } else if (item == undefined || item.size == undefined) {
      if (index == 0) {
        active = "active";
      }
    }

    sizeList += `<li onclick="changeActive(this)" class="main-button ${active}" data-size-name='${size}'>${size}</li>`;
  });

  return sizeList;
}

function showColorList(colors, id) {
  let colorList = "",
    item = productsInCart.find(function (product) {
      return product.id == id;
    });

  colors.forEach(function (color, index) {
    let active = "";

    if (item && item.color == color) {
      active = "active";
    } else if (item == undefined || item.color == undefined) {
      if (index == 0) {
        active = "active";
      }
    }

    colorList += `<li data-color="${color}" onclick="changeActive(this)" class="main-button align-self-center rounded-circle ${active}" style="background-color: ${color};"></li>`;
  });

  return colorList;
}

function showPrice(price, discount) {
  return `<span class="text-decoration-line-through text-danger me-1 ${discount == 0 ? "d-none" : ""}">${price} <sup>$</sup></span> <span>${(price * (1 - discount)).toFixed(2)} <sup>$</sup></span>`;
}

function changeProductImage(that, image) {
  let product = that.closest(".product"),
    img = that.querySelector("img"),
    currentImage = product.querySelector(".selected-image img");

  if (img) {
    currentImage.src = img.src;
  } else {
    let srcArr = currentImage.src.split("/");

    srcArr[srcArr.length - 1] = image;
    currentImage.src = srcArr.join("/");
  }

  changeActive(that);
}

function changeActive(that) {
  let activeItem = that.parentElement.querySelector(".active");

  if (activeItem) {
    activeItem.classList.remove("active");
  }

  that.classList.add("active");
}

function floatProduct(that) {
  let floating = that.closest(".product"),
    product = getProduct(floating.dataset.productId),showLatestProduct
  content = floatingProduct.querySelector(".content"),
    oldItem = productsInCart.findIndex(function (item) {
      return item.id == product.id;
    });
  content.innerHTML = `
    <div class="row product flex-column flex-md-row rounded-3"
      data-product-id="${product.id}" >

      <div class="col-md-6 col-12">
        <div class="image">

          <div class="selected-image">
            <img src="./images/products/${product.images[0]}" class="img-fluid" alt="Options">
          </div>

          <ul class="list-unstyled d-flex column-gap-3">
            ${showImagesList(product.images)}
          </ul>

        </div>
      </div>

      <div class="col-md-6 col-12 part">

        <h4>${product.name}</h4>

        <div class="price">
          ${showPrice(product.price, product.discount)}
        </div>

        <hr>

        <p>${product.description}</p>

        <div class="sizes d-flex justify-content-start align-items-center column-gap-2">
          <span class="me-2 fw-bolder">Size :</span>

          <ul class="d-flex list-unstyled mb-0 column-gap-2">
            ${showSizesList(product.sizes, product.id)}
          </ul>
        </div>

        <div class="colors my-3 d-flex">
          <span class="me-2 fw-bolder">Colors :</span>

          <ul class="list-unstyled d-flex column-gap-2 mb-0">
            ${showColorList(product.colors, product.id)}
          </ul>
        </div>

        <button class="${oldItem == -1 ? "main-button" : "remove-button"}" onclick="toggleCart(this)">
          ${oldItem == -1 ? "Add to Cart" : "Remove from Cart"}
        </button>

      </div>
    </div>
  `;

  floatingProduct.classList.add("active");

  setTimeout(function () {
    floatingProduct.classList.add("show");
  }, 1);
}

function showLatestProduct(products) {
  products.forEach(function (product) {
      let oldItem = productsInCart.findIndex(function (item) {
        return item.id == product.id;
      });
       let isFav = favouriteItems.find(function (item) {
  return item.id == product.id;
});
 

    latestProducts.innerHTML += `
      <div class="product mb-3 position-relative bg-white ${(isFav)? 'favourite' : ''}" data-product-id="${product.id}" ondblclick="addToFavourite(this)">

        <div class="row">

          <div class="col-lg-6 part1">

            <div class="row flex-column flex-md-row h-100">

              <div class="col-md-2 col-12 ul-item">
                <ul class="h-100 list-unstyled d-flex flex-md-column justify-content-center align-content-center row-gap-2 column-gap-2 mb-0">
                  ${showImagesList(product.images)}
                </ul>
              </div>

              <div class="col-md-10 col-12 d-flex justify-content-center align-items-center m-auto">

                <div class="selected-image">
                  <img src="./images/products/${product.images[0]}" alt="Selected Image" class="img-fluid">
                </div>

              </div>

            </div>

          </div>

          <div class="col-lg-6 part2">

            <h3 class="main-color h5">${product.name}</h3>

            <p>${product.description}</p>

            <div class="price">
              <span class="me-2 fw-bolder">Price :</span>
              ${showPrice(product.price, product.discount)}
            </div>

            <div class="sizes d-flex justify-content-start align-items-center column-gap-2">

              <span class="me-2 fw-bolder">Size :</span>

              <ul class="d-flex list-unstyled mb-0 column-gap-2">
                ${showSizesList(product.sizes, product.id)}
              </ul>

            </div>

            <button class="${oldItem == -1 ? "main-button" : "remove-button"} mt-3" onclick="toggleCart(this)">
              ${oldItem == -1 ? "Add to Cart" : "Remove from Cart"}
            </button>

          </div>

        </div>
          <i class="fa-solid fa-heart fav " ></i>
      </div>
    `;
    
  });
}

function showFeaturedProduct(products) {
  products.forEach(function (product) {
        let active = favouriteItems.find(function (item) {
      return item.id == product.id;
    }) ? "favourite" : "";

    featuredProducts.innerHTML += `
      <div class="col-lg-3 col-sm-6">

        <div class="product bg-white rounded-3 position-relative p-3 ${active}"
          data-product-id="${product.id}" ondblclick="addToFavourite(this)">

          <p class="discount ${product.discount == 0 ? "d-none" : ""}">
            -${product.discount * 100}%
          </p>

          <div class="head selected-image mb-5">
            <img src="./images/products/${product.images[0]}"
              class="img-fluid"
              alt="Featured Options" />
          </div>

          <div class="body position-relative d-flex justify-content-center align-items-center flex-column">

            <i class="fa-solid fa-magnifying-glass float-product"
              onclick="floatProduct(this)">
            </i>

            <ul class="d-flex justify-content-between align-items-center list-unstyled column-gap-2">
              ${showImagesList(product.images, true)}
            </ul>

            <h6>${product.name}</h6>

            <div class="price">
              ${showPrice(product.price, product.discount)}
            </div>

          </div>
          <i class="fa-solid fa-heart fav "></i>

        </div>

      </div>
    `;
  });
}

function toggleCart(that) {
  let product = that.closest(".product"),
    size = product.querySelector(".sizes li.active")?.textContent,
    id = product.dataset.productId,
    productData = getProduct(id),
    color = product.querySelector(".colors li.active")?.dataset.color || productData.colors[0],
    img = product.querySelector(".selected-image img").src.split("/"),
    item = {
      id: id,
      size: size,
      color: color,
      img: img[img.length - 1],
    },
    oldItem = productsInCart.findIndex(function (product) {
      return product.id == item.id;
    });

  if (oldItem == -1) {
    productsInCart.push(item);
    that.textContent = "Remove from Cart";
    that.classList.add("remove-button");
    that.classList.remove("main-button");
  } else {
    productsInCart.splice(oldItem, 1);
    that.classList.add("main-button");
    that.classList.remove("remove-button");
    that.textContent = "Add to Cart";
  }

  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
}

function changeShopContent() {
  shopContent.innerHTML = `
<p class="alert alert-warning text-center ${productsInCart.length == 0 ? "d-block" : "d-none"} " role="alert">
  No Order Placed
</p>
`;
  productsInCart.forEach(function (product) {
    let productData = getProduct(product.id),
      name = productData.name,
      price = productData.price,
      discount = productData.discount;

    shopContent.innerHTML += `



  <div class="col-md-4 col-sm-6 col-12 part product"
  data-product-id = ${product.id}
  >
    <div class="item">
      <div class="head">
        <img src="./images/products/${product.img}" alt="Cart option" class="img-fluid">
      </div>
      <div class="body">
      <h5>${name.slice(0, 15) + "..."}</h5>
        <div class="price">
              <span class="me-2 fw-bolder">Price :</span>
          ${showPrice(price, discount)}
        </div> 
        <div class="sizes d-flex justify-content-start align-items-center column-gap-2">

              <span class="me-2 fw-bolder">Size :</span>

              <ul class="d-flex list-unstyled mb-0 column-gap-2">
                <li onclick="changeActive(this)" class="main-button active">${product.size}</li>
              </ul>
            </div>

            <div class="colors my-3 d-flex">
          <span class="me-2 fw-bolder">Colors :</span>

          <ul class="list-unstyled d-flex column-gap-2 mb-0">
            <li data-color="${product.color}" onclick="changeActive(this)" class="main-button align-self-center rounded-circle active" style="background-color: ${product.color};"></li>
          </ul>
        </div>
      
      <button class="btn btn-danger w-100 " onclick="removeItem(this , 'cart')"> Remove</button>
      </div>
    </div>
  </div>
 
 `;
  });
  if (productsInCart.length != 0) {
    shopContent.innerHTML += `
        <button class="btn btn-success mt-5 w-100 buy">Buy</button>
        `;
  }
}

function removeItem(that ,type) {
  let product = that.closest(".product"),
  id = product.dataset.productId,
  sameProduct = document.querySelector(`.product[data-product-id="${id}"]`),
  sameProductButtons = sameProduct.querySelector("button");
  if (sameProductButtons){
    sameProductButtons.classList.add("main-button");
  sameProductButtons.classList.remove("remove-button");
  sameProductButtons.textContent = "Add to Cart";
  }

  product.animate(removeProductAnimation,removeProductAnimationOptions);

    setTimeout(function () {

      if(type == 'cart'){
        productsInCart = productsInCart.filter(function (item) {
          return item.id != id;
        });
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
        changeShopContent();
      }else if(type == 'favourite'){

       favouriteItems = favouriteItems.filter(function (item) {
          return item.id != id;
        });
        sameProduct.classList.add("bg-white");
      sameProduct.classList.remove("favourite");
        localStorage.setItem("favouriteItems", JSON.stringify(favouriteItems));
        changeFavContent();

      }




  }, 700);
}



function addToFavourite(that){

  let product = that.closest(".product"),
  id = product.dataset.productId,
  productData = getProduct(id),
  size = product.querySelector(".sizes li.active")?.dataset.sizeName,
    color = product.querySelector(".colors li.active")?.dataset.color || productData.colors[0],
    img = product.querySelector(".selected-image img").src.split("/");

    let item = {
      id: id,
      size: size,
      color: color,
      img: img[img.length - 1],
    },
    oldItem = favouriteItems.findIndex(function (product) {
      return product.id == item.id;
    });

  
    if (oldItem == -1) {
      favouriteItems.push(item);
      that.classList.add("favourite");
      that.classList.remove("bg-white");
          that.animate(
    addFavouriteAnimation,
    addFavouriteAnimationOptions
  );
    } else {
      favouriteItems.splice(oldItem, 1);
      that.classList.add("bg-white");
      that.classList.remove("favourite");
that.animate(
  removeFavouriteAnimation,
  removeFavouriteAnimationOptions
);
    }
    
    localStorage.setItem("favouriteItems", JSON.stringify(favouriteItems));

}

function changeFavContent() {
  favourioteContent.innerHTML = `
<p class="alert alert-warning text-center ${favouriteItems.length == 0 ? "d-block" : "d-none"} " role="alert">
  No Favourite Items
</p>
`;

  favouriteItems.forEach(function (product) {

    let productData = getProduct(product.id),
      name = productData.name,
      price = productData.price,
      discount = productData.discount;

    favourioteContent.innerHTML += `

  <div class="col-md-4 col-sm-6 col-12 part product"
  data-product-id = ${product.id}
  >
    <div class="item">
      <div class="head">
        <img src="./images/products/${product.img}" alt="Cart option" class="img-fluid">
      </div>
      <div class="body">
      <h5>${name.slice(0, 15) + "..."}</h5>
        <div class="price">
              <span class="me-2 fw-bolder">Price :</span>
          ${showPrice(price, discount)}
        </div> 
        <div class="sizes d-flex justify-content-start align-items-center column-gap-2">

              <span class="me-2 fw-bolder">Size :</span>

              <ul class="d-flex list-unstyled mb-0 column-gap-2">
                ${showSizesList(productData.sizes)}
              </ul>
            </div>

            <div class="colors my-3 d-flex">
          <span class="me-2 fw-bolder">Colors :</span>

          <ul class="list-unstyled d-flex column-gap-2 mb-0">
           ${showColorList(productData.colors )}
          </ul>
        </div>
      
      <button class="btn btn-danger w-100 " onclick="removeItem(this , 'favourite')"> Remove</button>
      </div>
    </div>
  </div>
 
 `;
  });
  if (favouriteItems.length != 0) {
    favourioteContent.innerHTML += `
        <button class="btn text-danger btn-danger mt-5 w-100 buy" onclick="clearFavourite()">Clear</button>
        `;
  }
}

function clearFavourite() {
  let productsInPopup = favourioteContent.querySelectorAll(".product"),
    oldFavouriteProducts = document.querySelectorAll(".local-storage-items .product.favourite");
    

  productsInPopup.forEach(function (product) {
    product.animate(
      clearFavouriteAnimation,
      clearFavouriteAnimationOptions
    );
  });

  favouriteItems = [];
  localStorage.setItem("favouriteItems", JSON.stringify(favouriteItems));
  setTimeout(function () {
    changeFavContent();
    oldFavouriteProducts.forEach(function(item){
      item.classList.remove("favourite");
      item.classList.add("bg-white");
    })
  }, 500);
}