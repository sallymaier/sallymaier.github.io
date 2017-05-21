# behance-demo

This is an experiment into using Behance as a basic content management sysytem to power a simple portfolio ... basically templating and styling the JSON output from behance.net using just a simple set of mustache templates. This is a starter kit of files and instructions attempting to use the lowest possible barrier to entry tools.

current live demos:<br>
<http://www.connormuething.com/><br>
<http://www.sallymaier.com/><br>
<http://spencenelson.com/>

Outcomes are severely limited due to the constraints of the tools, and some other overarching ideas:

- low barrier to entry
- very little Javascript knowledge required
- all rendering happens in the browser
- edit/design with simple HTML and CSS
- get all data from Behance, little to no project content should live in the HTML
- what content you can show is limited to what content behance's prebuilt API calls return (can rely on behance API documentation for solving data related problems hopefully)

The main point: simple, semi-custom display for your behance projects. Get a nice, simple portfolio up that you still weild some control over, but have very little to manage and upkeep on your end. Make something that can be freely hosted on gh-pages.

Basically, we're providing you a list of projects and you get to decide how to display that list.

As this project evolves more templates, instructions, outcomes, etc. will be created.

## Tools this relies upon

Currently we're using:

- [jquery](http://api.jquery.com/)
- [behance API](https://www.behance.net/dev/api/endpoints/)
- [mustache.js](https://github.com/janl/mustache.js)
- [font awesome](http://fontawesome.io/)

And that's it.

As we build this out more libraries and themes will be added, other things might be listed here (like list.js or masonry or isotope or tachyons or similar...).

## Register w/ Behance to get API key

<https://www.behance.net/dev/register>

- Register your "application" (in this case your app is your website)
- Copy the API key / Client ID, we'll need this.

You can get back to this by going to <https://www.behance.net/dev/apps>

## Reading JSON

It is helpful to have a JSON viewing plugin installed in your browser to make the JSON feeds easier to navigate. One of these will work if you're using chrome: <https://chrome.google.com/webstore/search/jsonView>. This will work if you're using Firefox: <https://addons.mozilla.org/en-US/firefox/addon/jsonview/>. If you're a Safari user try this: <https://github.com/rfletcher/safari-json-formatter> or <https://github.com/acrogenesis/jsonview-safari>.

Your Behance API JSON feed is findable at `https://api.behance.net/v2/users/ + YOURUSERNAME + /projects/?api_key= + YOURAPIKEY + &per_page=25&callback=?;`

Documentation on the Behance API is found here: <https://www.behance.net/dev/api/endpoints/>

## Themes

Currently there are two starter themes in the `layouts`. These are not yet fleshed out themes by any means. However, they do give a basic starter place that has something more going on than just a column of projects. If you've developed a theme that you think others might enjoy, please share it.

More to come.
