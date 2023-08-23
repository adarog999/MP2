function getRecommendations(tags) {
    fetch("https://adarog999.github.io/MP2/assets/json/products.json")
    .then(res => res.json())
    .then(data => {
        let combinedArray = [];

    for (let key in data) {
        combinedArray = combinedArray.concat(data[key]);
    }
    let recommended = combinedArray.filter(x => {
        return x.tags == tags
    }) 
    console.log(recommended)
    // console.log(product.images)
    return recommended
    }).then(reco => {
        console.log(reco)

        let recom = reco
        for (let i = recom.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = recom[i];
            recom[i] = recom[j];
            recom[j] = temp;
          }
        console.log(recom,'this123')
        let arr = '' 
        recom.forEach(x => {
            arr += `
            <div class="product-wrap">
            <div class="img">
            <img src="${x.image}" alt="">
            </div>
            <div class="details">
              <span class="names">${x.title.slice(0,15)}...</span>
              <span class="prices">${x.price.toLocaleString("en-US")}.00 PHP</span>
              <a onclick="reload('${id}')" href="#/${x.id}">View Product</a>
            </div>
        </div>
            `
        })
        imagesContainers.innerHTML = arr
    })
}