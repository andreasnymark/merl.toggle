# Merl.toggle

[View demo](https://andreasnymark.github.io/#merl.toggle)

Toggle content, e.g. dropdowns with overlay. Separates CSS and HTML. Focus inside panel when toggled. Uses ARIA.

## Default HTML

	<div class="Toggle">
		<button class="Toggle-handle" type="button">Handle</button>
		<div class="Toggle-panel">
			<h2>Panel content</h2>
		</div>
	</div>

## Default settings

|Key|Type|Default|Note|
|---|---|---|---|
|`evt`|`string`|`click`||
|`selectElem`|`string`|`.Toggle`||
|`selectHandle`|`string`|`.Toggle-handle`||
|`selectPanel`|`string`|`.Toggle-panel`||
|`selectFocus`|`string`|`input, a`||
|`expanded`|`string`|`is-expanded`||
|`dataAttr`|`string`|`data-toggle`||
|`autoClose`|`boolean`|`true`||
|`keepOpen`|`boolean`|`false`||
|`classPosition`|`object`|`top: false`, `left: false`, `right: '`||
|`classPosition.top`|`boolean` `string`|`false`|Top edge is outside viewport, add this class.|
|`classPosition.left`|`boolean` `string`|`false`|Left edge is outside viewport, add this class.|
|`classPosition.right`|`boolean` `string`|`Toggle-panel--right`|Rigth edge is outside viewport, add this class.|
|`classPosition.bottom`|`boolean` `string`|`Toggle-panel--up`|Bottom edge is outside viewport, add this class.|


## Init

	merl.toggle.init();
	
## Init and override defaults

	merl.toggle.init( {
		selectFocus: 'input.search',
		keepOpen: true
	} );

## Instance overrides

|Key|Type|Note|
|---|---|---|
|`evt`|`string`|Event on handle.|
|`focus`|`string`|Selector to get focus.|
|`handle`|`string`|Specifik handle.|
|`alternate`|`string`|Alternative text when toggle is expanded.|
|`keepOpen `|`boolean`|If panel should be kept open.|

### Example instance override

	<div class="Toggle" data-toggle='{"focus": ".link", "keepOpen": true}'>
	
## Disclaimer

Make sure you test in important browsers. I’ve targeted modern browsers, such as IE10+. 



