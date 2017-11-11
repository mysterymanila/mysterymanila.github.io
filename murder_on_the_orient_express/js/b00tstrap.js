var config = {
		apiKey: "AIzaSyD8hIhMd_qZZmguZBOB6qrmUG8FjPHC0S4",
		authDomain: "staging-mycape-firebase.firebaseapp.com",
		databaseURL: "https://staging-mycape-firebase.firebaseio.com",
		projectId: "staging-mycape-firebase",
		storageBucket: "staging-mycape-firebase.appspot.com",
		messagingSenderId: "252708440916"
	};
	var main_config = firebase.initializeApp(config);	
	var webAdmin = firebase.database().ref("webAdmin/");
	var flights = firebase.database().ref("flights/");
	
var baseURL = "https://staging-mycape-webservice.appspot.com";
var baseURL2 = "https://staging-mycape-webapp-mercury.appspot.com";
var baseToken = "tokenToNgAnonymousCapeWagKaNaPumalagTokaNaTo!12518237jajsdiajdijioj9128391248hajkhasjkdkajshd";