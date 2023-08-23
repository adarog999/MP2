let allcart = document.getElementById("allCartDiv")
let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
let changeVarie = document.querySelector(".change-varie-container")
let checkoutContainer = document.querySelector(".checkout-container")
let placeOrderSuccess = document.querySelector(".placeOrder-success")
let cartTotal = document.querySelector(".cart-total")

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



function isCart () {
    let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    if(cartStorage.length < 1) {
        cartCount.style.display = "none"
        allcart.innerHTML = `<div class="noItems">No Item in the Cart</div>` 
        cartTotal.innerHTML = `
        <div class="div">
            <div>
                <span>Item</span>
                <span id="itemCount" class="itemCount">(0)</span>
            </div>
            <div>
                <span>Subtotal</span>
                <span id="subtotal">0 PHP</span>
            </div>
            <div>
                <span>Shipping Charge</span>
                <span>0 PHP</span>
            </div>
            <div>
                <span>Total Ammount</span>
                <span id="totalAmmount">0</span>
            </div>
            <button id="checkout">NO ITEMS IN THE CART</button>
        </div>
        `
    } else{


    }
}

const displayCart = async () => {
    const fetchData = await fetch("https://adarog999.github.io/MP2/assets/json/products.json")
    const res = await fetchData.json()
    let allProducts = [];

    for (let key in res) {
        allProducts = allProducts.concat(res[key]);
    }
    let cartList = ''
    let cartProduct = cartStorage.map((myCart,mainIndex) => {
        let product = allProducts.find(x => x.id == myCart.productId)
        const {image,price,title,variants} = product
        cartList += 
        `
         <div class="container container${mainIndex}">
         <div class="header">
             <div class="seller">
                <div class="sellerP">
                <div>
                <i class="fa-solid fa-user"></i> Flecker Shop
                </div>
                </div>
                <button ><i class="fa-brands fa-rocketchat"></i> Chat</button>
                <button><i class="fa-solid fa-shop"></i>View Shop</button>
                </div>
             <p class="uPrice"><i class="fa-solid fa-ticket"></i> Unit Price: ${price.toLocaleString("en-US")}.00 PHP</p>
         </div>
         <div class="div-container">

         <div class="div1">
             <div class="img-wrapper">
                 <img src="${image}" alt="">
             </div>
         </div>
         <div class="div2">
             <span class="Title">${title}</span>
         </div>
         <div class="div3">
             <div class="div3-wrapper">
                ${myCart.variants.map((variant,i) => {
                    return Object.entries(variant).map(([varName,varVal],i) => {
                        console.log(varName)
                        return ` <div>
                        <span class="varName">${varName}: </span><span class="${varName}${mainIndex}">${varVal}</span>
                        </div>`
                    })
                }).join("")
                }
                <button class="chngBtn" onclick="changeVarBtn('${mainIndex}')">Change</button>
                </div>
                <div class="changeVariants changeVar${mainIndex}">
                 <span class="closeChange" onclick="closeChange(event)">&times;</span>
                ${variants.map((varie,index) => {
                    return Object.entries(varie).map(([varieKey,varieVal]) => {
                        return `
                        <div class="varieDivider">
                        <span>${varieKey}</span>
                        </div>
                        <div class="change_btn">
                        ${varieVal.map(choice => {
                                return `<button data-name="${choice}" class="${myCart.variants[index][varieKey] == choice ? `selected`: ''} choosen${myCart.productId}${index}" onclick="choose('${choice}','${varieKey}','${index}' ,'${myCart.productId}','${mainIndex}')">${choice} </button>`
                        }).join("")}
                        </div>
                        `
                    }).join("")
                }).join("")}
                </div>
                </div>
         <div class="div4">
             <div style="display: flex; margin-left: 10px; ">   
                <button style="cursor:pointer; z-index: 1;" onclick="minusQuant(event,'${myCart.productId}',${mainIndex},'${price}','${myCart.productId}')">-</button>
                 <input oninput="changeQ(event,'${myCart.productId}',${mainIndex},'${price}')" min="1" value="${myCart.quantity}" class="input${myCart.productId}"  type="number">
                <button style="cursor:pointer; z-index: 1;" onclick="plusQuant(event,'${myCart.productId}',${mainIndex},'${price}','${myCart.productId}')" >+</button>
             </div>
         </div>
         <div class="div5">
             <span class="price${mainIndex}">${(parseInt(price) * parseInt(myCart.quantity)).toLocaleString()}</span><span>.00 PHP</span>
         </div>
         <div class="div6">
             <button onclick="removeCart('${mainIndex}','${myCart.productId}')">Remove</button>
         </div>
     </div>
 
     </div>
         `
    })
    allcart.innerHTML = cartList
    isCart ()
}
displayCart()

