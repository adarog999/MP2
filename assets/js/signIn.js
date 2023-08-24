let signinBtn = document.querySelector(".signinBtn")
let username = document.querySelector("#username")
let password = document.querySelector("#password")
let errorLogin = document.querySelector(".errorLogin")
let errMessage = document.querySelector(".errMessage")
let successSignUp = document.querySelector(".successSignUp")
let allSeller = []
const seller = async ()=>{
    let fetchData = await fetch("https://adarog999.github.io/MP2/assets/json/seller.json")
    let resp = await fetchData.json()
    allSeller = resp.seller
}
seller()

let isLogout = localStorage.getItem("isLogout")|| false;
let successMessage = document.querySelector(".successMessage")
if(isLogout == true || isLogout == "true") {
    successSignUp.style.display = "flex"
    successMessage.textContent = "You are now Logout"
}
let isSuccessSignUp = localStorage.getItem("isSuccess") || false;
let successClose = document.querySelector(".successClose")
if(isSuccessSignUp == true || isSuccessSignUp == "true") {
    successSignUp.style.display = "flex"
}
successClose.addEventListener("click",()=> {
    localStorage.setItem("isSuccess",false)
    localStorage.setItem("isLogout",false)
    successSignUp.style.display = "none"
})
signinBtn.addEventListener("click",(e)=> {
    let findSeller = allSeller.find(x => {
        return x.username == username.value && x.password == password.value
    })
    console.log(findSeller)
    if(findSeller !== undefined && findSeller !== "undefined") {
        e.preventDefault()
        localStorage.setItem("selllerAcc",JSON.stringify(findSeller))
        location.replace("sellerProfile.html")
        return
    }
    let isLogin = localStorage.getItem("isLogin") || false;
    let users = JSON.parse(localStorage.getItem("users")) || []
    e.preventDefault()
    let checkUser = users.find(x => {
        return x.username == username.value && x.password == password.value
    })
    if(username.value == ""  || password.value == "") {
        errorLogin.style.display = "flex"
        errMessage.textContent = "Please fill All Fields"
    }
   
    else if(checkUser == -1 || checkUser == undefined) {
        errorLogin.style.display = "flex"
        errMessage.textContent = "Invalid Credentials"

    } else {
        isLogin = true
        localStorage.setItem("isLogin",true)
        signinBtn.textContent = "logging in ...."
        location.replace("shop.html")
    }
  
})
let closeErr = document.querySelector(".closeErr")
closeErr.addEventListener("click",()=> {
    let errorLogin = document.querySelector(".errorLogin")
    errorLogin.style.display = "none"
})
let showPass = document.querySelector(".showPass")
let unShowPass = document.querySelector(".unShowPass")

showPass.addEventListener("click",()=> {
    password.type = password.type == "password" ? "text" : "password"
    showPass.style.display = "none"
    unShowPass.style.display = "block"
})
unShowPass.addEventListener("click",()=> {
    password.type = password.type == "password" ? "text" : "password"
    showPass.style.display = "block"
    unShowPass.style.display = "none"
})