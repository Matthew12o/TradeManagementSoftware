const axios = require('axios');
const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false
});

axios.get('https://127.0.0.1:8080/v1/api/sso/validate', {httpsAgent: agent}).then((response) => {
    console.log(response.data);
}).catch((err) => {console.error(err.code)});
