const paginate = document.querySelectorAll('.paginate')
const locations = window.location.hash
const id = locations.slice(2) || 1
console.log(id)
const seeMore = document.getElementById("seeMore")

let productList = document.querySelector('.product-list')
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
   
    // let data = response.map((key,index) => {
    //     const {title,price,image,id} = key
    //     if(index >= 8) {
    //         return
    //     }
    //     return `
    //     <div class="product">
    //         <div class="img">
    //             <img src="${image}" alt="">
    //         </div>
    //         <p class="title">${title.slice(0,20)} ${title.length > 15 ? `<a href="product-view.html#/${id}">...</a>` : ''}</p>
    //     <p class="price">${price} PHP</p>
    //     <a class="view-btn" href="product-view.html#/${id}">View Product</a>
    //     </div>
    //     `
        
    // })
    const response = await fetchData()
    

   
    // const response = await data.tshirt
    let displayObject ;
     if(!isNaN(id)) {
        console.log('asd')
    let oject = response.filter(obj => {
        return obj.id <= parseInt(page) * 8 && obj.id >=  parseInt(page) * 8 - 8
    })
     displayObject =  oject.map((key,index) => {
            const {title,price,image,id} = key
            if(index >= 8) {
                return;
            }
            console.log(image)
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
    <p class="price">${price}.00</p>
    <a class="view-btn" href="product-view.html#/${id}">View Product</a>
    </div>
    `
})
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