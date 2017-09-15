$(document).ready(function() {

	atualiza();

	$("#comprimento").keyup(function(event) {
		var vcomprimento = $("#comprimento").val();
		if (vcomprimento.length > 0) {
			if (parseInt(vcomprimento) >= 0 && parseInt(vcomprimento) <= 300) {
				$("#comprimento01a").text(vcomprimento);
				$("#comprimento02a").text(vcomprimento);
				$("#fundo01b").text(vcomprimento);
				atualiza();
			} else {
				if (parseInt(vcomprimento) > 300) {
					$("#comprimento").val("300");
					$("#comprimento01a").text("300");
					$("#comprimento02a").text("300");
					$("#fundo01b").text("300");
					atualiza();
				}
			}
		} else {
			atualiza();
		}
	})

	$("#valor_m2").keyup(atualiza)
	$("#valor_m_linear").keyup(atualiza)

	$("#largura").keyup(function(event) {
		var vlargura = $("#largura").val();
		if (vlargura.length > 0) {
			if (parseInt(vlargura) >= 0 && parseInt(vlargura) <= 300) {
				$("#largura").val(vlargura);
				$("#fundo01a").text(vlargura);
				atualiza();

			} else {
				if (parseInt(vlargura) > 300) {
					$("#largura").val("300");
					$("#fundo01a").text("300");
					atualiza();
				}
			}
		} else {
			atualiza();
		}
	});

	$("#altura").keyup(function(event) {
		var valtura = $("#altura").val();
		if (valtura.length > 0) {
			if (parseInt(valtura) >= 0 && parseInt(valtura) <= 300) {
				$("#altura").val(valtura);
				$("#altura01a").text(valtura);
				$("#altura02a").text(valtura);
				$("#lateral03b").text(valtura);
				$("#lateral04b").text(valtura);
				atualiza();

			} else {
				if (parseInt(valtura) > 300) {
					$("#altura").val("300");
					$("#altura01a").text("300");
					$("#altura02a").text("300");
					$("#lateral03b").text("300");
					$("#lateral04b").text("300");
					atualiza();
				}
			}
		} else {
			atualiza();
		}
	});

	$("#nivel_seguranca").keyup(function(event) {

		if ($("#nivel_seguranca").val() > 5) {
			$("#nivel_seguranca").val(5)
		}

		if ($("#nivel_seguranca").val() < 1) {
			$("#nivel_seguranca").val(1)
		}

		var nivel_seguranca = parseInt($("#nivel_seguranca").val())

		switch (nivel_seguranca) {

			case 1:
				$("#seguranca").text(" Inseguro");
				$('#valor_seguranca').text("1.0");
				atualiza();
				break;

			case 2:
				$("#seguranca").text(" Pouco Seguro");
				$('#valor_seguranca').text("2.5");
				atualiza();
				break;

			case 3:
				$("#seguranca").text(" Seguro");
				$('#valor_seguranca').text("3.8");
				atualiza();
				break;

			case 4:
				$("#seguranca").text(" Muito Seguro");
				$('#valor_seguranca').text("6.0");
				atualiza();
				break;

			case 5:
				$("#seguranca").text(" Muito Seguro");
				$('#valor_seguranca').text("12.0");
				atualiza();
				break;

			default:
				$("#seguranca").text("Seguro");
				$('#valor_seguranca').text("3.8");
				atualiza();
				break;

		}
	});

	function atualiza() {
		
		var comprimento = 0 + parseInt($('#comprimento01a').text());
		if (isNaN(comprimento)) {
			comprimento = 0;
		}

		var largura = 0 + parseInt($('#fundo01a').text());
		if (isNaN(largura)) {
			largura = 0;
		}

		var altura = 0 + parseInt($('#altura01a').text());
		if (isNaN(altura)) {
			altura = 0;
		}


		var volume = ((comprimento * largura * altura) / 1000);

		var ab = (comprimento * 10) / (altura * 10);
		//var ab = vab.toFixed(2);

		if (ab > 0 && ab <= 0.5) {
			var alpha = 0.003;
			var beta = 0.085;
		}

		if (ab > 0.5 && ab <= 0.67) {
			var alpha = 0.0085;
			var beta = 0.1156;
		}

		if (ab > 0.67 && ab <= 1) {
			var alpha = 0.022;
			var beta = 0.16;
		}

		if (ab > 1 && ab <= 1.5) {
			var alpha = 0.042;
			var beta = 0.26;
		}

		if (ab > 1.5 && ab <= 2) {
			var alpha = 0.056;
			var beta = 0.32;
		}

		if (ab > 2 && ab <= 2.5) {
			var alpha = 0.063;
			var beta = 0.35;
		}

		if (ab > 2.5) {
			var alpha = 0.067;
			var beta = 0.37;
		}


		var fator = 0 + parseInt($('#valor_seguranca').text());
		if (isNaN(fator)) {
			fator = 0;
		}


		var fator_seguranca = 19.3 / fator;

		var valor1 = (altura * 10);
		var valor1 = Math.pow(valor1, 3);
		var valor1 = beta * valor1;

		var espessura = Math.sqrt(valor1 * 0.00001 / fator_seguranca);

		var espessura = Math.round(espessura);


		if (espessura > 0) {

			$("#espessura").text(espessura);

			var lateral_espessura = largura - ((espessura * 2) / 10)

			$("#lateral03a").text(lateral_espessura);
			$("#lateral04a").text(lateral_espessura);

			$("#litros").text(volume.toFixed(2));
			
			var m2 = ((comprimento / 100) * (altura / 100) * 2) + 
				((comprimento / 100) * (largura / 100)) + 
				((lateral_espessura / 100) * (altura / 100) * 2)
				m2 = m2.toFixed(2)

			$('#metro_quadrado').text(m2)
			var valor_m2 = (m2 * parseFloat($('#valor_m2').val())).toFixed(2)
			$('#valor_m2_text').text( valor_m2  )

			var mL = (comprimento * 6 + altura * 6 + largura * 2 + lateral_espessura * 2) / 100

			$('#metro_linear').text(mL.toFixed(2))
			var valor_linear = (mL * parseFloat($('#valor_m_linear').val())).toFixed(2)
			$('#valor_linear_text').text( valor_linear )

			$('#total').text( (parseFloat(valor_linear) + parseFloat(valor_m2)).toFixed(2) )

			var peso_vidro = (espessura * 2.5) * m2
			var peso_agua = (volume * 0.8)

			$('#peso_vidro').text(peso_vidro.toFixed(2))
			$('#peso_agua').text(peso_agua.toFixed(2))
			$('#peso_total').text(peso_vidro + peso_agua)
		}
	}

});