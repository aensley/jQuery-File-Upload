(function($, w, d){
	"use strict";
	var defaults = {
			height: 'auto',
			width: 'auto',
			modal: false,
			autoOpen: true,
			closeOnEscape: false,
			dialogClass: 'iframeDialog',
			close: function(){$(this).remove();},
		},
		sizeBounds = {
			height: {
				min: 300,
				max: 800,
			},
			width: {
				min: 360,
				max: 1170,
			},
		},
		selector = '[data-upload-dialog-link]';

	function addStyleSheet() {
		// Source: http://davidwalsh.name/add-rules-stylesheets
		var sheet = (function() {
			// Create the <style> tag
			var style = d.createElement('style');

			// WebKit hack :(
			style.appendChild(d.createTextNode(''));

			// Add the <style> element to the page
			var head = d.head || d.getElementsByTagName('head')[0];
			head.appendChild(style);

			return style.sheet;
		})();

		var addCssRule = function (selector, rules) {
				if ('insertRule' in sheet) {
					sheet.insertRule(selector + '{' + rules + '}', 0);
				} else if ('addRule' in sheet) {
					sheet.addRule(selector, rules);
				}
			};

		addCssRule('.iframeDialog .ui-dialog-content', 'overflow:hidden;');
		addCssRule('.iframeDialog .ui-dialog-content', 'padding:0;');
	}


	function handleDimensions(options)
	{
		var size = {
				height: ((w.innerHeight || $(w).height()) - 60),
				width: ((w.innerWidth || $(w).width()) - 30),
			},
			currentSb = sizeBounds;

		currentSb.width.max = size.width;
		currentSb.height.max = size.height;

		options.minWidth = currentSb.width.min;
		if (!options.maxWidth || options.maxWidth > currentSb.width.max) {
			options.maxWidth = currentSb.width.max;
		}
		options.minHeight = currentSb.height.min;
		if (!options.maxHeight || options.maxHeight > currentSb.height.max) {
			options.maxHeight = currentSb.height.max;
		}

		if (options.width === 'auto') {
			options.width = (options.maxWidth < size.width ? options.maxWidth : size.width);
		} else if (options.width > currentSb.width.max) {
			options.width = currentSb.width.max;
		} else if (options.width < currentSb.width.min) {
			options.width = currentSb.width.min;
		}

		if (options.height === 'auto') {
			options.height = (options.maxHeight < size.height ? options.maxHeight : size.height);
		} else if (options.height > currentSb.height.max) {
			options.height = currentSb.height.max;
		} else if (options.height < currentSb.height.min) {
			options.height = currentSb.height.min;
		}

		return options;
	}

	function openDialog(e)
	{
		e.stopPropagation();
		var options = handleDimensions(defaults),
			$content = $('<div>' +
			'<p class="loading" style="text-align:center;">Loading...</p>' +
			'<iframe frameborder=0 scrolling="auto" src="' + $(this).prop('href') +
			'" style="height:100%;width:100%;visibility:hidden;"></iframe>' +
			'</div>');

		$content.find('iframe').load(function(){
			$content.find('p.loading').remove();
			$(this).css('visibility', 'visible');
		});

		$content.dialog(options);
		return false;
	}

	$(function(){
		$(selector).click(openDialog);
		addStyleSheet();
	});
})(jQuery, window, document);

