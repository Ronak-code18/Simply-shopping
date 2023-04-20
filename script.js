var show = [];
var cartProducts = [];
var wishlistProducts = [];
var product;

$(document).ready(function () {
    $.getJSON('https://dummyjson.com/products/', function (data) {
        let productList = data.products;
        for (let i in productList) {
            productList[i].wishlist = 0;
            productList[i].quantity = 1;
            show.push(productList)
        }
            // console.log(productList);
            // // let disp = '';
            // console.log(productList[i].thumbnail);
            
            // let disp = '<div class="col-sm-12 col-md-6 col-lg-3 g-3">'
            // disp += '<div class="card-group"><div class="card">'
            // disp += '<img class="pic card-img-top" src=' + productList[i].thumbnail + ' />'
            // disp += '</div></div></div>'
            // $('.arrival').append(disp);
        // disp += `<img class="backyard" src="background-sample.jpg"><h1 class="position-absolute head text-light">WELCOME TO OUR WEBSITE</h1></img>`;
        // $('.background').append(disp);
        // displayProds(productList);   
    });
});

function displayProds(products, isWishList) {
    $(".datapush").empty();
    $(".background").empty();
    for (var i = 0; i < products.length; i++) {
        product = products[i];
        let total = 5;
        var s1 = product.rating;
        const starPercentage = (s1 / total) * 100;
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}`;

        let car = '<div class="col-sm-12 col-md-6 col-lg-4 g-3">'
        car += '<div class="card-group"><div class="card">'
        car += '<img class="pic card-img-top" src=' + product.thumbnail + ' />'
        car += '<div class="card-body >'
        car += '<div class="card-title fw-bolder">' + product.title + '</div>'
        car += '<div class="card-text ms-3"><span class="price text-success me-2">'
        car += '₹ ' + product.price + ' </span>'
        car += '<span class="discount "> ' + product.discountPercentage + ''
        car += '<span class="badge">'
        car += '<i class="fa-solid fa-percent fs-6 discount"></i></span></span></div>'
        car += '<div class="d-flex card-footer justify-content-between">'
        car += '<div class="">'
        car += '<div class="stars-outer">'
        car += '<div class=" stars-inner"  style="width:' + starPercentageRounded + '%;">'
        car += '</div></div>'
        car += '<span class="number-rating ps-2">' + product.rating + '</span></div>'
        car += '<div class="color">'
        car += `<button class="wishlist border-0  bg-transparent text-color-blue " onclick="handleWishList(${product.id},${isWishList})" data-product-id=${product.id} >`
        car += '<i class="fa-solid fa-heart live"></i>'
        car += '</button>'
        car += `<button class="cart1 border-0 bg-transparent " onclick="pushCart(${product.id})" data-product-id=${product.id} `
        car += '><i class="fa-solid fa-cart-shopping"></i></div>'
        car += '</button></div></div></div></div></div></div>'
        car += '</div>'
        $('.datapush').append(car);
    }
}
$('.down').click(function () {
    $('.work').slideToggle();
    // $('body').addClass("remove-scrolling");
});
document.querySelectorAll('.redirect').forEach(n => n.addEventListener('click', () => {
    $('.work').slideToggle();
    // $('body').removeClass("remove-scrolling");
}));
$('.home').click(function () {
    $.getJSON('https://dummyjson.com/products/', function (data) {
        displayProds(data.products);
    })
});

/*           below for categories show             */
$('.dropdown-item').on("click", function () {

    show.forEach(api => {
        let test = $(this)[0].dataset.category;
        let test1 = $(this)[0].dataset.brand;
        var catProducts = [];
        api.forEach(function (product) {
            if (product.category === test || product.brand === test1) {
                //append in products arr cartProducts
                catProducts.push(product)
            }
        });
        displayProds(catProducts);
    })
});
/*            below for display wishlist                */
function handleWishList(id, isWishList) {
    console.log('id', id);
    let isDeleted = false
    // $(id).addClass("new");
    if (wishlistProducts.length === 0) {
        console.log("show", show[0]);
        show[0].forEach(api => {
            if (api.id == id) {
                wishlistProducts.push(api)
            }
        })
    } else {
        wishlistProducts.forEach((api, index) => {
            if (api.id == id) {
                // console.log(api, index);
                wishlistProducts.splice(index, 1)
                isDeleted = true;
            }
        })
        if (!isDeleted) {
            show[0].forEach(api => {
                if (api.id == id) {
                    wishlistProducts.push(api)
                    isDeleted = false;
                }
            })
        }
    }
    if (isWishList) displayProds(wishlistProducts, true);
};

$('.wish').click(function () {
    displayProds(wishlistProducts, true);
});

function pushCart(id) {
    console.log(id);
    show[0].forEach(api => {
        if (api.id === id) {
            cartProducts.push(api);
            console.log(api);
        }
    })
};
// });
/*           below for display cart           */
$('.cart2').click(function () {
    displaycart(cartProducts);
    /* if (card1 != null) {
    }
    if (card1 == null) {                     //for cart empty check
        alert("cart is empty");
    }*/
});

function RemoveCart(id) {
    cartProducts.forEach((api, index) => {
        // show[0].forEach(api => {
        if (api.id === id) {
            cartProducts.splice(index, 1);
        }
    })
    // })
    displaycart(cartProducts)
}
/*          below for append value in cart            */
// console.log(show);
function displaycart(api) {
    $(".datapush").empty();
    $('.datapush').append(`<div class="container px-4 py-4 mx-auto">
    <div class="row d-flex justify-content-center">
    <div class="col-4">
    <h4 class="heading">Shopping Bag</h4>
    </div>
    <div class="col-8">
    <div class="row text-right">
    <div class="col-4">
    <h6 class="mt-2">Product</h6>
    </div>
    <div class="col-4">
    <h6 class="mt-2">Quantity</h6>
    </div>
    <div class="col-4">
    <h6 class="mt-2">Price</h6>
    </div>
    </div>
    </div>
    </div>
    </div>`);
    let card1 = '';
    let total = 0
    for (var i = 0; i < api.length; i++) {
        product = api[i];
        // console.log(product.price, product.Netprice);
        card1 += '<hr><div class="row d-flex justify-content-center py-2">'
        card1 += '<div class="col-4"><div class="row d-flex">'
        card1 += '<div class="book d-flex gap-2">'
        card1 += '<div><img src= ' + product.thumbnail + ' class="img"></div>'
        card1 += '<div class=" d-flex "> <h6 class="mob-text">' + product.description + '</h6></div>'
        card1 += '</div></div></div>'
        card1 += '<div class="my-auto col-8"><div class="row text-right">'
        card1 += '<div class="col-4 ps-3"><p class="mob-text">' + product.title + '</p></div>'
        card1 += '<div class="col-4 ps-3"><div class="px-3">'
        card1 += `<div class="d-flex align-items-baseline fill">
        <button class="minus pe-2" onclick=" minus(this,${i}) ">-</button>`
        card1 += '<p class="result text-center" id="qty' + i + '">' + product.quantity + '</p>'
        // card1 += '<input type="text" readonly  class="border-0 result" value="1">'
        card1 += `<button class="plus ps-2" onclick=" addition(this,${i}) ">+</button>`
        card1 += '</div></div></div>'
        card1 += ' <div class="col-4 ps-4 d-flex"><h6 class="text" id="product-price">' + (product.Netprice != undefined ? product.Netprice : product.price) + '</h6>'
        card1 += `<div class=" removeCart"><button class= "border-0 bg-transparent" onclick="RemoveCart(${product.id})"><i class="fa-solid fa-xmark rmvbtn fs-3"></i></button></div></div>`
        card1 += '</div></div></div>'
        total += (product.Netprice != undefined ? product.Netprice : product.price)
    }
    console.log("total", total);

    $('.datapush').append(card1);
    $('.datapush').append(`<div class="cotainer"><div class=" d-flex justify-content-evenly my-2 mx-2 align-items-center">
    <div class="">
    <label class="t1">Total:</label><span class="output ms-2">Rs.`+ total + `</span></div>
    <button type="button" class=" btn btn-outline-primary">PROCEED TO PAY</button>
    </div>`);

};

function addition(val, i) {
    let currentProduct = cartProducts[i];
    currentProduct.quantity++
    currentProduct.Netprice = currentProduct.quantity * currentProduct.price
    cartProducts[i] = currentProduct
    displaycart(cartProducts);


};
function minus(val, i) {
    let currentProduct = cartProducts[i];
    currentProduct.quantity--
    currentProduct.Netprice = currentProduct.quantity * currentProduct.price
    cartProducts[i] = currentProduct
    displaycart(cartProducts);


};
