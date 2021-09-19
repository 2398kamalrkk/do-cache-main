'use strict';

function Runtime_Cache () {
  var _cache = Object.create(null);
  var _cache_size = 0;
  this.put = function(mapKey, value, doOverwrite, time) {
  

    if (time && typeof time !== 'undefined' && (isNaN(time) || time <= 0 || typeof time !== 'number' )) {
      throw new Error('Invalid timeout value. Please enter a positive number!');
    }
    var previousValue = _cache[mapKey];
    if(previousValue)
    {
        if(!doOverwrite)
        {
            throw new Error('Cannot overwrite existing record as overwrite flag is not set');
        }
    }
    if (previousValue) {
      clearTimeout(previousValue.timeout);
    } else {
      _cache_size++;
    }

    var record = {
      value: value,
      expire: time + Date.now()
    };

    if (!isNaN(record.expire)) {
      record.timeout = setTimeout(function() {
      }.bind(this), time);
    }

    _cache[mapKey] = record;

    return value;
  };

  this.delete = function(mapKey) {
    var canDelete = true;

    var previousValue = _cache[mapKey];
    if (previousValue) {
      clearTimeout(previousValue.timeout);
    } else {
      canDelete = false;
    }

    if (canDelete) {
      _del(mapKey);
    }

    return canDelete;
  };

  function _del(mapKey){
    _cache_size--;
    delete _cache[mapKey];
  }

  this.clearCache = function() {
    for (var mapKey in _cache) {
      clearTimeout(_cache[mapKey].timeout);
    }
    _cache_size = 0;
    _cache = Object.create(null);
  };

  this.get = function(mapKey) {
    var data = _cache[mapKey];
    if (typeof data != "undefined") {
      if (isNaN(data.expire) || data.expire >= Date.now()) {
        return data.value;
      } else {
        // free some space
        _cache_size--;
        delete _cache[mapKey];
      }
    }
    return null;
  };

  this.size = function() {
    return _cache_size;
  };

  this.memsize = function() {
    var size = 0,
      mapKey;
    for (mapKey in _cache) {
      size++;
    }
    return size;
  };


  this.getAllKeys = function() {
    return Object.keys(_cache);
  };
}

module.exports = new Runtime_Cache();
module.exports.Runtime_Cache = Runtime_Cache;