/** DECLARAÇÕES **/
var error = {
	code: "check-values",
	message: "Por favor, verifique os campos abaixo.",
};

function alert_error (error) {
	remove_alerts();
	var msg_error = "";

	switch (error.code) {

		case "auth/wrong-password":
			msg_error = "Por favor, verifique sua senha.";
			alert_error(error.code = "password-invalid");
			break;

		case "check-values": //Padrão
			msg_error = "Por favor verifique os campos abaixo.";
			break;

		case "auth/user-not-found":
			msg_error = "Não encontramos nenhum usuário registrado com essas credenciais. Verifique o email e a senha informados e tente novamente.";
			break;

		case "auth/invalid-email":
			msg_error = "O endereço de email está em um formato invalido.";
			break;

		default:
			msg_error = "CODE: " + error.code + "<br> Msg Erro: " + error.message;
			console.log(error);
	}

	$('.display-errors').append(
				  '<div class="alert alert-danger alert-dismissible fade show" role="alert">'
				+ '<strong>Olá, </strong>'
				+ msg_error
				+ '</div>'
			  );
}

//Remove Alertas
function remove_alerts () {
	$('.display-errors .alert').remove();
	$('.invalid-feedback').remove();
}

//Verifica se o Email é valido
function isEmail(email) {
  	var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
	return regex.test(email);
}

//Ver Password
$('.pass-view').on('click', function (){
	$('#senha').attr('type') == "password" ? ($('#senha').attr('type', 'text')) : ($('#senha').attr('type', 'password'));
});

//Verifica se é um MOBILE com resolução acima de 680px e aplica um zoom
var screenWidth = $(window).width();
if( (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && (screenWidth > 680) ) {
	$('body').css('zoom', '150%');
}

/*
//Alternar entre Login e Registrar
$('#elements-register, #btnelements-login').on('click', function (){
	remove_alerts();
	$('#form-confirm-password, #form-name').toggleClass('animated flipInX');
	$('#form-email, #form-password').toggleClass('animated fadeIn');
    $('.status').toggleClass('hidden');

	//Remove a animação para não dar blurry
	setTimeout(function(){
		$('#form-confirm-password, #form-name').toggleClass('animated flipInX');
		$('#form-email, #form-password').toggleClass('animated fadeIn');
	}, 600);

	//Altera o nome de Login - Registrar
	var name = $('#display-login span');
	name.html() == "Login" ? name.html('Registrar') : name.html('Login');

});*/
	

$('#option-register').on('click', function (){
	remove_alerts();
	var animate = 'fadeIn';

	$('.content').toggleClass('animated ' + animate);
    $('.status').toggleClass('hidden');

	//Remove a animação para não dar blurry
	setTimeout(function(){
		$('.content').toggleClass('animated '  + animate);
	}, 700);

	$(this).addClass('register-selected');
	$(this).removeClass('register-not-selected');
	$('#option-login').addClass('login-not-selected');
	$('#option-login').removeClass('login-selected');

});

$('#option-login').on('click', function (){
	remove_alerts();
	var animate = 'fadeIn';
	$('.content').toggleClass('animated ' + animate);
    $('.status').toggleClass('hidden');

	//Remove a animação para não dar blurry
	setTimeout(function(){
		$('.content').toggleClass('animated ' + animate);
	}, 700);

	$(this).addClass('login-selected');
	$(this).removeClass('login-not-selected');
	$('#option-register').addClass('register-not-selected');
	$('#option-register').removeClass('register-selected');

});

