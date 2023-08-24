let signUpBtn = document.querySelector(".signUpBtn")
let password1 = document.getElementById("password")
let password2 = document.getElementById("confirmPass")
let errorSignup = document.querySelector(".errorSignup")
let errMessage  = document.querySelector(".errMessage")
let radioName = document.getElementsByName("role")
let terms = document.getElementById("terms")
let username = document.getElementById("username")
let closeErr = document.getElementById("closeErr")
let SignUploading =  document.querySelector(".SignUploading")
closeErr.addEventListener("click",()=> {
    errorSignup.style.display = "none"
})
signUpBtn.addEventListener("click",(e)=> {
    let userAcc = JSON.parse(localStorage.getItem("users")) || [];
    let successSignup = localStorage.getItem("isSuccess") || false;
    let checkeOption = document.querySelector('input[type = radio]:checked')
    let isExist = userAcc.find(x=> {
        return x.username == username.value
    })
    e.preventDefault()
    let user = {
        username: '',
        password: '',
        role:'',
    }
    if( username.value.length == "" ||
        password1.value.length == ""
    ) {
        errorSignup.style.display = "flex"
        errMessage.textContent = "Please fill all input Fields" 
    }
    else if(username.value.length < 5 ) {
        errorSignup.style.display = "flex"
        errMessage.textContent = "Username must be atleast 5 letters" 
    }

    else if(password1.value !== password2.value) {
        errorSignup.style.display = "flex"
        errMessage.textContent = "Password did not match"
    } else if (password1 < 9 ) {
        errorSignup.style.display = "flex"
        errMessage.textContent = "Password must be atleast 8 chararcter"
    } else if (checkeOption == null) {
        errorSignup.style.display = "flex"
        errMessage.textContent = "Please choose Options" 
    } 
    else if(!terms.checked) {
        errorSignup.style.display = "flex"
        errMessage.textContent = "Check the terms & condition" 
    } else if (isExist !== undefined) {
        errorSignup.style.display = "flex"
        errMessage.textContent = "Username Already Exist" 
    } 
    else {
        user.username = username.value
        user.password = password1.value
        user.role = checkeOption.value
        userAcc.push(user)
        localStorage.setItem("users",JSON.stringify(userAcc))
        SignUploading.style.display = "flex"
        signUpBtn.textContent = "Signing Up ...."
        successSignup = true
        localStorage.setItem("isSuccess",true)
        setTimeout(() => {
            location.replace("sign-in.html")
        },1500)
    }

})


let pass1Show = document.querySelector(".pass1Show")
let pass1UnShow = document.querySelector(".pass1UnShow")
let pass2Show = document.querySelector(".pass2Show")
let pass2UnShow = document.querySelector(".pass2UnShow")

pass1Show.addEventListener("click",()=> {
    console.log("asd1")
    console.log(password1.type)
    password1.type = password1.type == "password" ? "text": "password";
    pass1UnShow.style.display = "flex"
    pass1Show.style.display = "none"
})
pass1UnShow.addEventListener("click",()=> {
    console.log("asd1")
    console.log(password1.type)
    password1.type = password1.type == "password" ? "text": "password";
    pass1UnShow.style.display = "none"
    pass1Show.style.display = "flex"
    console.log('asd')
})

pass2Show.addEventListener("click",()=> {
    console.log("asd1")
    console.log(password1.type)
    password2.type = password2.type == "password" ? "text": "password";
    pass2UnShow.style.display = "flex"
    pass2Show.style.display = "none"
})
pass2UnShow.addEventListener("click",()=> {
    console.log("asd1")
    console.log(password1.type)
    password2.type = password2.type == "password" ? "text": "password";
    pass2UnShow.style.display = "none"
    pass2Show.style.display = "flex"
})

