checkToken()

renderUname()

document.querySelector('#logout').addEventListener('click',e=>{
    logout()
})

const renderOverview = (overview)=>{
    Object.keys(overview).forEach(item=>{
        document.querySelector(`.${item}`).innerHTML = overview[item]
    })
}

const getData = async()=>{
    try{
        // const  {token} = JSON.parse(localStorage.getItem('userMsg') || '{}')

        const res = await axios({
            url:'/dashboard',
            method:'GET',
            // headers:{
            //     Authorization:token
            // }
        })
        console.log(res);

            // axios 响应拦截器已返回 response.data
            // 这里假定 res 为后端 data 对象，包含 data.overview
            if (res && res.data && res.data.overview) {
                renderOverview(res.data.overview)
            } else if (res && res.overview) {
                // 有些接口可能直接把 overview 放在根对象上
                renderOverview(res.overview)
            } else {
                console.warn('dashboard 接口返回格式异常', res)
            }
    }catch(err){
        console.dir(err)
    }
}

getData()

