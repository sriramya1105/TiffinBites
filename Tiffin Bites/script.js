// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navTwo = document.getElementById('nav-two');

mobileMenuBtn.addEventListener('click', () => {
    navTwo.classList.toggle('active');
});

// Search functionality
let searchField = document.getElementById("search_field");
let Tiffincontainer = document.getElementById("menu_two");
let Tiffincards = document.querySelectorAll(".card_container");

searchField.addEventListener("input", () => {
    let searchText = searchField.value.toLowerCase().trim();
    let hasResults = false;
    
    Tiffincards.forEach((card) => {
        let name = card.id.toLowerCase();
        if (name.includes(searchText)) {
            card.style.display = "flex";
            hasResults = true;
        } else {
            card.style.display = "none";
        }
    });
});

// Cart functionality
let card_quantity = document.getElementById("quantity");
let card_price = document.getElementById("price");

let cart = {};
let totalquantity = 0;
let totalprice = 0;

let cards = document.querySelectorAll(".card_container");

cards.forEach((card) => {
    let itemid = card.id;
    let itemName = card.querySelector(".food_title").innerText;
    let itemPrice = Number(card.querySelector(".food_price").innerText.replace("₹", "").trim());

    let quantityButtons = card.querySelectorAll(".quantity_btns");
    let itemQuantity = card.querySelector("span");

    if (quantityButtons.length < 2 || !itemQuantity) {
        console.warn("Missing buttons or quantity span in card:", card);
        return; // skip this card
    }

    let minusbtn = quantityButtons[0];
    let plusbtn = quantityButtons[1];

    cart[itemid] = {
        name: itemName,
        price: itemPrice,
        quantity: 0
    };

    minusbtn.addEventListener("click", () => {
        if (cart[itemid].quantity > 0) {
            cart[itemid].quantity--;
            totalquantity--;
            totalprice -= itemPrice;
            itemQuantity.innerText = cart[itemid].quantity;
            updatecart();
        }
    });

    plusbtn.addEventListener("click", () => {
        cart[itemid].quantity++;
        totalquantity++;
        totalprice += itemPrice;
        itemQuantity.innerText = cart[itemid].quantity;
        updatecart();
    });
});

function updatecart() {
    card_quantity.innerText = totalquantity;
    card_price.innerText = `₹${totalprice.toFixed(2)}`;
}

// Cart popup functionality
let cart_icon = document.getElementById("cart_icon");
let closebtn = document.querySelector("#popup_container > button");
let main = document.querySelector("main");

cart_icon.addEventListener("click", () => {
    main.style.display = "flex";
    rendercartDetails();
});

closebtn.addEventListener("click", () => {
    main.style.display = "none";
});

// Close popup when clicking outside
main.addEventListener('click', (e) => {
    if (e.target === main) {
        main.style.display = "none";
    }
});

let cartDetails = document.getElementById("cart_details");
let cart_total_items = document.querySelector("#cart_total_items > span");
let cart_total_price = document.querySelector("#cart_total_price > span");

function rendercartDetails() {
    cartDetails.innerHTML = "";
    let hasResults = false;
    
    for (let id in cart) {
        let name = cart[id].name;
        let price = cart[id].price;
        let quantity = cart[id].quantity;
        
        if (quantity > 0) {
            hasResults = true;
            let para = document.createElement("p");
            para.innerText = `${name} x ${quantity} = ₹${(price * quantity).toFixed(2)}`;
            cartDetails.append(para);
        }
    }
    
    if (!hasResults) {
        cartDetails.innerHTML = `<p>No items in cart</p>`;
    }
    
    cart_total_items.innerText = totalquantity;
    cart_total_price.innerText = totalprice.toFixed(2);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        navTwo.classList.remove('active');
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Explore button scroll to menu
document.getElementById('explore_btn').addEventListener('click', () => {
    document.getElementById('menu_page').scrollIntoView({
        behavior: 'smooth'
    });
});