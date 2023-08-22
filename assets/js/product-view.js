let productLoading = document.querySelector(".product-loading")
productLoading.style.display = "flex"
const locations = window.location.hash
const id = locations.slice(2)
let imageFullV = document.querySelector(".image-fullV")
let imgFullview = document.querySelector(".img-fullview")
const closeView = document.getElementById("close-view")
let imageCategory = document.querySelector(".image-category")
let ratings = document.getElementById("ratings")
let variantsDiv = document.getElementById("variants")
let star = document.querySelector(".star")
let errorAdd = document.querySelector(".errorAdd")
let prPrice  = document.getElementById("pr-price")
// let cartObject = {productId:id,quantity:1}
let cartObject = {
    productId:id,
    quantity:1,
    price:0,
    variants:[]
}
let variantsChoice = [];


// console.log(variantsChoice)


fetch("http://127.0.0.1:5500/assets/json/products.json")
.then( res => res.json())
.then(data => {
    // console.log(data);

    let combinedArray = [];

    for (let key in data) {
        combinedArray = combinedArray.concat(data[key]);
    }
    let product = combinedArray.find(x => {
        return x.id == id
    })
    // console.log(product.images)
    return product
})
.then(object => {
    console.log(object)
    const {title,price,image,images,variants} = object
    cartObject.price = price
    prPrice.innerHTML = `${price}.00 PHP`
    // console.log(variants)
    let btn = ''

    let varie = variants.map((key,index) => {
        console.log(key)
    console.log(key,'key123')

        // console.log(key)
    //     console.log(key)
          Object.entries(key).map(([key,value]) => {
            variantsChoice.push(key)
            console.log(value)

           btn += `
           <div class="choice">
                <span style="text-transform:uppercase;">${key} :</span>
                <div class="choice-btn">
                ${value.map((val) => {
                    return `
                    <button class="${key}" onclick="varieBtn('${val}','${key}','${index}')">${val}</button>
                    `
                }).join("")}
                </div>
            </div>
           `
       });
    });
    // console.log(variantsDiv)
    variantsDiv.innerHTML = btn
    document.querySelector('.product-name').innerHTML = title
    document.querySelector('.carousel-inner').innerHTML = `
    <div class="carousel-item active">
    <div class="img-wrapper">
        <img onclick="imgView('${image}')" src="${image}" class="d-block w-100" alt="..." id="carouselImage">
    </div>
  </div>
  ${images.map(img => (
        ` <div class="carousel-item ">
        <div class="img-wrapper">
        <img onclick="imgView('${img}')" src="${img}" class="d-block w-100" alt="...">
        </div>
        </div>`
        )).join("")
    }
    `
    imageCategory.innerHTML = images.map(img => {
        return `
        <div class="img">
        <img src="${img}" alt="">
      </div>
        `
    }).join("")
    
}).then(cartObj => {
    for(let i = 0 ; i < variantsChoice.length ; i ++) {
        cartObject.variants.push({[variantsChoice[i]]:""}) 
        
    }
    productLoading.style.display = "none"
})

function imgView (src) {
    imgFullview.style.display = 'flex'
    imageFullV.src = src
}
// addToCart
const addToCart = document.querySelector(".addtocart")
const buyNow = document.querySelector(".buynow")

let cart = JSON.parse(localStorage.getItem("cart")) || [];
function updateQuantity(inp) {
    // console.log(inp.value)
    cartObject.quantity = inp.value
}
let minusQuant = document.getElementById("minusQuant")
let addQuant = document.getElementById("addQuant")
let quantityVal = document.getElementById("quantityVal")
minusQuant.addEventListener("click",()=> {
let quantityVal = document.getElementById("quantityVal")
    let value = parseInt(quantityVal.value)
    if(value == 1) {
        return
    }else if(value > 1) {
        quantityVal.value = value-1
    } else {
        return
    }
})
addQuant.addEventListener("click",()=> {
    let quantityVal = document.getElementById("quantityVal")
    let value = parseInt(quantityVal.value)
    quantityVal.value = value+1
})
let errorMessage = document.getElementById("errorMessage")
let close = document.getElementById("close")
close.addEventListener("click",()=> {
    errorAdd.style.display = 'none'
})
let cartAdded = document.querySelector(".cart-added ")

function fillall(params) {
    errorMessage.innerHTML = params
    errorAdd.style.display = 'flex'
}

