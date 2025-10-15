axios.defaults.baseURL = 'https://hmajax.itheima.net'

// Safe getter for user message stored in localStorage
const safeGetUserMsg = () => {
    try{
        return JSON.parse(localStorage.getItem('userMsg') || '{}')
    }catch(e){
        return {}
    }
}
axios.defaults.baseURL = 'https://hmajax.itheima.net'
const data = JSON.parse(localStorage.getItem('userMsg') || '{}')
const { token } = data
const showToast = (msg)=>{
    const toastDom = document.querySelector('.my-toast')
    const toast = new bootstrap.Toast(toastDom)

    document.querySelector('.toast-body').innerHTML = msg
    toast.show()
}

const checkToken = e => {
    const { token } = safeGetUserMsg()

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
    const { token } = safeGetUserMsg()
    if (token) config.headers['Authorization'] = token
    return config;
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if(error.response.status == 401){
        showToast('登录过期，请重新登录')
        localStorage.removeItem('userMsg')
        setTimeout(()=>{
            location.href = './login.html'
        },1500)
    }
    return Promise.reject(error);
  });