axios.defaults.baseURL = 'https://hmajax.itheima.net'

const showToast = (msg)=>{
    const toastDom = document.querySelector('.my-toast')
    const toast = new bootstrap.Toast(toastDom)

    document.querySelector('.toast-body').innerHTML = msg
    toast.show()
}

const checkToken = e=>{
    const {token} = JSON.parse(localStorage.getItem('userMsg') || {})

    if(!token){
        showToast("请先登录")

        setTimeout(()=>{
            location.href = './login.html'
        },1500)
    }
}

const renderUname = e=>{
    const {username} = JSON.parse(localStorage.getItem('userMsg') || {})

    if(username){
        document.querySelector('.username').innerHTML = username
    }
}

const logout = e =>{
    localStorage.removeItem('userMsg')

    showToast('退出登录成功！')

    setTimeout(()=>{
        location.href = './login.html'
    },1500)
}