function closeChange(e) {
    e.target.parentNode.style.display = "none"
    changeVarie.style.display = "none"
}
function choose(value,key,index,productId,mainIndex) {
    let findCart = cartStorage.find(x => x.productId == productId )
    let a = findCart.variants[index][key] = value
    console.log(index,'index')
    console.log(productId)
    let choiceBtn = document.querySelectorAll(`.choosen${productId}${index}`)
    choiceBtn.forEach(btn => {
        if(btn.dataset.name == value) {
            // btn.style.border = "1px solid red"
            btn.style.backgroundColor = "#ff3d00"
            btn.style.color = "#fff"
        } else {
            btn.style.border = "1px solid #ff3d00"
            btn.style.backgroundColor = "#fff"
            btn.style.color = "#ff3d00"
        }
    })
    let changedVar = document.querySelector(`.${key}${mainIndex}`)
    changedVar.textContent = value
    localStorage.setItem("cart",JSON.stringify(cartStorage))
}
let divNum ;
const changeVarBtn = (div) => {
    let openDiv = document.querySelector(`.changeVar${div}`)
    openDiv.style.display = 'block'
    changeVarie.style.display = "block"
    divNum = div
}

changeVarie.addEventListener("click",(e)=> {
    let openDiv = document.querySelector(`.changeVar${divNum}`)
    openDiv.style.display = "none"
    e.target.style.display = "none"
    console.log("asdasd")
})

const changeQ = (e,product,index,price) => {
    let {value} = e.target 
    console.log(value)
    if(parseInt(value) < 1 || value == "") {
        e.target.value = 1
        return;
    }
    console.log(value)
    let findCart = cartStorage.find(x => x.productId == product )
    findCart.quantity = value
    let changePrice = document.querySelector(`.price${index}`)
    changePrice.textContent = `${(parseInt(price) * parseInt(value)).toLocaleString()}`
    localStorage.setItem("cart",JSON.stringify(cartStorage))
    updateCheckout(cartStorage)
    
}

function minusQuant(e,product,index,price,inp) {
    console.log("asd")
    let valueInp = document.querySelector(`.input${inp}`) 
    let {value} = valueInp
    if(parseInt(value) == 1) {
        return
    }
    console.log(value)
    valueInp.value = parseInt(value) - 1
    console.log(value,'asd')
    let findCart = cartStorage.find(x => x.productId == product )
    findCart.quantity =  valueInp.value
    let changePrice = document.querySelector(`.price${index}`)
    changePrice.textContent = `${(parseInt(price) * parseInt( valueInp.value)).toLocaleString()}`
    localStorage.setItem("cart",JSON.stringify(cartStorage))
    updateCheckout(cartStorage)
}
function plusQuant(e,product,index,price,inp) {
    console.log("asd")
    let valueInp = document.querySelector(`.input${inp}`) 
    let {value} = valueInp
    console.log(value)
    valueInp.value = parseInt(value) + 1
    console.log(value,'asd')
    let findCart = cartStorage.find(x => x.productId == product )
    findCart.quantity =  valueInp.value
    let changePrice = document.querySelector(`.price${index}`)
    changePrice.textContent = `${(parseInt(price) * parseInt( valueInp.value)).toLocaleString()}`
    localStorage.setItem("cart",JSON.stringify(cartStorage))
    updateCheckout(cartStorage)
}
const removeCart = (index,remId) => {
    let findDiv = document.querySelector(`.container${index}`)
    let carts = JSON.parse(localStorage.getItem("cart"))
    let newCart = carts.filter(x => parseInt(x.productId) !== parseInt(remId))
    console.log(newCart,'newCart')
    console.log(index,'remove')    
    console.log(remId,'remove')    
    // let newCart = cartStorage.filter(x => parseInt(x.productId) !== parseInt(remId))
    findDiv.remove()
    localStorage.setItem("cart",JSON.stringify(newCart))
    updateCheckout(newCart)
    isCart()
    cartCount.textContent = newCart.length
}

