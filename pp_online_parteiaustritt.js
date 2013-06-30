var pp_online_parteiaustritt_required_hint = ' <span class="form-required" title="Diese Angabe wird benötigt.">*</span>';

$(document).ready(function() {
	$('#edit-pp-online-parteiaustritt-einzug').bind('change', function() {
		if ($(this).is(':checked')) {
			$(pp_online_parteiaustritt_required_hint).appendTo($("label[for='edit-pp-online-parteiaustritt-kontoinhaber']"));
			$('#edit-pp-online-parteiaustritt-kontoinhaber').addClass("required");
			$(pp_online_parteiaustritt_required_hint).appendTo($("label[for='edit-pp-online-parteiaustritt-kontonummer']"));
			$('#edit-pp-online-parteiaustritt-kontonummer').addClass("required");
			$(pp_online_parteiaustritt_required_hint).appendTo($("label[for='edit-pp-online-parteiaustritt-blz']"));
			$('#edit-pp-online-parteiaustritt-blz').addClass("required");
			$(pp_online_parteiaustritt_required_hint).appendTo($("label[for='edit-pp-online-parteiaustritt-bank']"));
			$('#edit-pp-online-parteiaustritt-bank').addClass("required");
			$('#pp_online_bank_data fieldset').show();
		} else {
			$("label[for='edit-pp-online-parteiaustritt-kontoinhaber'] > span").remove();
			$('#edit-pp-online-parteiaustritt-kontoinhaber').removeClass("required");
			$("label[for='edit-pp-online-parteiaustritt-kontonummer'] > span").remove();
			$('#edit-pp-online-parteiaustritt-kontonummer').removeClass("required");
			$("label[for='edit-pp-online-parteiaustritt-blz'] > span").remove();
			$('#edit-pp-online-parteiaustritt-blz').removeClass("required");
			$("label[for='edit-pp-online-parteiaustritt-bank'] > span").remove();
			$('#edit-pp-online-parteiaustritt-bank').removeClass("required");
			$('#pp_online_bank_data fieldset').hide();
		}
	});

	$('#edit-pp-online-parteiaustritt-beitragsminderung').bind('change', function() {
		if ($(this).is(':checked')) {
			$("label[for='edit-pp-online-parteiaustritt-beitrag'] > span").remove();
			$('#edit-pp-online-parteiaustritt-beitrag').removeClass("required");
		} else {
			$(pp_online_parteiaustritt_required_hint).appendTo($("label[for='edit-pp-online-parteiaustritt-beitrag']"));
			$('#edit-pp-online-parteiaustritt-beitrag').addClass("required");
		}
	});

	$('#edit-pp-online-parteiaustritt-plz').bind('keyup', function() {
		var zipcode = $(this).val();
		if (zipcode.length >= 3) {
			$.ajax({
				type: "POST",
				url: "/ajax/membership/get/citiesbyzipcode",
				data: "zipcode="+zipcode,
				dataType: "json",
				success: function(cities) {
					var options = "";
					$.each(cities, function(index, value) {
						options += "<option value='"+index+"'>"+value+"</option>";
					});
					$('#edit-pp-online-parteiaustritt-ort').html(options);
				}
			});
		}
	});

	$('#edit-pp-online-parteiaustritt-ort').bind('change', function() {
		var city = $(this).val();
		var zipcode = $('#edit-pp-online-parteiaustritt-plz').val();
		$.ajax({
			type: "POST",
			url: "/ajax/membership/get/zipcodebycity",
			data: "city="+city+"&zipcode="+zipcode,
			dataType: "json",
			success: function(zipcode) {
				if (zipcode) {
					$('#edit-pp-online-parteiaustritt-plz').val(zipcode);
				}
			}
		});
	});

	$('div.edit-pp-online-parteiaustritt-delete-wrapper div.form-item a').bind('click', function() {
		var key = $(this).parent().parent().attr("rel");
		var answer = confirm('PGP-Key 0x'+key+' wirklich löschen?');
		if (answer)
			location.href = window.location.pathname+"?del="+key;
	});
});
