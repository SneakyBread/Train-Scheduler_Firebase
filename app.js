$(document).ready(function(){

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCnuP8d0Hlz5I6AT7KyokwuPfoNo1vxdLY",
    authDomain: "trainscheduleryay.firebaseapp.com",
    databaseURL: "https://trainscheduleryay.firebaseio.com",
    projectId: "trainscheduleryay",
    storageBucket: "",
    messagingSenderId: "433369364964"
  };
firebase.initializeApp(config);

firebase.database().ref().on("value", function(snapshot){
    console.log(snapshot.val());
})



});