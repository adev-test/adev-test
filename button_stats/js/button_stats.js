// JavaScript Document

/**
* BUTTON_STATS  CLASS
*/
var button_stats = new function() {	

	this.trigger_url = DEDALO_LIB_BASE_URL + '/button_stats/trigger.button_stats.php';

	
	// Stats
	this.Stats = function (button_obj) {

		//return console.log(button_obj)
	
		var section_tipo	= $(button_obj).data('tipo')	
			
		var target_div	= $('#stats_info');

		if ($(target_div).length<1) {
			return alert("Stats: error target_div not found!")
		}
		
		var mode 		= 'Stats';
		var mydata		= { 'mode': mode, 'section_tipo': section_tipo };

		var data_response = null;				
		
		//if (DEBUG) console.log("Stats data vars: " + 'mode:'+ mode+ ' section_tipo:'+ section_tipo);

		//var wrap_div = $('.css_section_wrap').first();

		html_page.loading_content( target_div, 1 );

		// AJAX REQUEST
		$.ajax({
		  	url			: this.trigger_url,
			data		: mydata,
			type		: "POST",
		  	dataType	: "html"
		})
		// DONE
		.done(function(data_response) {
		
		  	// Search 'error' string in response
			var error_response = /error/.test(data_response);							

			// If data_response contain 'error' show alert error with (data_response) else reload the page
			if(error_response != false) {
				// Alert error
				alert("[Stats] Request failed: \n" + data_response + $(data_response).text() );
			}else{
				
				target_div.html(data_response)													
			}
			html_page.loading_content( target_div, 0 );
		})
		// FAIL ERROR	 
		.fail(function(jqXHR, textStatus) {
			var msg = "[Stats] Request failed: " + textStatus ;
			target_div.append(" <span class='error'>Error on new matrix " + msg + "</span>");
		 	alert( msg );
		})
		// ALLWAYS
		.always(function() {
			html_page.loading_content( target_div, 0 );
		})

	}//end this.New



};//end button_stats
