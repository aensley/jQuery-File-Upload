$(function () {
	'use strict';
	var $fileupload = $('#fileupload'),
		$dropoverMessage = $('#dropoverMessage'),
		$fileuploadButtonbar = $('.fileupload-buttonbar'),
		$filesScroll = $('#filesScroll'),
		dragTimer,
		hideDropoverMessage = function (){
			clearTimeout(dragTimer);
			dragTimer = setTimeout(function(){$dropoverMessage.hide();}, 85);
		},
		layoutListener = function(){
			$filesScroll.height(
				(window.innerHeight || $(window).height())
				- parseFloat($fileuploadButtonbar.outerHeight(true) + 32)
			);
		};


	// Initialize the jQuery File Upload widget:
	$fileupload.fileupload({
		url: 'upload.php',
		limitConcurrentUploads: 3,
		dropZone: $(document),
		prependFiles: true,
		drop: hideDropoverMessage,
		added: function () {
			$filesScroll.scrollTop(0);
			hideDropoverMessage();
		},
	});

	$(document).on('dragover', function(e){
		var dt = e.originalEvent.dataTransfer;
		if (dt.types && ($.inArray('Files', dt.types) > -1)) {
			$dropoverMessage.show();
			window.clearTimeout(dragTimer);
		}
	}).on('dragleave', hideDropoverMessage);

	// Load existing files:
	$fileupload.addClass('fileupload-processing');
	$.ajax({
		url: $fileupload.fileupload('option', 'url'),
		dataType: 'json',
		context: $fileupload[0]
	}).always(function () {
		$(this).removeClass('fileupload-processing');
	}).done(function (result) {
		$(this).fileupload('option', 'done').call(this, $.Event('done'), {result: result});
	});

	// Add event listeners
	$('body').on('focus', 'input[data-source-url]', function(){this.select();});
	$(window).resize(layoutListener);
	layoutListener();
});
