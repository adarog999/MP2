let orderList = JSON.parse(localStorage.getItem("orderList")) || []
let ordersListDiv = document.getElementById("ordersList")
console.log(orderList)


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
                    <p>${order.address}</p>
                </div>
                <div class="orderDetails">
                    
                <div class="image">
                    <img  src="${image}" alt="">
                </div>
                <div>
                    <span>YOUR ORDER IS CONFIRMED</span>
                    <div>
                        <span>${title}</span>
                    </div>
                    <div>
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
                        <span>${order.quantity}</span>
                    </div>
                    
                    </div>
                    <div class="charges">
                        <div class="shipCharge">  
                            <span>50.00</span>
                        </div>
                        <div class="total">  
                            <span>${((parseInt(findProduct.price) * parseInt(order.quantity))-50).toLocaleString("en-US")}.00 PHP</span>
                        </div>
                        <button>Track Order</button>
                </div>
                </div>
    
            </div>
                `
        });
        ordersListDiv.innerHTML = orderStorage
    }) 
   
}
displayOrders()
