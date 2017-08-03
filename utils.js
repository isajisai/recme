/////////////////////////////////
// UTILITIES AND MISC. HELPERS //
/////////////////////////////////

// TO DO (13:28 08-03-17) :
// 1. Comments
// 2. Clean code (optimize)
// 3. Abstractions

Array.prototype.contains = function(item) {
	for (var i in this) {
		if (i == item) return true;
	}
	return false;
};

function min_with_fn(s, key_fn) {
	var minimum = key_fn(s[0]);
	var value_of_minimum = s[0];
	for (var i = 0, max = s.length; i < max; i++) {
		var curr = key_fn(s[i]);
		if (curr < minimum) {
			minimum = curr;
			value_of_minimum = s[i];
		}
	}
	return value_of_minimum;
}

function map(s, map_fn) {
	var to_return = [];
	for (var i = 0, max = s.length; i < max; i++) {
		to_return.push(map_fn(s[i]));
	}
	return to_return;
}

function map_and_filter(s, map_fn, filter_fn) {
	var to_return = [];
	for (var i = 0, max = s.length; i < max; i++) {
		if (filter_fn(s[i])) to_return.push(map_fn(i));
	}
	return to_return;
}

function key_of_min_value(d) {
    var keys = Object.keys(d);
    var minimum = d[keys[0]];
    var minimum_key = keys[0];
    for (var i = 0, max = keys.length; i < max; i++) {
      var k = keys[i];
      if (d[k] < minimum) {
        minimum = d[k];
        minimum_key = k;
      }
    }
    return minimum_key; 
}

function zip() {
	var to_return = [];
	for (var i = 0, max0 = arguments[0].length; i < max0; i++) {
		var to_push = [];
		for (var j = 0, max1 = arguments.length; j < max1; j++) {
			to_push.push(arguments[j][i]);
		}
		to_return.push(to_push);
	}
	return to_return;
}

function enumerate(s, start=0) {
	var to_zip = [];
	for (var i = start, max = s.length + start; i < max; i++) {
		to_zip.push(i);
	}
	return zip(to_zip, s);
}

function distance(p1, p2) {
	return Math.sqrt(Math.pow((p1[0] - p2[0]), 2) + Math.pow*((p1[0] - p2[0]), 2));
}

function mean(s) {
	var sum = s.reduce(function(a, b) { return a + b; }, 0);
	return sum / s.length;
}

function sample(s, k) {
	var to_return = [], n = s.length, j;
	while (n) {
		j = Math.floor(Math.random() * n--);
		to_return.push(s.splice(j, 1)[0]);
	}
	return to_return.slice(0, k);
}

function find_closest(location, centroids) {
	return min_with_fn(centroids, function(centroid) { return distance(location, centroid); });
}

function group_by_first(pairs) {
	var keys = [];
	var to_return = [];
	for (var i = 0, max0 = pairs.length; i < max0; i++) {
		var curr_key = pairs[i][0];
		if (!keys.contains(curr_key)) keys.push(curr_key);
	}
	for (var j = 0, max1 = keys.length; j < max1; j++) {
	  var ref_key = keys[j];
		var curr_group = [];
		for (var k = 0, max2 = pairs.length; k < max2; k++) {
			curr_val = pairs[k][0];
			if (curr_val == ref_key) curr_group.push(pairs[k][1]);
		}
		to_return.push(curr_group);
	}
	return to_return;
}

function group_by_centroid(restaurants, centroids) {
	var restaurant_centroid_pairs = [];
	for (var i = 0, max0 = restaurants.length; i < max0; i++) {
		var curr_restaurant = restaurants[i];
		var curr_pair = [find_closest(restaurant_location(curr_restaurant), centroids), curr_restaurant];
		restaurant_centroid_pairs.push(curr_pair);
	}
	return group_by_first(restaurant_centroid_pairs);
}

function find_centroid(cluster) {
	var x_coords = [];
	var y_coords = [];
	for (var i = 0, max0 = cluster.length; i < max0; i++) {
		var curr_restaurant = cluster[i];
		x_coords.push(restaurant_location(curr_restaurant)[0]);
		y_coords.push(restaurant_location(curr_restaurant)[1]);
	}
	return [mean(x_coords), mean(y_coords)];
}

function k_means(restaurants, k, max_updates=100) {
	var old_centroids = [], clusters = [], n = 0;
	var select_restaurants = sample(restaurants, k);
	var centroids = map(select_restaurants, function(restaurant) { return restaurant_location(restaurant); });
	while ((old_centroids !== centroids) && (n < max_updates)) {
		old_centroids = centroids;
		cluster = group_by_centroid(restaurants, centroids);
		for (var i = 0, max = cluster.length; i < max; i++) {
			centroids[i]
		}
		n++;
	}
	return centroids;
}
