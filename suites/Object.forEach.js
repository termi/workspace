var Suitest = require('../lib/Suitest/suitest.js');

void function() {
	/**
	 * @expose
	 */
	if (!Object.forEach) {
		Object.forEach = function(object, callback, context) {
			if (Object.prototype.toString.call(object) !== '[object Object]') {
				throw new TypeError('Object.forEach called on a non-object');
			}

			if (typeof callback !== 'function') {
				throw new TypeError(callback + ' is not a function');
			}

			var __own__ = Object.prototype.hasOwnProperty, key;

			for (key in object) {
				if (__own__.call(object, key)) {
					if (callback.call(context, key, object[key], object) === false) {
						break;
					}
				}
			}
		};
	}


	var object = {
		foo: 1,
		bar: 2
	};

	new Suitest('Object.forEach')
		.test('exists', function() {
			this
				.describe('Object.forEach is a function')
				.exec(typeof Object.forEach, 'function')
				.done();
		})

		.test('@param { Object }: object', function() {
			try {
				Object.forEach([], function(key, value, object) {});
			}
			catch (error) {
				this
					.describe('The first param must be an object')
					.exec(error.message, 'Object.forEach called on a non-object')
					.done();
			}
		})

		.test('@param { Function }: callback', function() {
			try {
				Object.forEach([], function(key, value, object) {});
			}
			catch (error) {
				this
					.describe('The second param must be a function')
					.exec(error)
					.done();
			}
		})

		.test('@param { Function }: callback->key', function() {
			var result = '';

			Object.forEach(object, function(key, value, object) {
				result += key;
			});

			this
				.exec(result, 'foobar')
				.done();
		})

		.test('@param { Function }: callback->value', function() {
			var result = 0;

			Object.forEach(object, function(key, value, object) {
				result += value;
			});

			this
				.exec(result, 3)
				.done();
		})

		.test('@param { Function }: callback->key / value', function() {
			var result = '';

			Object.forEach(object, function(key, value, object) {
				result += (key + value);
			});

			this
				.exec(result, 'foo1bar2')
				.done();
		})

		.test('@param { Function }: callback->object', function() {
			var result = false;

			Object.forEach(object, function(key, value, object) {
				result = 'foo' in object;
			});

			this
				.exec(result, true, 'eg')
				.done();
		})

		.test('@param { Object }: context', function() {
			var context = {
				foo: 2,
				bar: 3
			};

			var result = 0;

			Object.forEach(object, function(key, value, object) {
				result += this[key];
			}, context);

			this
				.exec(result, 5)
				.done();
		})

		.test('@param { Function }: callback->break', function() {
			var context = {
				foo: 2,
				bar: 3
			};

			var result = 0;

			Object.forEach(object, function(key, value, object) {
				result = key

				if (key == 'foo')
					return false;
			}, context);

			this
				.exec(result, 'foo')
				.done();
		})
}();