const checkoutBtn = document.getElementById("checkout")
checkoutBtn.addEventListener("click",()=> {
    checkoutContainer.style.display = "flex"
})
let orderSubtotal = document.getElementById("orderSubtotal")
let orederTotal = document.getElementById("orederTotal")
let itemCount = document.querySelector('#itemCount')
let totalAmmount = document.querySelector('#totalAmmount')
let subtotal = document.querySelector("#subtotal")
function updateCheckout(params) {
    let addAll = params.reduce((acc,cur) => {
        console.log(cur)
        console.log(acc)
        return parseInt(acc) + (parseInt(cur.price) * parseInt(cur.quantity))
    },0)
    itemCount.innerHTML = `(${params.length})`
    totalAmmount.innerHTML = `${(parseInt(addAll) - 50).toLocaleString()}.00 PHP`
    subtotal.innerHTML = `${parseInt(addAll).toLocaleString()}.00 PHP`
    orderSubtotal.innerHTML = `${parseInt(addAll).toLocaleString()}.00 PHP`
    orederTotal.innerHTML = `${parseInt(addAll).toLocaleString()}.00 PHP`
}
updateCheckout(cartStorage)



// checkout
let loading = document.querySelector(".loading")
const island = document.getElementById("island")
let region = document.getElementById("region")
let province = document.getElementById("province")
let city = document.getElementById("city")
let barangay = document.getElementById("barangay")
island.addEventListener("change", (e)=> {
    loading.style.display = 'flex'
    const {value} = e.target
    console.log(value)
    fetch(`https://psgc.gitlab.io/api/island-groups/${value}/regions.json`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let regions = ''
        let allRegion = data.forEach(x=> {
            console.log(x.name)
            regions += `<option data-name="${x.name}" value="${x.code},${x.name}" >${x.name}</option>`
        })
        region.innerHTML = regions
        loading.style.display = 'none'
    })
})
region.addEventListener("change",(e)=> {
    loading.style.display = 'flex'
    const {value}=e.target
    console.log(value)
    fetch(`https://psgc.gitlab.io/api/regions/${value.split(",")[0]}/provinces.json`)
    .then(res => res.json())
    .then(data=> {
        let provinces = ''
        data.forEach(x=> {
            provinces += `
            <option value="${x.code},${x.name}">${x.name}</option>`
        })
        province.innerHTML = provinces
        loading.style.display = 'none'

    })
})
province.addEventListener("change",(e)=> {
    loading.style.display = 'flex'
    const {value} = e.target
    console.log(value)
    fetch(`
    https://psgc.gitlab.io/api/provinces/${value.split(",")[0]}/cities.json`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let cities = ''
        data.forEach(x=> {
            cities += `<option value="${x.code},${x.name}">${x.name}</option>`
        })

        city.innerHTML = cities
    loading.style.display = 'none'

    })
})

city.addEventListener("change",(e)=> {
    loading.style.display = 'flex'
    const {value} = e.target
    console.log(value)
    fetch(`https://psgc.gitlab.io/api/cities/${value.split(",")[0]}/barangays.json`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let barangays = ''
        data.forEach(x=> {
            barangays += `<option value="${x.code},${x.name}">${x.name}</option>`
        })
        barangay.innerHTML = barangays
    loading.style.display = 'none'
    })
})
// checkout

let ifCard = document.querySelector(".ifCard")
let paymentImg =document.getElementById("paymentImg")
let selectPayment = document.querySelector("#selectPayments")
function displayP() {
    ifCard.innerHTML = `<div class="holder">
    <input type="text" placeholder="CARD HOLDER NAME" required>
    <input type="text" placeholder="CARD NUMBER " required>
</div>
<div class="cvc">
    <input type="text" placeholder="Expiry" required>
    <input type="text" placeholder="CVC" required>
</div>`
    
}
selectPayment.addEventListener("change",(e)=> {
    const {value} = e.target
    if(value == "cod") {
        ifCard.style.display = "none"
        paymentImg.innerHTML = `
        <div class="p-method">
        <h1>CASH ON DELIVRY</h1>
        <p>HAVE A NICE DAY!</p>
        <p>ADVANCE THANK YOU! FOR ORDERING HERE</p>
        </div>
        `
    }else if(value == "mastercard") {
        displayP()
        ifCard.style.display = "block"
        paymentImg.innerHTML = `
        <div class="image">
        <img src="../assets/images/mastercard-logo.png" alt="">
        </div>
        `
    } else if(value == "ae") {
        displayP()
        ifCard.style.display = "block"
        paymentImg.innerHTML = `
        <div class="image">
        <img src="../assets/images/amy-express.png" alt="">
        </div>
        `
    }
    else {
        displayP()
        ifCard.style.display = "block"
        paymentImg.innerHTML = `
        <div class="image">
        <img src="../assets/images/paypal.png" alt="">
        </div>
        `
    }
    if(value !== 'cod') { 
        let cardExpire = document.querySelector("#cardExpire")
        cardExpire.addEventListener("input",(e)=> { 
            const {length} = e.target.value
            let {value} = e.target
            if(length == 2) {
                cardExpire.value = value + " / "
            }
        })
    }
})
let orderList = JSON.parse(localStorage.getItem("orderList")) || [];
let cancel_checkout = document.getElementById("cancel_checkout")
cancel_checkout.addEventListener("click",()=> {
    console.log("cancel")
    checkoutContainer.style.display = "none"
})
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let contactNum = document.getElementById("contactNumber")


