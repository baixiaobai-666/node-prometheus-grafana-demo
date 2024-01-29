// src\get-geo.js
const geoip = require('geoip-lite');
const { useCounter } = require('./prom-client');

/* Return Example: 
{
    "range": [3745513472, 3745517567],
    "country": "CN",
    "region": "JS",
    "eu": " 0",
    "timezone": "Asia/Shanghai",
    "city": "Suzhou",
    "ll": [31.3041, 120.5954],
    "metro":  0,
    "area":  20
}
*/
function getGeoDataFromIP(ip) {
    return geoip.lookup(ip);
}

function userRegionStatistic(ip) {
    const geo = getGeoDataFromIP(ip);
    // console.log(`geo=${JSON.stringify(geo, null,  2)}`);

    if (!geo) {
        // 忽略 ' 12 7. 0. 0. 1'等特殊IP导致的数据为null
        return;
    }

    useCounter({
        name: 'UserRegion',
        help: 'user region data from node.js server',
        labels: {
            country: geo.country,
            city: geo.city,
        },
    });
}

module.exports = {
    userRegionStatistic,
};


