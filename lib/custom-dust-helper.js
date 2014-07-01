
//We require that dustjs, and the dustjs-helpers have been loaded. The way we invoke this function will ensure that.
(function (dust) {

    //Create a helper called 'formatDate'
    dust.helpers.formatDate = function (chunk, context, bodies, params) {

    	var value = dust.helpers.tap(params.value, chunk, context),
        timestamp,
        month,
        date,
        year;

    timestamp = new Date(value);
    month = timestamp.getMonth() + 1;
    if(month < 10)
    {
    	month = '0' + month;
    }
    
    date = timestamp.getDate();
    if(date < 10)
	{
    	date = '0' + date;
	}
    year = timestamp.getFullYear();

    return chunk.write(month + '-' + date + '-' + year);
    };

})(typeof exports !== 'undefined' ? module.exports = require('dustjs-helpers') : dust);