checkoutBtn.addEventListener("click",()=> {
    checkoutContainer.style.display = "flex"
  
})
let loaderMessage = document.querySelector(".loader-message")
let message = document.querySelector(".form-validation .message")
let formValidation = document.querySelector(".form-validation ") 
let closeFormErr = document.querySelector(".form-validation #close")
closeFormErr.addEventListener("click",()=> {
    formValidation.style.display = "none"
})
let placeOrderBtn = document.getElementById("placeOrderBtn")
let placeLoading = document.querySelector(".placeloading")
placeOrderBtn.addEventListener("click",(e)=> {
    e.preventDefault()
let orderList = JSON.parse(localStorage.getItem("orderList")) || [];
  
        if(selectPayment.value !== 'cod') {
            // formValidation.style.display = "flex"
            // message.innerHTML = "COMPLETE CARD INFORMATION"
            let cardNum = document.getElementById("cardNumber")
            if(isNaN(cardNum.value)) {
                formValidation.style.display = "flex"
                message.innerHTML = "INPUT VALID CARD"
            } else if(cardNum.value.length < 14) {
                formValidation.style.display = "flex"
                message.innerHTML = "CARD NUMBER MUST BE 14 DIGITS"
            } 
        }
        if( firstName.value == "" ||
            lastName.value == "" || 
            contactNum.value === "" ||  
            island.value == "" ||
            region.value == "" ||
            city.value == "" ||
            barangay.value == "" 
         )
            { 
            formValidation.style.display = "flex"
            message.innerHTML = "COMPLETE ALL FIELDS"
        }
        else if(contactNum.value == "") {

        }
        else if(isNaN(contactNum.value)) {
            formValidation.style.display = "flex"
            message.innerHTML = "INPUT A VALID CONTACT NUMBER"
        } else if(contactNum.length < 11) {
            formValidation.style.display = "flex"
            message.innerHTML = "CONTACT NUMBER MUST BE EQUAL TO 11"
            console.log("err2")

        } else if(contactNum.value.slice(0,2) !== "09") {
            formValidation.style.display = "flex"
            message.innerHTML = "INPUT A VALID CONTACT NUMBER"
            console.log("err3")
        } else {

        for(let i = 0 ; i < cartStorage.length ; i++) {
            let orderObj = {
                firstName: "",
                lastName: "",
                contactNum: "",
                quantity: cartStorage[i].quantity,
                productId: cartStorage[i].productId,
                variants: cartStorage[i].variants,
                address: `${island.value} ${region.value.split(",")[1]} ${province.value.split(",")[1]} ${city.value.split(",")[1]} ${barangay.value.split(",")[1]}`,
                paymentMehod:"",
            }
            orderObj.firstName = firstName.value
            orderObj.lastName = lastName.value
            orderObj.contactNum = contactNum.value
            orderObj.paymentMehod = selectPayment.value
            orderList.push(orderObj)
        }
        


        localStorage.setItem("orderList",JSON.stringify(orderList))
        placeOrderSuccess.style.display = "block"

       

        setTimeout(()=> {
        placeOrderSuccess.style.display = "none"
        placeLoading.style.display = "flex"
        placeLoading.style.top = "0"
        placeLoading.style.left = "0"
        location.replace("orders.html")
        },1300)
        }



})
// let placeOrderBtn  = document.getElementById("placeOrderBtn")

// placeOrderBtn.addEventListener("click",(e)=> {
// })

let logoutDiv = document.querySelector(".logoutDiv")
let lgText = document.querySelector(".logoutDiv p")
logoutDiv.addEventListener("click",()=> {
    console.log("asd")
    lgText.textContent = "Logging out.."
    localStorage.setItem("isLogin",false)
    localStorage.setItem("isLogout",true)
    location.replace("sign-in.html")
})