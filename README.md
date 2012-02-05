# Stay
**Stay** is a RESTful ajax inplace-editor helper based on jQuery and Unobustorsive javascript.
Similar and inspired by [best_in_place](https://github.com/bernat/best_in_place), with extra
enchancement. Support [TinyMCE](http://tinymce.moxiecode.com/) as its editor.

## Installation
Installation **stay** is simple. In Rails > 3.0 just add **stay** in your Gemfile:

```ruby
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
     
## Usage

### call this in your view

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

When called, by default **Stay** triggered by clicking the displayed text on HTML page.
**Stay** accept external trigger and submit button:

To use, just passed **activator:** followed by id of HTML element id

Example:

```ruby
  stay [@user, @article], :body, type: [:tiny_mce, "advanced"], activator: "#id_of_activator"
```
    
To use external submit button, just passed **submitter:** followed by id of HTML element id

```ruby
  stay [@user, @article], :body, type: [:tiny_mce, "advanced"], activator: "#id_of_activator", submitter: "#id_of_submit_button"
```
    
Example of complete use:

```ruby
  <%= link_to "Click me to activate", "#", id: "activate_here" %>
  <%= stay [@user, @article], :body, type: :tiny_mce, activator: "#activate_here", submitter: "#submit_here" %>
  <%= link_to "Click me to submit", "#", id: "submit_here" %>
```
    
### call this in your controller

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
