import withAxios from '../utils/withAxios'

const apiConfig = [
    {
        name: 'userLogin',
        url: '/login',
        method: 'get'
    },
    {
        name: 'getUserInfo',
        url: '/login/user',
        method: 'get'
    },
    {
        name: 'getDepList',
        url: '/login/department',
        method: 'get'
    }
]

export default withAxios(apiConfig)