addToCart.addEventListener("click",() => 
{
    let isInCart = cart.findIndex(x => {
        return x.productId == id
    })
    // console.log(isInCart)
    for(let i = 0 ; i < variantsChoice.length ; i ++) {
        if(cartObject.variants[i][variantsChoice[i]] === "") {
            console.log("please fill",variantsChoice[i])
            fillall(`PLEASE CHOOSE <span>${variantsChoice[i]}</span>`)
            return
        } else {
            console.log("success")
        }
    }
    if(cartObject["quantity"] < 1 || cartObject["quantity"] == "") {
        console.log("please-error")
        fillall(`PLEASE ADD QUANTITY`)
        return
    } else if(isInCart !== undefined && isInCart !== -1){
        cart[isInCart] = cartObject
        console.log(isInCart)
        console.log("yes")
        localStorage.setItem("cart",JSON.stringify(cart))
        cartAdded.style.display = 'flex'
    setTimeout(()=> {
    cartAdded.style.display = 'none'
    },1500)
         return
    } ;
    cart.push(cartObject)
    localStorage.setItem("cart",JSON.stringify(cart))
    cartAdded.style.display = 'flex'
    setTimeout(()=> {
    cartAdded.style.display = 'none'
    },1500)
})
// addToCart
// buynow
let orederTotal = document.getElementById("orederTotal")
let orderSubtotal = document.getElementById("orderSubtotal")
buyNow.addEventListener("click",() => {
    let isInCart = cart.findIndex(x => {
        return x.productId == id
    })
    // console.log(isInCart)
    for(let i = 0 ; i < variantsChoice.length ; i ++) {
        if(cartObject.variants[i][variantsChoice[i]] === "") {
            fillall(`PLEASE CHOOSE <span>${variantsChoice[i]}</span>`)
            return
        }
    }
    if(cartObject["quantity"] < 1 || cartObject["quantity"] == "") {
        fillall(`PLEASE ADD QUANTITY`)
        return
    } else if(isInCart !== undefined && isInCart !== -1){
        checkoutContainer.style.display = "flex"
        errorAdd.style.display = 'none'
        orederTotal.innerHTML = `${((parseInt(cartObject["quantity"]) * cartObject.price) - 15).toLocaleString("en-US")}.00 PHP`
        orderSubtotal.innerHTML = `${(parseInt(cartObject["quantity"]) * cartObject.price).toLocaleString("en-US")}.00 PHP`
    } else {
        checkoutContainer.style.display = "flex"
        errorAdd.style.display = 'none'
        orederTotal.innerHTML = `${((parseInt(cartObject["quantity"]) * cartObject.price) - 15).toLocaleString()}.00 PHP`
        orderSubtotal.innerHTML = `${(parseInt(cartObject["quantity"]) * cartObject.price).toLocaleString("en-US")}.00 PHP`
    };
})
// buynow

console.log(cartObject.variants)
closeView.addEventListener("click",() => {
    imgFullview.style.display = "none"
})
console.log(typeof cartObject.variants)
function varieBtn(variantVal,varName,index) {
    console.log(variantsChoice[index],'asd111')
    console.log(index)
    console.log(cartObject.variants[index],'asd1')
    cartObject.variants[index][[varName]] = variantVal
    console.log(cartObject)
    let cartObj = cartObject.variants
    console.log(varName)
    for (let i = 0 ; i < cartObj.length ; i++) {
        let choiceBtn = document.querySelectorAll(`.${variantsChoice[i]}`)
       
            let objKey = variantsChoice[i]
          
            let key = cartObject.variants[i]
            console.log(cartObject.variants[i][variantsChoice[i]])
            for(let j = 0; j < choiceBtn.length ; j++) {
            console.log(choiceBtn[j].textContent)
                if(choiceBtn[j].textContent == cartObject.variants[i][variantsChoice[i]]) {
                    choiceBtn[j].style.border = "2px solid red"
                } else {
                    choiceBtn[j].style.border = "2px solid gray"
                }
        }
    }

}



// checkout
let loading = document.querySelector(".loading")
let island = document.getElementById("island")
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
            regions += `<option value="${x.code},${x.name}" >${x.name}</option>`
        })
        region.innerHTML = regions
        loading.style.display = 'none'
        island.setAttribute("data",`name: '${value}'`)
    })
})
region.addEventListener("change",(e)=> {
    loading.style.display = 'flex'
    const {value}=e.target
    console.log(value)
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
    <input type="text" maxlength="14" id="cardNumber" placeholder="CARD NUMBER " required>
</div>
<div class="cvc">
    <input type="text" maxlength="7" id="cardExpire"  placeholder="12 / 12" required>
    <input type="text" id="cardCVC" maxlength="3" placeholder="CVC" required>
</div>`
    
}
console.log(selectPayment)
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
let cancelBuy = document.querySelector(".cancel-place")
let confirmBuy = document.querySelector(".confirm-place")
let checkoutContainer = document.querySelector(".checkout-container")
let placeOrderSuccess = document.querySelector(".placeOrder-success") 
cancelBuy.addEventListener("click",()=> {
    checkoutContainer.style.display = "none"
})
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let contactNum = document.getElementById("contactNumber")
let orderObj = {
    firstName: "",
    lastName: "",
    contactNum: "",
    productId: id,
    quantity:cartObject.quantity,
    variants: cartObject.variants,
    address:`${island.value} ${region.value.split(",")[1]} ${province.value.split(",")[1]} ${city.value.split(",")[1]} ${barangay.value.split(",")[1]}`
    ,
    paymentMehod:"",
}
let loaderMessage = document.querySelector(".loader-message")
let message = document.querySelector(".form-validation .message")
let formValidation = document.querySelector(".form-validation ") 
let closeFormErr = document.querySelector(".form-validation #close")
closeFormErr.addEventListener("click",()=> {
    formValidation.style.display = "none"
})
confirmBuy.addEventListener("click",(e)=> {
    e.preventDefault()
let orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    let isInOrder = orderList.find(x => {
        return parseInt(x.productId) == parseInt(orderObj.productId)
    })
    if(isInOrder !== undefined) {
        console.log("you want to order again?")
        return
    }
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
        orderObj.firstName = firstName.value
        orderObj.lastName = lastName.value
        orderObj.contactNum = contactNum.value
        orderObj.paymentMehod = selectPayment.value
        orderObj.quantity = cartObject.quantity
        orderList.push(orderObj)
        localStorage.setItem("orderList",JSON.stringify(orderList))
        placeOrderSuccess.style.display = "block"

       

        setTimeout(()=> {
        placeOrderSuccess.style.display = "none"
        productLoading.style.display = "flex"
        productLoading.style.position = "fixed"
        productLoading.style.maxHeight = "100vh"
        productLoading.style.maxWidth = "100vw"
        productLoading.style.top = "0"
        productLoading.style.left = "0"
        loaderMessage.style.display = "block"
        location.replace("orders.html")
        },1300)
        }



})

function orderDetails() {
    
}