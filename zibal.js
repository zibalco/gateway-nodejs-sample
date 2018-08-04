var req = require('request');

let globals = {
    merchant: 'zibal',
    callbackUrl: 'http://yourapiurl.com/callbackUrl',
    apiUrl: "https://gateway.zibal.ir/"
}
// REQUEST OBJECT SCHEMA


function request(amount, extras, callbackFunction){
    if (!extras){
        extras = {};
    }
    let extraProperties = ['mobile', 'description', 'multiplexingInfos', 'feeMode', 'percentMode']
    let data = {
        merchant: globals.merchant,
        callbackUrl: globals.callbackUrl,
        amount: amount
    }

    extraProperties.forEach(element => {
        if (extras[element]){
            data[element] = extras[element];
        }
    });

    post(data, 'request', function(err, httpResponse, body){
        if (err){
            return console.error("REQUEST ENDPOINT FAILED: ", err)
        }
        else{
            console.log("REQUEST SUCCESSFUL:\n", JSON.stringify(body, null, 4));
            callbackFunction(body);
        }
    })
}

function verify(trackId, callbackFunction){
    let data = {
        trackId: trackId,
        merchant: globals.merchant
    }

    post(data,'verify', function(err, httpResponse, body){
        if (err){
            return console.error("VERIFY ENDPOINT FAILED: ", err)
        }
        else{
            console.log("VERIFY SUCCESSFUL:\n", JSON.stringify(body, null, 4));
            callbackFunction(body);
        }
    })
}

function post(payload, path, callbackFunction){
    let url = globals.apiUrl + path;
    console.log('POST: \n' + JSON.stringify(payload, null, 4) + '\nTO: ' + url);
    req({uri: url, json: payload, method: 'POST'}, callbackFunction)
}

exports.request = request;
exports.verify = verify;