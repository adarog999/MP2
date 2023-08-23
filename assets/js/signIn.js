let signinBtn = document.querySelector(".signinBtn")
let username = document.querySelector("#username")
let password = document.querySelector("#password")
let errorLogin = document.querySelector(".errorLogin")
let errMessage = document.querySelector(".errMessage")
let successSignUp = document.querySelector(".successSignUp")
let isSuccessSignUp = localStorage.getItem("isSuccess") || false;
let successClose = document.querySelector(".successClose")
if(isSuccessSignUp == true || isSuccessSignUp == "true") {
    successSignUp.style.display = "flex"
}
successClose.addEventListener("click",()=> {
    localStorage.setItem("isSuccess",false)
    successSignUp.style.display = "none"
})
signinBtn.addEventListener("click",(e)=> {
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
    console.log()
})
console.log(errorLogin)
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