'use strict';
module.exports = function (arr, pos, item) {
	if (Array.isArray(arr) === false) {
		throw new TypeError('Expected Array got ' + typeof arr);
	}

	var newArr = arr.slice();
	newArr.splice(pos, 0, item);
	return newArr;
};
