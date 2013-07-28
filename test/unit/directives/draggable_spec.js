define(['app', 'angular-mocks'], function() {
	"use strict";

	describe('mikapp.editor.directives.draggable', function() {
		var directive,
			directiveScope,
			rootScope;

		beforeEach(angular.mock.module('mikapp'));

		beforeEach(function() {

			angular.mock.inject(function($compile, $rootScope) {
				rootScope = $rootScope;

				directiveScope = $rootScope.$new();

				directiveScope.componentType = {
					type: 'blah-blah'
				};

				directive = $compile(
					'<div mk-draggable="componentType"></div>')(directiveScope);
			});
		});

		it('should fire drag-start and drag-end events via rootScope on drag.',
			function() {
				var dragStartSpy = jasmine.createSpy('dragstart spy'),
					dragEndSpy = jasmine.createSpy('dragstart spy');

				rootScope.$on('drag-start', dragStartSpy);
				rootScope.$on('drag-end', dragEndSpy);

				directive.triggerHandler('dragstart');

				waitsFor(function() {
					return dragStartSpy.callCount > 0;
				}, 'Directives did not catch drag start event');

				runs(function() {
					directive.triggerHandler('dragend');
				});

				waitsFor(function() {
					return dragStartSpy.callCount > 0;
				}, 'Directives did not catch drag end event');

				runs(function() {
					expect(dragStartSpy).toHaveBeenCalled();
					expect(dragEndSpy).toHaveBeenCalled();
				});
			});

		it('should pass component type as drag-start argument.', function() {
				var dragStartSpy = jasmine.createSpy('dragstart spy');

				directiveScope.$apply();

				rootScope.$on('drag-start', dragStartSpy);

				directive.triggerHandler('dragstart');

				waitsFor(function() {
					return dragStartSpy.callCount > 0;
				}, 'Directives did not catch drag start event');

				runs(function() {
					expect(dragStartSpy).toHaveBeenCalled();
					expect(dragStartSpy.mostRecentCall.args[1]).
						toEqual(directiveScope.componentType);
				});
			});
	});
});