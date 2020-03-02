import axios from 'axios'
import qs from 'qs'

export default function dataaxios(type,url,data){

  return new Promise((resolve, reject) => {

    // axios默认参数配置
    axios.defaults.baseURL = 'http://www.huijuejia.com';
    axios.defaults.timeout = 10000;

    // 配置请求和响应拦截
		axios.interceptors.request.use(config => {
			// console.log('来到了request拦截success中');
			// 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

			// 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

			// 3.对请求的参数进行序列化(看服务器是否需要序列化)
			// config.data = qs.stringify(config.data)
			// console.log(config);

			// 4.等等
			return config
		}, err => {
			// console.log('来到了request拦截failure中');
			return err
		})

		axios.interceptors.response.use(response => {
			// console.log('来到了response拦截success中');
			return response.data
		}, err => {
			console.log('来到了response拦截failure中');
      console.log(err);
      if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.message = '请求错误'
						break
					case 401:
						err.message = '未授权的访问'
						break
				}
			}
			return err
    })

    function checkStatus (response) {
      // 此处可以封装一些加载状态
      // 如果http状态码正常，则直接返回数据
      if(response) {
        if (response.status === 200 || response.status === 304) {
          return response.data
          // 如果不需要除了data之外的数据，可以直接 return response.data
        } else if (response.status === 401) {
          location.href = '/login';
        } else {
          throw response.data
        }
      } else {
        throw {data:'网络错误'}
      }
      
    }
    
    if(type==="post"){
      axios({
        method: 'post',
        url,
        data: qs.stringify(data),
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
      }).then(res=> {
        resolve(checkStatus(res))
        }
      ).catch(err => {
        reject(err)
      })
  
    }
    if(type==="get"){
      axios({
        method: 'get',
        url,
        params, // get 请求时带的参数
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).then(res => {
          resolve(checkStatus(res))
        }
      ).catch(err => {
        reject(err)
      })
    }
  })
}