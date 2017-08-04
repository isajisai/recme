/////////////////////////////////
// UTILITIES AND MISC. HELPERS //
/////////////////////////////////

// TO DO (22:01 08-03-17) :
// 1. Clean code (optimize)
// 2. Comments

//////////////////
// ABSTRACTIONS //
//////////////////

// Reviews

function make_review(restaurant_name, rating) {
	return [restaurant_name, rating];
}

function review_restaurant_name(review) {
	return review[0];
}

function review_rating(review) {
	return review[1];
}

// Users

function make_user(name, reviews) {
	var review_dict;
	for (var i = 0, max = reviews.length; i < max; i++) {
		var curr_review = reviews[i];
		review_dict.push([review_restaurant_name(curr_review), curr_review])
	}
	return [name, review_dict];
}

function user_name(user) {
	return user[0];
}

function user_reviews(user) {
	return user[1];
}

function user_reviewed_restaurants(user, restaurants) {
	var reviews = user_reviews(user);
	var names = [];
	var to_return = [];
	for (var i = 0, max = restaurants.length; i < max; i++) {
		names.push(restaurant_name(restaurants[i]));
	}
	for (var i = 0, max = reviews.length; i < max; i++) {
		if (names.contains(review_restaurant_name(reviews[i]))) {
			to_return.push(reviews[i]);
		}
	}
	return to_return;
}

function user_rating(user, restaurant_name) {
	var reviews = user_reviews(user);
	var user_review = reviews.retrieve(restaurant_name);
	return review_rating(user_review);
}

// Restaurants

function make_restaurant(name, location, categories, price, reviews) {
	return [name, location, categories, price, reviews];
}

function restaurant_name(restaurant){
    return restaurant[0];
}

function restaurant_location(restaurant) {
    return restaurant[1];
}

function restaurant_categories(restaurant) {
    return restaurant[2];
}

function restaurant_price(restaurant){
    return restaurant[3];
}

function restaurant_ratings(restaurant){
	var reviews = restaurant[4];
	var to_return = [];
	for (var i = 0, max = reviews.length; i < max; i++) {
		to_return.push(review_rating(reviews[i]));
	}
	return to_return;
}

// Utilities 

Array.prototype.retrieve = function(key) {
	for (var i = 0, max = this.length; i < max; i++) {
		if (this[i][0] == key) return this[i][1];
	}
	return;
};

Array.prototype.contains = function(item) {
	/* Returns whether or not the item is an element of
	the array. */
	for (var i = 0, max = this.length; i < max; i++) {
		if (this[i] == item) return true;
	}
	return false;
};

function min_with_fn(s, key_fn) {
	/* Returns the value in s for which the result of 
	calling key_fn on that value is the minimum among all 
	values in s. */
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
	/* Takes a sequence s and returns another sequence of 
	the results of calling map_fn on each value in s. */
	var to_return = [];
	for (var i = 0, max = s.length; i < max; i++) {
		to_return.push(map_fn(s[i]));
	}
	return to_return;
}

function map_and_filter(s, map_fn, filter_fn) {
	/* Takes a sequence s and returns another sequence of
	the results of calling map_fn on each value in s that 
	satisfies filter_fn are. */
	var to_return = [];
	for (var i = 0, max = s.length; i < max; i++) {
		if (filter_fn(s[i])) to_return.push(map_fn(i));
	}
	return to_return;
}

function key_of_min_value(d) {
	/* Given dictionary d, returns key of the minimum value
	of all values in the dictionary. */
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
	/* Takes in a sequence of k sequences, each with n elements,
	and returns a sequence of n sequences in which each ith 
	output sequence contains the ith elements of each input sequence. */
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
	/* Takes in a sequence of k elements and returns a sequence of k 
	pairs where the ith pair is of the form [i+start, sequence[i]]. */
	var to_zip = [];
	for (var i = start, max = s.length + start; i < max; i++) {
		to_zip.push(i);
	}
	return zip(to_zip, s);
}

function distance(p1, p2) {
	/* Returns the Euclidean distance of two given two-element pairs. */
	return Math.sqrt(Math.pow((p1[0] - p2[0]), 2) + Math.pow*((p1[0] - p2[0]), 2));
}

function mean(s) {
	/* Returns the arithmetic mean of all of the elements of s. */
	var sum = s.reduce(function(a, b) { return a + b; }, 0);
	return sum / s.length;
}

function sample(s, k) {
	/* Returns a k-element random sampling of items from the given 
	sequence using the Fisher-Yates shuffling algorithm. */
	var to_return = [], n = s.length, j;
	while (n) {
		j = Math.floor(Math.random() * n--);
		to_return.push(s.splice(j, 1)[0]);
	}
	return to_return.slice(0, k);
}

// Cluster Analysis 

function find_closest(location, centroids) {
	/* Returns the centroid in centroids closest to location. */
	return min_with_fn(centroids, function(centroid) { return distance(location, centroid); });
}

function group_by_first(pairs) {
	/* Given a sequence of pairs s, returns a list of s[i][1]
	(second value in pair) for each unique s[i][0] (first value
	in pair). */
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
	/* Returns a list of restaurant clusters, where each cluster 
	contains all restaurants nearest to a certain centroid in centroids. */
	var restaurant_centroid_pairs = [];
	for (var i = 0, max0 = restaurants.length; i < max0; i++) {
		var curr_restaurant = restaurants[i];
		var curr_pair = [find_closest(restaurant_location(curr_restaurant), centroids), curr_restaurant];
		restaurant_centroid_pairs.push(curr_pair);
	}
	return group_by_first(restaurant_centroid_pairs);
}

function find_centroid(cluster) {
	/* Returns the centroid of the restaurants in cluster. */
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
	/* Uses k-means algorithm to group restaurants by location into k
	separate clusters. */
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
