
let topProductsContainer = document.querySelector(".topProducts-container") 

fetch("https://adarog999.github.io/MP2/assets/json/products.json")
.then(res => res.json())
.then(data => {
    console.log(data)
    let comBinedProduct = []
    for (let key in data) {
        comBinedProduct = comBinedProduct.concat(data[key]);
    }
    let samplePr = shufflePr(comBinedProduct)
    let products = ''
    samplePr.forEach(x => {
        products += `
        <div class="topProducts-card">
                <div class="topProducts-picture">
                    <img src="${x.image}" alt="">
                </div>
                <div class="topProducts-description">
                    <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum laborum repellat dolor 
                    </p>
                </div>
            </div>
        `
    })
    topProductsContainer.innerHTML = products
}).catch(e => {
    console.log(e)
})

function shufflePr(pr) {
    let suffledProduct = []
    for (let i = 0 ; i < 4 ; i ++) {
        let i = Math.floor(Math.random() * pr.length)
        suffledProduct.push(pr[i])
    }   
    return suffledProduct
}

let products = document.getElementById("products")
let following = document.getElementById("following")
let chatPer = document.getElementById("chatPer")
let followers = document.getElementById("followers")
let rating = document.getElementById("rating")
let join = document.getElementById("join")
let carouselInner = document.querySelector(".carousel-inner")
let sellerName = document.querySelector(".sellerName")
let email = document.querySelector(".email")

fetch("https://adarog999.github.io/MP2/assets/json/seller.json")

.then(res => res.json())
.then(data => {
    console.log(data)
    let sellerList = data.seller
    let selllerAcc = JSON.parse(localStorage.getItem("selllerAcc")) 
    console.log(selllerAcc)
    let seller = sellerList.find(x => {
        return x.username == selllerAcc.username && x.password == selllerAcc.password
    })
    if(seller !== undefined) {
       products.textContent = seller.products
       following.textContent = seller.following
       chatPer.textContent = seller.chat_performance
       followers.textContent = seller.followers
       rating.textContent = seller.rating
       join.textContent = seller.joined
       sellerName.textContent = seller.name
       email.textContent = seller.username
    }
    let sellerImg = ""
    seller.images.forEach(x => {
        console.log(x)
        sellerImg += `
        <div class="carousel-item active">
        <img src="${x}" class="d-block w-100" alt="...">
      </div>
        `
    })
    carouselInner.innerHTML = sellerImg
})