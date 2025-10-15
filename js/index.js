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

        const respData = res && res.data ? res.data : null
        const inner = respData && respData.data ? respData.data : null

        if(inner && inner.overview){
            renderOverview(inner.overview)
        } else {
            console.warn('dashboard 接口返回格式异常', res)
        }
    }catch(err){
        console.dir(err)
        if(err.response.status == 401){
            showToast('登录过期，请重新登录')
            localStorage.removeItem('userMsg')
            setTimeout(()=>{
                location.href = './login.html'
            },1500)
        }
    }
}

getData()

