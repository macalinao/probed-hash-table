var PHT = module.exports = function PHT(size, strategy, hashFn) {
  // Array to store contents
  this.arr = new Array(size);

  // The strategy for probing
  this.strategy = strategy;

  // The hash function
  if (hashFn) {
    this.hashFn = hashFn;
  } else {
    this.hashFn = function(str) {
      // Use prime numbers for randomness
      var hash = 7;
      for (var i = 0; i < str.length; i++) {
        hash = hash * 31 + str.charCodeAt(i);
      }
      return hash;
    };
  }
};

/**
 * Linear probing strategy.
 */
PHT.Linear = {
  probe: function(key) {
    var hash = this.hashFn(key);
    var ix = hash % this.arr.length;

    // Initial value
    var init = ix;

    // Search for the key present
    // Also search for empty
    while (typeof this.arr[ix] !== 'undefined'
        && (this.arr[ix] || [])[0] !== key) {
      ix++;
      ix %= this.arr.length; // Wrap around

      // ensure no repeats
      if (ix === init) return false;
    }

    return ix;
  },
  find: function(key) {
    var hash = this.hashFn(key);
    var ix = hash % this.arr.length;

    // Initial value
    var init = ix;

    // Search for the key present
    while ((this.arr[ix] || [])[0] !== key) {
      ix++;
      ix %= this.arr.length; // Wrap around

      // ensure no repeats
      if (ix === init) return false;
    }

    return ix;
  }
};

/**
 * Gets a value
 */
PHT.prototype.get = function(key) {
  var index = this.strategy.find.call(this, key);
  if (index === false) return null;
  return this.arr[index][1];
};

/**
 * Puts a value
 */
PHT.prototype.put = function(key, value) {
  var index = this.strategy.probe.call(this, key);
  if (index === false) throw new Error('Map is full');
  this.arr[index] = [key, value];
};
