let orderList = JSON.parse(localStorage.getItem("orderList")) || []
let ordersListDiv = document.getElementById("ordersList")
console.log(orderList)
let noOrders = document.querySelector(".noOrders")

let openMenuBtn = document.querySelector(".openMenu")
let menu_container  = document.querySelector(".menu_container")
let closeMenu  = document.querySelector(".closeMenu")
let menuHelper = document.querySelector(".menuHelper")
openMenuBtn.addEventListener("click",()=> {
    menu_container.style.transform = "translateX(0)"
    menuHelper.style.display  = "block"
})
closeMenu.addEventListener("click",()=> {
    menu_container.style.transform = "translateX(100%)"
    menuHelper.style.display  = "none"
})
menuHelper.addEventListener("click",()=> {
    menuHelper.style.display  = "none"
    menu_container.style.transform = "translateX(100%)"
})



let isLogin = localStorage.getItem("isLogin") || false
let notLogin = document.querySelector(".notLogin")
let navIconProfile = document.querySelector(".navIconProfile")
let cartCount = document.querySelector(".cart-count")
let orderLists = JSON.parse(localStorage.getItem("orderList")) || [];
let orderCount = document.querySelector(".order-count")
if(orderLists.length > 0) {
    orderCount.style.display = "block"
    orderCount.textContent = orderLists.length
} else{
    orderCount.style.display = "none"
    console.log("no order")
    noOrders.style.display = "flex"
    ordersListDiv.style.display = "none"
}
function cartIcon() {
    let carts = JSON.parse(localStorage.getItem("cart")) || [];
if(carts.length > 0) {
    cartCount.style.display = "block"
    cartCount.textContent = carts.length
} else {
    cartCount.style.display = "none"
}
}
cartIcon()
if(isLogin == "true" || isLogin == true) {
    notLogin.style.display = "none"
    navIconProfile.style.display = "flex"
} else {
    notLogin.style.display = "flex"
    navIconProfile.style.display = "none"
}



const displayOrders =  () => {
    fetch("https://adarog999.github.io/MP2/assets/json/products.json")
    .then(res => res.json())
    .then(data => {
        let allProducts = [];
        for (let key in data) {
            allProducts = allProducts.concat(data[key]);
        }
        console.log(allProducts)
        let orderStorage = ""
        let eachOrder = orderList.forEach(order => {
        let findProduct = allProducts.find(x => {
                return x.id == order.productId
            })
        const {image , title} = findProduct
            console.log(order)
                orderStorage += `
                <div class="productDiv">
                <div class="address">
                    <span>${order.firstName} ${order.lastName}</span>
                    <p>${order.address} (2390)</p>
                </div>
                <div class="orderDetails">
                    
                <div class="image">
                    <img  src="${image}" alt="">
                </div>
                <div class="oDetails">
                    <span class="confirmM">YOUR ORDER IS CONFIRMED</span>
                    <div>
                        <span>ORDER ID: lp9812gfa-9usd</span>
                    </div>
                    <div>
                        <span>${title}</span>
                    </div>
                    
                    <div class="variantsWrap">
                        <span>VARIANTS</span>
                        <div class="variants">
                        ${order.variants.map((ors,index) => {
                            return Object.entries(ors).map(([varName,varVal],i) => {
                                return `<div>
                            <span>${varName} :</span>
                            <span>${varVal}</span>
                                </div>`
                        }).join("")
                        }).join("")}
                        </div>
                    </div>
                    <div class="quantity">
                        <span>Quantity: </span>
                        <span>${order.quantity}</span>
                    </div>
                    
                    </div>
                    <div class="charges">
                        <div class="shipCharge">  
                            <span>Charge: </span>
                            <span>50.00</span>
                        </div>
                        <div class="total">  
                            <span>Total Ammount: </span>
                            <span>${((parseInt(findProduct.price) * parseInt(order.quantity))-50).toLocaleString("en-US")}.00 PHP</span>
                        </div>
                        <button>Track Order</button>
                </div>
                </div>
    
            </div>
                `
        });
        ordersListDiv.innerHTML = orderStorage
    }).catch(err => {
        noOrders.innerHTML = `
        <h1>ERROR LOADING</h1>
        <a href="shop.html">Go Back to home</a>
        `
        noOrders.style.display = "flex"
    })
   
}
displayOrders()
let logoutDiv = document.querySelector(".logoutDiv")
let lgText = document.querySelector(".logoutDiv p")
logoutDiv.addEventListener("click",()=> {
    console.log("asd")
    lgText.textContent = "Logging out.."
    localStorage.setItem("isLogin",false)
    localStorage.setItem("isLogout",true)
    location.replace("sign-in.html")
    
})