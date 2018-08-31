$(document).ready(function(){

/** DECLARAÇÕES **/
var error = {
	code: "check-values",
	message: "Por favor, verifique sua senha."
};

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

/** FIM Config Firebase **/

//LOGIN
$('#btn-login').on('click', function(){

	var email = $('#email').val();
	var senha = $('#senha').val();
	var manter_conectado = $('#checkbox-auth').is(':checked');

	if (senha != "" && isEmail(email)) {

		firebase.auth().signInWithEmailAndPassword(email, senha).then(function(){
			manter_conectado ? persistence_local() : persistence_session();

		}).catch(function(error) {
			alert_error(error);
		});
	}else {
		
		alert_error(error);
		if (!isEmail(email)) {
			$('.input-email').append('<span class="alert-notification"><i class="fas fa-exclamation"></i></span>');
		}
		if (senha == "") {
			$('.input-password').append('<span class="alert-notification"><i class="fas fa-exclamation"></i></span>');
		}
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
		var errorCode = error.code;
		var errorMessage = error.message;
		  console.log("Código do Erro: " + errorCode);
		console.log("Msg Erro: " + errorMessage);
	});
}



firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	  	console.log("Usuario Logado: " + user.customClaims);
	  	$('#user-name').html(user.displayName);
	  	$('#user-image').attr('src', user.photoURL);
	  	
	  	firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
		  	console.log(idToken);
		  //	$.post("index.php", {token: idToken}, function(data){
			//console.log("Retorno: " + data);
		//});
		  	
		  	
		}).catch(function(error) {
			var errorCode = error.code;
 		    var errorMessage = error.message;
		});

	} else {
	    console.log("Usuario Saiu");
	  }
	});

$('#btn-sair').on('click', function (){
	firebase.auth().signOut().then(function() {
  // Sign-out successful.
  	console.log("Usuario Saiu (Sair)");
}		).catch(function(error) {
	console.log("Erro ao Sair");
  // An error happened.
});
});

//Login Google
function google () {
	var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  console.log(result);
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  console.log(errorMessage);
	  // The email of the user's account used.
	  var email = error.email;
	  console.log(email);
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  console.log(credential);
	  // ...
});
}

function persistence_session () {
	//Sair ao fechar a janela
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
	  .then(function() {
	    console.log("Persistencia SESSION");
	  })
	  .catch(function(error) {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    console.log("Erro SESSION: " + errorMessage);
	  });
}

function persistence_local () {
	//Sair ao fechar a janela
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
	  .then(function() {
	    console.log("Persistencia Local");
	  })
	  .catch(function(error) {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    console.log("Erro Local: " + errorMessage);
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
			break;

		case "check-values":
			msg_error = "Por favor verifique os campos abaixo";
			break;

		case "auth/user-not-found":
			msg_error = "Não foi encontrado nenhum usuário registrado com essas credenciais. Por favor, verifique o email e senha informados";
			break;

		default:
			msg_error = "CODE: " + error.code + "<br> Msg Erro: " + error.message;
	}

	$('.display-errors').append(
				  '<div class="alert alert-danger alert-dismissible fade show" role="alert">'
				+ '<strong>Olá, </strong>'
				+ msg_error
				+ '</div>'
			  );
}

function remove_alerts (selector = ".display-errors .alert") {
		$(selector).remove();

}

function isEmail(email) {
  	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function testeAdmin () {


 admin.auth().verifyIdToken(idToken).then((claims) => {
   if (claims.admin === true) {
     // Allow access to requested admin resource.
   }
 });


}

});