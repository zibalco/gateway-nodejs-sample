const zibal = require('./zibal');

var trackId;
zibal.request(2000, {
    feeMode: 1,
    description: "NODEJS TEST"
    // multiplexingInfos will go here
}, function(body){
    // redircet to start page
    trackId = body.trackId;
    console.log('GATEWAY URL:', "https://gateway.zibal.ir/start/" + body.trackId);
});

// Call verify when payment session is over
if (false){
    zibal.verify(trackId, function(body){
        // PAYMENT SESSION IS OVER
    })
}
