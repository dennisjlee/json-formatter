
JSONFormatter = (function() {

  var init = function( json, options ) { 
    
    // default settings
    var settings = $.extend( {
      'appendTo' : 'body',
      'json' : json,
      'listId' : 'json',
      'collapse' : false
    }, options);
    
    var loopCount = 0;
    
    loopObjectOfObjects = function(json2, ulId) {
      $.each(json2, function(k3, v3) {
        // object of objects
        if(typeof v3 == 'object') {
          $('#' + ulId).append('<li><span>{</span> <ul id="' + ulId + '-' + k3 + '"></ul></li>');
          $.each(v3, function(k4, v4) {
            if(typeof v4 == 'object' && v4 != null) {
              $('#' + ulId + '-' + k3).append('<li>' + k4 + ' <span>{</span> <ul id="'+k4+'-'+loopCount+'"></ul></li>');
              loopAgain(v4, k4, k4 + '-' + loopCount);
            }
            else {
              $('#' + ulId + '-' + k3).append('<li>' + k4 + ': ' + v4 + '</li>');
            }

          });
        } 
        else {
          // normal array
          $('#' + ulId).append('<li>' + v3 + '</li>')
        }
      });
    },

    loopAgain = function(v, k, ulId) {
      loopCount++;
      $.each(v, function(nextKey, nextVal) {
        var nextListId = nextKey + '-' + loopCount;
        var newList = '<ul id="' + nextListId + '"></ul>';
        if(nextVal != null && typeof nextVal == 'object') {
          if(nextVal.length == 0) {
            // an empty object, just output that
            $('#' + ulId).append('<li><i>' + nextKey + ':</i> []</li>');
          } 
          else if(nextVal.length >= 1) {
            // an object of objects
            $('#' + ulId).append('<li><b>' + nextKey + ':</b> <span>[</span> ' + newList + '</li>');
            loopObjectOfObjects(nextVal, nextListId);
          }
          else if(nextVal.length == undefined) {
            // next node
            $('#' + ulId).append('<li><b>' + nextKey + ':</b> <span>{</span> ' + newList + '</li>');
            loopAgain(nextVal, nextKey, nextListId);
          }        
        }
        else {
          // value|key
          $('#' + ulId).append('<li><i>'+ nextKey + ':</i> ' + nextVal + '</li>');
        }
      });
    },
    
    addClosingBraces = function() {
      $('#' + settings.listId + ' span').each(function() {
        var closingBrace = '<span>}</span>';
        if($(this).text() == "[") {
          closingBrace = '<span>]</span>';
        }
        $(this).parent().find('ul').eq(0).after(closingBrace);
      });      
    };

    var jsonList = $('<ul id="' + settings.listId + '" />');

    $(settings.appendTo).append(jsonList);

    $.each(settings.json, function(key, val) {
      if(typeof val == 'object') {
        $('#' + settings.listId).append('<li><b>' + key + ':</b> <span>{</span><ul id="' + key + '-' + loopCount + '"></ul></li>');
        loopAgain(val, key, key + '-' + loopCount);
      }
      else {
        $('#' + settings.listId).append('<li><i>' + key + ':</i> ' + val + '</li>');
      }
    });
    
    addClosingBraces();
    
    if(settings.collapse) {
      addToggles(settings.listId);      
    }
    
  },
  
  addToggles = function( listId ) {
    $('#' + listId + " > li").find('ul').each(function() {
      $(this).parent().find('span').eq(0).after('<span class="toggle fake-link"> - </span>');
    });

    $('.toggle').next().slideUp().end().text(' + ');

    $('.toggle').live('click', function() {
      if($(this).next().is(":visible")) {
        $(this).next().slideUp().end().text(' + ');
      }
      else {
        $(this).next().slideDown().end().text(' - ');
      }
    });
  };
  
  return {

    format: function(json, options) {
      init(json, options);
    }

  }
  

})();