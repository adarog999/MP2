const paginate = document.querySelectorAll('.paginate')
const locations = window.location.hash
const id = locations.slice(2) || 1
console.log(id)
const seeMore = document.getElementById("seeMore")
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let isLogin = localStorage.getItem("isLogin") || false
let notLogin = document.querySelector(".notLogin")
let navIconProfile = document.querySelector(".navIconProfile")
let cartCount = document.querySelector(".cart-count")
let orderList = JSON.parse(localStorage.getItem("orderList")) || [];
let orderCount = document.querySelector(".order-count")
if(orderList.length > 0) {
    orderCount.style.display = "block"
    orderCount.textContent = orderList.length
} else{
    orderCount.style.display = "none"
}
if(cart.length > 0) {
    cartCount.style.display = "block"
    cartCount.textContent = cart.length
} else {
    cartCount.style.display = "none"
}
if(isLogin == "true") {
    notLogin.style.display = "none"
    navIconProfile.style.display = "flex"
} else {
    notLogin.style.display = "flex"
    navIconProfile.style.display = "none"
}

let productList = document.querySelector('.product-list')

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

const fetchData = async () => {
    const fetchDatas = await fetch("https://adarog999.github.io/MP2/assets/json/products.json",{
        credentials: 'omit',
    })
    const response =   await fetchDatas.json()
    let combinedArray = [];

    for (let key in response) {
        combinedArray = combinedArray.concat(response[key]);
    }
    return combinedArray
}
const getData = async (page,seemore) => {
    const response = await fetchData()
   
    // const response = await data.tshirt
    let displayObject ;
     if(!isNaN(id)) {
    let oject = response.filter(obj => {
        return obj.id <= parseInt(page) * 8 && obj.id >=  parseInt(page) * 8 - 8
    })
     displayObject =  oject.map((key,index) => {
            const {title,price,image,id} = key
            if(index >= 8) {
                return;
            }
            return `
            <div class="product ">
                <div class="img">
                    <img src="${image}" alt="">
                </div>
                <p class="title">${title.slice(0,20)} ${title.length > 15 ? `<a href="product-view.html#/${id}">...</a>` : ''}</p>
            <p class="price">${price}.00</p>
            <a class="view-btn" href="product-view.html#/${id}">View Product</a>
            </div>
            `
        })
    }
    else if(isNaN(id)){
        let oject = response.filter(obj => {
            return obj.title.toLowerCase().includes(searchInput(page).toLowerCase())
        })   
        displayObject  =  oject.map((key,index) => {
            console.log(index)
            const {title,price,image,id} = key
            console.log()

            if(index >=  parseInt(page) * 8) {
                return;
            }

            return `
            <div class="product ">
                <div class="img">
                    <img src="${image}" alt="">
                </div>
                <p class="title">${title.slice(0,20)} ${title.length > 15 ? `<a href="product-view.html#/${id}">...</a>` : ''}</p>
            <p class="price">${price} PHP</p>
            <a class="view-btn" href="product-view.html#/${id}">View Product</a>
            </div>
            `

        })
        console.log(displayObject)
    } else if (page == "") {
        console.log("asd1")
    } 
    if(seemore === "seemore") {
        console.log("seemore")
    }

     if (displayObject == '') {
        console.log("false")
        productList.innerHTML = `
            <div class="noResult">
                <h1>No Result Found</h1>
            </div>
        `
        return;
    }
   
    productList.innerHTML = displayObject
}

getData(id,null)
if(id.length > 0) {
    seeMore.style.display = "none"
    paginate.forEach(btn => {
        btn.style.display = "inline-block"
    })
    document.querySelector(".categories").style.display = "none"
        document.querySelector(".header").style.display = "none"
};
//see more
let seemoreCount = 1
seeMore.addEventListener("click",async (e) => {
   
   let data = await fetchData()
 
   console.log(data)
   seemoreCount ++
   
   let base = seemoreCount * 8

   let sliceArray = data.slice(base - 8,base)
   console.log(base)
   let addmore =  sliceArray.map((key,index) => {
    const {title,price,image,id} = key
    return `
    <div class="product ">
        <div class="img">
            <img src="${image}" alt="">
        </div>
        <p class="title">${title.slice(0,20)} ${title.length > 15 ? `<a href="product-view.html#/${id}">...</a>` : ''}</p>
    <p class="price">${price}.00 PHP</p>
    <a class="view-btn" href="product-view.html#/${id}">View Product</a>
    </div>
    `
}).join("")
productList.insertAdjacentHTML("beforeend",addmore)
if (seemoreCount*8 >= data.length) {
    e.target.disabled = true

    return;
}
})
//see more

paginate.forEach(btn => {
    btn.addEventListener("click",(e) => {
        let {page} = e.target.dataset
        console.log(locations)
        window.location.replace(`shop.html#/${page}`);
        location.reload()
        console.log(id)
    })
})

let search = document.getElementById("search")
let search_text = document.getElementById("search_text")

if(isNaN(id)) {
    search_text.value  = searchInput(id)
    document.querySelector(".categories").style.display = "none"
    document.querySelector(".header").style.display = "none"
} ;
// else if(id.length > 0) {
//     document.querySelector(".categories").style.display = "none"
//     document.querySelector(".header").style.display = "none"
// };
console.log(id)
search.addEventListener("click",async (e) => {
    console.log("asd")
    if(search_text.value == "") {
        window.location.replace(`shop.html`)
    }
    e.preventDefault()
    let replaceSpace = search_text.value.replace(/\s+/g, '-')
    window.location.assign(`shop.html#/${replaceSpace}`);
    location.reload()
    console.log(search_text.value)
    
})


function searchInput(inp) {
    const words = inp.split("-")
    return words.join(" ")
}

let logoutDiv = document.querySelector(".logoutDiv")
let lgText = document.querySelector(".logoutDiv p")
logoutDiv.addEventListener("click",()=> {
    console.log("asd")
    lgText.textContent = "Logging out.."
    localStorage.setItem("isLogin",false)
    localStorage.setItem("isLogout",true)
    location.replace("sign-in.html")
})
