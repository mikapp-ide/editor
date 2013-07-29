define([
	'app',

	'app/directives/components/component',
	'app/directives/components/general/app_bar',
	'app/directives/components/general/button',
	'app/directives/components/general/image',
	'app/directives/components/general/rectangle',
	'app/directives/components/general/text',

	'app/directives/components/lists/gridview',

	'app/directives/components/location/map',

	'app/directives/controls/binding',
	'app/directives/controls/input_file',
	'app/directives/controls/style_editor',

	'app/directives/draggable',
	'app/directives/editor',
	'app/directives/generated_css'
], function(app, Component, AppBar, Button, Image, Rectangle, Text, Gridview,
	Map, Binding, InputFile, StyleEditor, Draggable, Editor, GeneratedCss) {
	'use strict';

	app.
		directive('mkComponent', Component).
		directive('mkAppbar', AppBar).
		directive('mkButton', Button).
		directive('mkImage', Image).
		directive('mkRectangle', Rectangle).
		directive('mkText', Text).
		directive('mkGridview', Gridview).
		directive('mkMap', Map).
		directive('mkBinding', Binding).
		directive('mkInputFile', InputFile).
		directive('mkStyleEditor', StyleEditor).
		directive('mkDraggable', Draggable).
		directive('mkEditor', Editor).
		directive('mkGeneratedCss', GeneratedCss);
});