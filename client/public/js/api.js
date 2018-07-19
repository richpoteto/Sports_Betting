
function execApiCall (url, method, data, callback) {
    console.log('calling ' + url);

    if (!callback) 
        callback = () => {};

    var options = {
        method: method,
        contentType: 'application/json',
        cache: false,
        beforeSend: (req) => {
            
        },
        success: function (result) {
            console.log(result);
            callback(result, null);
        },
        error: function (err) {
            console.log(err);
            callback(null, err);
        }
    };

    if (data) {
        options.dataType = 'json';
        options.data = JSON.stringify(data);
        //alert(options.data);
    }

    $.ajax(url, options);
}

function getMatches(pendingOnly, callback) {
    execApiCall(config.apiUrl + '/matches?pending=' + (pendingOnly ? 'true': 'false'), 'GET', {}, callback);
}

function getMatchDetails(matchId, callback) {
    execApiCall(config.apiUrl + '/matches?id=' + matchId, 'GET', {}, callback);
}

$(document).ready(function () {
    window.api = {
        getMatches,
        getMatchDetails
    };
}); 