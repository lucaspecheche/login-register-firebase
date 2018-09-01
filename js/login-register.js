/** Configuração do FIREBASE **/
var config = {
	apiKey: "AIzaSyC3Pua8fOvXFRhNX0l1yP9Hgu-o77kXlw4",
	authDomain: "myproject-7babf.firebaseapp.com",
	databaseURL: "https://myproject-7babf.firebaseio.com",
	projectId: "myproject-7babf",
	storageBucket: "myproject-7babf.appspot.com",
	messagingSenderId: "118243285485"
};

firebase.initializeApp(config);
/********************/

$(document).ready(function(){

/** DECLARAÇÕES **/
var error = {
	code: "check-values",
	message: "Por favor, verifique os campos abaixo.",
};

//LOGIN
$('#btn-login').on('click', function(){

	var email = (isEmail($('#email').val()));
	var password = ($('#senha').val() != "");
	var manter_conectado = $('#customCheck1').is(':checked');

	if (email && password) {

		firebase.auth().signInWithEmailAndPassword(email, senha).then(function(){
			manter_conectado ? persistence_local() : persistence_session();

		}).catch(function(error) {
			alert_error(error);
		});
	}else {
		
		alert_error(error);
		if (!email) {$('.input-email').append('<div class="invalid-feedback" style="display:block">Verifique seu email.</div>');}
		if (!password) {$('.input-password').append('<div class="invalid-feedback" style="display:block">Verifique sua senha.</div>');}
	}

});


function register () {

	var email = $('#email').val();
	var senha = $('#senha').val();

	firebase.auth().createUserWithEmailAndPassword(email, senha).then(function() {
	  	console.log("Usuario Criado");
	  	var user = firebase.auth().currentUser;
	  	user.sendEmailVerification();
	  	console.log(user);
	 }).catch(function(error) {
		alert_error(error);
	});
}



firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	  	console.log("Usuario Logou");
	  	
	  	firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
		  //	console.log(idToken);
		  //	$.post("index.php", {token: idToken}, function(data){
			//console.log("Retorno: " + data);
		//});
		  	
		  	
		}).catch(function(error) {
			alert_error(error);
		});

	} else {
	    console.log("Não autenticado...");
	  }
	});

$('#btn-sair').on('click', function (){
	firebase.auth().signOut().then(function() {
	  	console.log("Usuario Saiu (Sair)");
	  	location.reload();
	}).catch(function(error) {
		alert_error(error);
	});
});

//Login Google
$('#btn-google').on('click', function (){
	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
	  var user = result.user;
	  console.log(result);

	}).catch(function(error) {
	  alert_error(error);
	});
});

function persistence_session () {
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
	    console.log("Persistencia SESSION");

	  }).catch(function(error) {
	    alert_error(error);
	  });
}

function persistence_local () {
	//Sair ao fechar a janela
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
	    console.log("Persistencia Local");

	  }).catch(function(error) {
	    alert_error(error);
	  });
}

function postar () {
	console.log("Postando...");
	var idToken = "aaaaaaa";
	$.post("index.php", {token: idToken}, function(data){
		console.log("Retorno: " + data);
	});
}

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

function isEmail(email) {
  	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
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


});