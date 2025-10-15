axios.defaults.baseURL = 'https://hmajax.itheima.net'
const data = JSON.parse(localStorage.getItem('userMsg') || '{}')
const { token } = data
const showToast = (msg)=>{
    const toastDom = document.querySelector('.my-toast')
    const toast = new bootstrap.Toast(toastDom)

    document.querySelector('.toast-body').innerHTML = msg
    toast.show()
}

const checkToken = e=>{
    const {token} = data

    if(!token){
        showToast("请先登录")

        setTimeout(()=>{
            location.href = './login.html'
        },1500)
    }
}

const renderUname = e=>{
    const {username} = data

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

axios.interceptors.request.use(config=> {
    // Safe read: parse with fallback to empty object to avoid errors when nothing stored
    if (token) config.headers['Authorization'] = token
    return config;
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });