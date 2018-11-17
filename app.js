// $(document).ready(function(){
//     // Initialize Firebase
//     var config = {
//         apiKey: "AIzaSyCnuP8d0Hlz5I6AT7KyokwuPfoNo1vxdLY",
//         authDomain: "trainscheduleryay.firebaseapp.com",
//         databaseURL: "https://trainscheduleryay.firebaseio.com",
//         projectId: "trainscheduleryay",
//         storageBucket: "",
//         messagingSenderId: "433369364964"
//     };
//     firebase.initializeApp(config);

//     firebase.database().ref().on("value", function(snapshot){
//         console.log(snapshot.val());
//     })

//     // 1. Link to Firebase
// 	var trainData = firebase.database();

// 	// 2. Button for adding Trains
// 	$("#add-train-btn").on("click", function(){

// 		// Grabs user input and assign to variables
// 		var trainName = $("#train-name-input").val().trim();
// 		var destination = $("#destination-input").val().trim();
// 		var trainTimeInput = moment($("#train-time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");;
// 		var frequencyInput = $("#frequency-input").val().trim();

// 		// Test for variables entered
// 		console.log(trainName);
// 		console.log(destination);
// 		console.log(trainTimeInput);
// 		console.log(frequencyInput);

// 		// Creates local "temporary" object for holding train data
// 		// Will push this to firebase
// 		var newTrain = {
// 			name:  trainName,
// 			destination: destination,
// 			trainTime: trainTimeInput,
// 			frequency: frequencyInput,
// 		}

// 		// pushing trainInfo to Firebase
// 		trainData.push(newTrain);

// 		// clear text-boxes
// 		$("#train-name-input").val("");
// 		$("#destination-input").val("");
// 		$("#train-time-input").val("");
// 		$("#frequency-input").val("");

// 		// Prevents page from refreshing
// 		return false;
// 	});

// 	trainData.on("child_added", function(childSnapshot, prevChildKey){

// 		console.log(childSnapshot.val());

// 		// assign firebase variables to snapshots.
// 		var firebaseName = childSnapshot.val().name;
// 		var firebaseDestination = childSnapshot.val().destination;
// 		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
// 		var firebaseFrequency = childSnapshot.val().frequency;
		
// 		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
// 		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
// 		var minutes = firebaseFrequency - timeRemainder;

// 		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
// 		// Test for correct times and info
// 		console.log(minutes);
// 		console.log(nextTrainArrival);
// 		console.log(moment().format("hh:mm A"));
// 		console.log(nextTrainArrival);
// 		console.log(moment().format("X"));

// 		// Append train info to table on page
// 		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

// 	});


// });