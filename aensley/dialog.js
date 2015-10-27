(function(w, d){
	"use strict";
	var defaults = {
			maxHeight: 800,
			minHeight: 300,
			maxWidth: 1200,
			minWidth: 360,
			closeOnEscape: false,
			title: 'File Manager',
			dialogClass: 'iframeDialog',
			open: function(){$('.ui-dialog-titlebar-close').blur();},
			close: function(){$(this).remove();},
		},
		containerSelector = '#file-upload-dialog-container',
		linkSelector = '[data-upload-dialog]';

	function addStyleSheet() {
		$('head').append(
			'<style>'
				+ '.' + defaults.dialogClass + ' .ui-dialog-content{overflow:hidden !important;padding:0 !important;}'
				+ '' + containerSelector + '{font-size:12px !important;}'
			+ '</style>'
		);
	}

	function addDialogContainer()
	{
		$('body').append('<div id="file-upload-dialog-container"></div>');
	}

	function handleDimensions(options)
	{
		var height = ((w.innerHeight || $(w).height()) - 60),
			width = ((w.innerWidth || $(w).width()) - 30);

		if (width < options.minWidth) {
			options.minWidth = width;
		}

		if (height < options.minHeight) {
			options.minHeight = height;
		}

		options.width = (options.maxWidth < width ? options.maxWidth : width);
		options.height = (options.maxHeight < height ? options.maxHeight : height);
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

		options.appendTo = $(containerSelector);
		$content.find('iframe').load(function(){
			$content.find('p.loading').remove();
			$(this).css('visibility', 'visible');
		});

		$content.dialog(options);
		return false;
	}

	$(function(){
		$(linkSelector).click(openDialog);
		addDialogContainer();
		addStyleSheet();
	});
})(window, document);

