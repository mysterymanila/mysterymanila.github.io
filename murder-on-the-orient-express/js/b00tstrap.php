
<?php
echo '<script language="javascript">';
echo 'var config = {
	
	
	apiKey: "AIzaSyD8hIhMd_qZZmguZBOB6qrmUG8FjPHC0S4",
		authDomain: "staging-mycape-firebase.firebaseapp.com",
		databaseURL: "https://staging-mycape-firebase.firebaseio.com",
		projectId: "staging-mycape-firebase",
		storageBucket: "staging-mycape-firebase.appspot.com",
		messagingSenderId: "252708440916"
	};';
	echo 'var main_config = firebase.initializeApp(config);';
	echo 'var webAdmin = firebase.database().ref("webAdmin/");';
	echo 'var flights = firebase.database().ref("flights/");';
	
	echo 'var baseURL = "https://staging-mycape-webservice.appspot.com";';
	echo 'var baseURL2 = "https://staging-mycape-webapp-mercury.appspot.com";';
echo 'var baseToken = "tokenToNgAnonymousCapeWagKaNaPumalagTokaNaTo!12518237jajsdiajdijioj9128391248hajkhasjkdkajshd";';
echo '</script>';
?>