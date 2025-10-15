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

        // 支持后端两种返回格式：
        // 1) { message, data: { username, token } }
        // 2) { message, username, token }
        const resp = res || {}
        const payload = resp.data || resp
        const inner = payload.data || payload

        if(!inner || !inner.token){
            return showToast(resp.message || '登录失败，响应格式错误')
        }

        const obj = { username: inner.username, token: inner.token }
        localStorage.setItem('userMsg', JSON.stringify(obj))
        showToast(resp.message || '登录成功')
        setTimeout(()=>{
            location.href = './index.html'
        },1500)
    } catch(err){
        // Prefer server message, otherwise use generic message
        const msg = err && err.response && err.response.data && err.response.data.message ? err.response.data.message : (err && err.message) || '请求出错'
        return showToast(msg)
    }
})