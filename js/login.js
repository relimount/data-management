const loginForm = document.querySelector('.login-form')

document.querySelector('#btn-login').addEventListener('click', async e =>{
    const data = serialize(loginForm,{hash:true,empty:true})

    if(!data.username || !data.password){
        return showToast("请输入账号或密码")
    }

    if(data.username.length <8 || data.username.length > 30){
        return showToast("用户格式错误")
    }

    if(data.password.length <6 || data.password.length > 30){
        return showToast("密码格式错误")
    }

    try{
        const res = await axios.post('/login', data);
        const obj = {}
        obj.username = res.data.data.username
        localStorage.setItem('userMsg',JSON.stringify(obj))
        showToast(res.data.message)
        setTimeout(()=>{
            location.href = './index.html'
        },1500)
    } catch(err){
        return showToast(err.response.data.message)
    }
})