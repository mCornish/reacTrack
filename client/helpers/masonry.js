var Masonry = require('masonry-layout');

exports.init = function() {
	var container = document.querySelector('.js-masonry');
	console.log(container);
	new Masonry( container, {
		gutter: 20,
		isFitWidth: true,
		itemSelector: '.js-item'
	});
}
