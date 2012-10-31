# Jaysun.js (beta)

Jaysun takes JSON and renders it into an HTML list, Based on JSONFormatter by github.com/forward

[View a demo](http://www.peartreefigtree.com)

## Basic usage

This library requires jQuery

Create an instance of the function on the object that contains unformatted JSON:

    $(document).ready(function(){
			
		$('.json').Jaysun({
		  collapse: true, // Setting to 'true' this will format the JSON into a collapsable/expandable tree
		  closed:false //This only is valid if collapse is true, sets if the objects are visible or not
		});
		
	});

## Options

Options may be passed to the function shown below:

      'listID' : The id for the lists
      'collapse' : Determines if the lists are collapsable
      'closed': Determines the default state for the collapsable lists
      'closeIcon': Icon used for when closed
      'openIcon': Icon used for when collapsed
      'resultElement': The ID or class of the element in which to put the result of the format, can be the same as the instanced object

## Styling

A basic stylesheet is available to layout the list slightly nicer than the default styles.

    <link href='jaysun.css' rel='stylesheet' />

## Development

Source hosted at [GitHub](http://github.com/andrefigueira/json-formatter).
Report Issues/Feature requests on [GitHub Issues](http://github.com/andrefigueira/json-formatter/issues).

### Note on Patches/Pull Requests

 * Fork the project.
 * Make your feature addition or bug fix.
 * Add tests for it. This is important so I don't break it in a
   future version unintentionally.
 * Commit, do not mess with rakefile, version, or history.
   (if you want to have your own version, that is fine but bump version in a commit by itself I can ignore when I pull)
 * Send me a pull request. Bonus points for topic branches.

## Copyright

Copyright (c) 2012 André Figueira. See [LICENSE](https://github.com/andrefigueira/json-formatter/blob/master/LICENSE) for details.