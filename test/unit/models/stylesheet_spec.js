define(
	['app/models/stylesheet', 'app/models/stylesheet_rule'],
	function(Stylesheet, StylesheetRule) {
		'use strict';

		describe('mikapp.editor.models.Stylesheet', function() {
			it('should be instantiated correctly.', function() {
				var id = 'stylesheet-1',
					media = 'print',
					rules = [new StylesheetRule('rule', {color: 'red'})],
					stylesheet = new Stylesheet(id, media, rules);

				expect(stylesheet.id).toEqual(id);
				expect(stylesheet.media).toEqual(media);
				expect(stylesheet.rules[0]).toEqual(rules[0]);

				stylesheet = new Stylesheet(id, media);

				expect(stylesheet.id).toEqual(id);
				expect(stylesheet.media).toEqual(media);
				expect(stylesheet.rules).toBeNull();

				stylesheet = new Stylesheet(id);

				expect(stylesheet.id).toEqual(id);
				expect(stylesheet.media).toEqual('screen');
				expect(stylesheet.rules).toBeNull();
			});

			it('should be deserialized correctly', function() {
				var serverData = {
						id: 'az-1-stylesheet',
						media: 'print',
						rules: [{
							selector: '.mk-rectangle-1',
							styles: {
								'background-color': 'red',
								'font': '25px Arial'
							}
						}, {
							selector: '.top-appbar-1',
							styles: {
								'background-color': 'blue'
							}
						}, {
							selector: '.mk-rectangle-component',
							styles: {
								'background-color': 'red'
							}
						}, {
							selector: '.az-mk-button-1',
							styles: {
								'background-color': 'green'
							}
						}]
					},
					deserializedStylesheet = Stylesheet.deserialize(serverData);

				expect(deserializedStylesheet).toBeDefined();
				expect(deserializedStylesheet.id).toEqual(serverData.id);
				expect(deserializedStylesheet.media).toEqual(serverData.media);
				expect(deserializedStylesheet.rules.length).toEqual(
					serverData.rules.length);
				expect(
					deserializedStylesheet.rules[0] instanceof StylesheetRule).
					toBe(true);

				serverData = {
					id: 'az-1-stylesheet',
					media: 'print'
				};

				deserializedStylesheet = Stylesheet.deserialize(serverData);

				expect(deserializedStylesheet).toBeDefined();
				expect(deserializedStylesheet.id).toEqual(serverData.id);
				expect(deserializedStylesheet.media).toEqual(serverData.media);
				expect(deserializedStylesheet.rules).toBeNull();

				serverData = {
					id: 'az-1-stylesheet'
				};

				deserializedStylesheet = Stylesheet.deserialize(serverData);

				expect(deserializedStylesheet).toBeDefined();
				expect(deserializedStylesheet.id).toEqual(serverData.id);
				expect(deserializedStylesheet.media).toEqual('screen');
				expect(deserializedStylesheet.rules).toBeNull();

			});

			it('getRule should return rule or null if rule not found.',
				function() {
					var rules = [
							new StylesheetRule('rule', {color: 'red'}),
							new StylesheetRule('rule1', {color: 'blue'})
						],
						stylesheet = new Stylesheet('stylesheet-1', 'screen',
							rules);

					expect(stylesheet.getRule(rules[0].selector) instanceof
						StylesheetRule).toBe(true);
					expect(stylesheet.getRule(rules[0].selector).selector).
						toEqual(rules[0].selector);
					expect(stylesheet.getRule(rules[0].selector).styles).
						toEqual(rules[0].styles);

					expect(stylesheet.getRule(rules[1].selector) instanceof
						StylesheetRule).toBe(true);
					expect(stylesheet.getRule(rules[1].selector).selector).
						toEqual(rules[1].selector);
					expect(stylesheet.getRule(rules[1].selector).styles).
						toEqual(rules[1].styles);

					expect(stylesheet.getRule('blah-blah')).toBeNull();

					stylesheet = new Stylesheet('stylesheet-2');

					expect(stylesheet.getRule(rules[0].selector)).toBeNull();
				}
			);
		});
	}
);