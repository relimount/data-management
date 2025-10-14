const loginForm = document.querySelector('login-form')

document.querySelector('#btn-login').addEventListener('click',()=>{
    const data = serialize(loginForm,{hash:true,empty:true})

    if(!data.username || !data.password){
        return showToast("请输入账号或密码")
    }

    if(data.username.length <8 || data.username.length > 30){
        return showToast("用户格式错误")
    }

    if(data.password.length <8 || data.password.length > 30){
        return showToast("密码格式错误")
    }
})