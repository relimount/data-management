document.querySelector('#btn-register').addEventListener('click',async e=>{
    const data = serialize(document.querySelector('.register-form'),{hash:true,empty:true})
    if(!data.username){
        return showToast("请输入用户名")
    }
    if(data.username.length < 8){
        return showToast("请输入正确格式用户名")
    }
    if(!data.password){
        return showToast("请输入密码")
    }
    if(data.password.length < 6){
        return showToast("请输入正确格式密码")
    }

    try{
        const res = await axios.post('/register',data);
        const resp = res || {}
        showToast(resp.message || '注册完成')
        location.href = './login.html'
    }catch(err){
        const msg = err && err.response && err.response.data && err.response.data.message ? err.response.data.message : (err && err.message) || '请求出错'
        showToast(msg)
    }
})
