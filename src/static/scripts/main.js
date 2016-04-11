
function query() {
	$(document).find('tbody').empty();
	$(document).find('#wavlist').empty();

	var q = $('#query').val();
	console.log("Query value:" + q)

	var data = {
		"action": "firstpass",
		"query": q
	}

	$.post('/languagemodel', data, function(data){
		$.each(data, function(i, item) {
			console.log(i,item);
			$('#languagemodel').find('tbody')
				.append($('<tr>')
					.append($('<td>').append(i),
						$('<td>').append(item.big5),
						$('<td>').append(item.probability)
					)
				)
		})
	})
	$.post('/query', data, function(data) {
		$.each(data, function(i,item) {
			var audio_control = $('<audio>').attr("controls",true)
			var source = '/wav/'+item
			console.log(i,item,source);
			$('#wavlist')
				.append($('<li>')
					.append(audio_control
						.append( $('<source>').attr('src',source).attr('type','audio/wav') )
					)
				)
		})

	})
	$('#query').val('');
	return false
}

$(document).ready( function() {
	$('#query').keypress(function(e){
		console.log('key pressed!');
		if(e.which == 13 && !e.shiftKey){
			console.log('get_big5');
			e.preventDefault();
			query();
		}
	})

	console.log('ready!');
})
