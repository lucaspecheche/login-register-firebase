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

//LOGIN
$('#btn-login').on('click', function(){

	var email = $('#email').val();
	var password = $('#senha').val();
	var manter_conectado = $('#customCheck1').is(':checked');

	if (isEmail(email) && password != "") {
		alert("Aceitou");
		firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
			manter_conectado ? persistence_local() : persistence_session();

		}).catch(function(error) {
			
			alert_error(error);
		});
	}else {
		
		alert_error(error);
		if (!(isEmail($('#email').val()))) {$('.input-email').append('<div class="invalid-feedback" style="display:block">Verifique seu email.</div>');}
		if (($('#senha').val() == "")) {$('.input-password').append('<div class="invalid-feedback" style="display:block">Verifique sua senha.</div>');}
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

