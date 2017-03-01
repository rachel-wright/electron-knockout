const VM = require('../models/peopleModel');

function showMainContent() {
	$('#main').load('app/one/view.pug');
}

module.exports = {
    showMainContent
}


