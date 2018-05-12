var axios = require('axios')

module.exports = async (ctx) => {
    console.log(ctx.query)
    var result = await axios.get('https://api.weixin.qq.com/sns/jscode2session',
        {
            params: {
                appid: 'wx356c13814b94acc1',
                secret: 'c7b30b72d8e46c65c0c5444f8dcd3cd3',
                js_code: ctx.query.code,
                grant_type: 'authorization_code'
            }
        }
    )

    ctx.response.type = "application/json";
    ctx.state.data = result.data;
}