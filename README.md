# Stay
**Stay** is a RESTful ajax inplace-editor helper based on jQuery and Unobustorsive javascript.
Similar and inspired by [best_in_place](https://github.com/bernat/best_in_place), with extra
enchancement. Support [TinyMCE](http://tinymce.moxiecode.com/) as its editor.

## Installation
Installation **stay** is simple. In Rails > 3.0 just add **stay** in your Gemfile:

```ruby
  gem "tinymce-rails"
  gem "stay"
```

Then include the following Javascript include into your assets/javascript.js.

```ruby
  //= require jquery
  //= require tinymce-jquery
  //= require stay
```

Then add javascript calling in your Javascript file

```javascript
  $(document).ready(function(){
      jQuery(".stay").stay();
  });
```

or if you're using CoffeScript use

```
  jQuery ->
      jQuery(".stay").stay()
```

### Javascript Callback
**Stay** also accept callback arguments, currently **Stay** only have 3 callback attributes
- beforeSend
- onError
- onSuccess

Below is the examples how to implement **Stay** with callbacks, call this javascript when initalize **Stay**

```javascript
jQuery(".stay").stay({
    beforeSend: function() {
      // Do whatever you want before data is being sent to server, e.g. display the loading bar
    },
    onError: function(errs) {
      // This method takes one argument contains array of errors similar with Obj.errors in Rails
      return $.each(errs, function(key) {
        return alert(key + " " + errs[key]);
      });
    },
    onSuccess: function() {
      // Do whatever you want when server said OK, e.g. hide the loading bar
    }
  });
```
## Usage

### In your View

```
  stay object, field, OPTIONS{}
```

Call this helper in your view to build **Stay**

Example:

```ruby
  stay @user, :name, type: :text_field
```

As default **type** will take :text_field, *for now* you can only pass :text_field, :text_area, :tiny_mce

**Stay** support sub-resources routes, therefore you can pass array into **object** param

Example:

```ruby
  stay [@user, @article], :title, type: :text_area
```

You can use TinyMCE as text editor, just pass :tiny_mce to **type**

Example:

```ruby
  stay [@user, @article], :body, type: :tiny_mce
```

This will use TinyMCE editor with "simple" theme, you can also change this theme by using

```ruby
  stay [@user, @article], :body, type: [:tiny_mce, "advanced"]
```
Now you can pass width and height of tinyMCE using CSS string format

Example

```ruby
  stay [@user, @article], :body, type: [:tiny_mce, "advanced", "100%", "200px"]
```

Remember to put width and height respectively

When called, by default **Stay** triggered by clicking the displayed text on HTML page, submitted by blur, and cancelled by pressing ESC key on your keyboard.
**Stay** accept external trigger, submit, and cancel button:

To use external activator, just passed **activator:** followed by id of HTML element id

Example:

```ruby
  stay [@user, @article], :body, type: [:tiny_mce, "advanced"], activator: "#id_of_activator"
```

To use external submit button, just passed **submitter:** followed by id of HTML element id.
Note that this external submit button will be hidden by **Stay** and will be visible once **Stay** editor is visible (stay triggered).

```ruby
  stay [@user, @article], :body, type: [:tiny_mce, "advanced"], activator: "#id_of_activator", submitter: "#id_of_submit_button"
```

To use external cancel button, just passed **canceller:** followed by id of HTML element id
Note that this external cancel button will be hidden by **Stay** and will be visible once **Stay** editor is visible (stay triggered).
Due to **Stay** default submit event is triggered by blur **Stay** will raise ArgumentError if you specified external canceller without external submitter.

```ruby
  stay [@user, @article], :body, type: [:tiny_mce, "advanced"], activator: "#id_of_activator", submitter: "#id_of_submit_button", canceller: "#id_of_cancel_button"
```

Example of complete use:

```ruby
  <%= link_to "Click me to activate", "#", id: "activate_here" %>
  <%= stay [@user, @article], :body, type: :tiny_mce, activator: "#activate_here", submitter: "#submit_here" %>
  <%= link_to "Click me to submit", "#", id: "submit_here" #this will be hide by Stay %>
```

### In your Controller

    stay_response object

Example of complete use:

```ruby
  def update
      user = User.find(params[:user_id])
      article = user.articles.find(params[:id])
      respond_to do |format|
          if article.update_attributes(params[:article])
              format.json { stay_response(article) }
          else
              format.json { stay_response(article) }
          end
      end
  end
```

### Sanitize
Since version 0.1.4.1, **Stay** only accept this tags %w(p strong em span ul li ol)

## Changelog
Just some good releases changelog:

  **v0.1.4.0**
  - Complete rewrite Javascript, made it modular
  - Add ability to initialize Stay with callback

  **v0.1.3.5**
  - Add Canceller
  - Hide Submitter and Canceller until Stay is activated

  **v0.1.3.4.4**
  - Add error callback to the JSON

  **v0.1.0.0**
  - Initial release, February 4th 2012
