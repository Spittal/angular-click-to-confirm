# Angular Click to Confirm

A Better, Beautiful Way to Confirm Actions in Angular.

![What it looks like](http://i.imgur.com/q3s5C51.gif)

[Demo](http://spittal.github.io/angular-click-to-confirm/app/index.html)

Generally as easy as this:

```html
<button ng-click="someAction()" click-to-confirm>Click Me</button>
```

**Requires jQuery. <small>I'll get to removing that dependancy soon, promise.</small>**

# What Do I Need to Do?

#### Get the Script!

We're on [Bower](http://bower.io/) and recommend this action

```
bower install --save angular-click-to-confirm
```

**OR**

Download the script [here]()

#### Inlcude the Script

Add it to any angular project

```html
<script src="angular-click-to-confirm/dist/angular-click-to-confirm.min.js"></script>
```

#### Use It!

Include the directive on any element that has an ng-click action!

**Note:** This must be on an element that also has an ng-click

```html
<button ng-click="bestActionEver()" click-to-confirm>Best User Interaction... Ever</button>
```

# Options

#### Custom Message

You can easily add a custom message by adding a value to the directive

```html
<button ng-click="someAction()" click-to-confirm="I'm Scared">Click Me</button>
```

#### Hot Background Colour Fade

When the button is in it's "click to confirm" state it has the class "confirm" added to the button

```html
<button class="button-1" ng-click="someAction()" click-to-confirm="I'm Scared">Click Me</button>
```

Then in CSS

```css
.button-1 {
	transition: all 300ms;
}

.button-1.confirm {
	background-color: #d9534f;
}
```