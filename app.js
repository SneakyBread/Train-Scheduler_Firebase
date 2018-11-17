$(document).ready(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCnuP8d0Hlz5I6AT7KyokwuPfoNo1vxdLY",
        authDomain: "trainscheduleryay.firebaseapp.com",
        databaseURL: "https://trainscheduleryay.firebaseio.com",
        projectId: "trainscheduleryay",
        storageBucket: "trainscheduleryay.appspot.com",
        messagingSenderId: "433369364964"
    };
    firebase.initializeApp(config);

    // test firebase reference
    firebase.database().ref().on("value", function(snapshot){
        console.log(snapshot.val());
    })

    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var startTime = "";
    var frequency = 0;


    $(".formZ").on("keyup", function() {
        var traintemp = $("#train-name-input").val().trim();
        var citytemp = $("#destination-input").val().trim();
        var timetemp = $("#train-time-input").val().trim();
        var freqtemp = $("#frequency-input").val().trim();

        sessionStorage.setItem("train", traintemp);
        sessionStorage.setItem("city", citytemp);
        sessionStorage.setItem("time", timetemp);
        sessionStorage.setItem("freq", freqtemp);
    });

    $("#train-name-input").val(sessionStorage.getItem("train"));
    $("#destination-input").val(sessionStorage.getItem("city"));
    $("#train-time-input").val(sessionStorage.getItem("time"));
    $("#frequency-input").val(sessionStorage.getItem("freq"));

    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();

        if ($("#train-name-input").val().trim() === "" ||
            $("#destination-input").val().trim() === "" ||
            $("#train-time-input").val().trim() === "" ||
            $("#frequency-input").val().trim() === "") {

            alert("Please fill in all details to add new train");

        } else {
            trainName = $("#train-name-input").val().trim();
            destination = $("#destination-input").val().trim();
            startTime = $("#train-time-input").val().trim();
            frequency = $("#frequency-input").val().trim();

            $(".formZ").val("");

            database.ref().push({
                trainName: trainName,
                destination: destination,
                frequency: frequency,
                startTime: startTime,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });

            sessionStorage.clear();
        }

    });

    database.ref().on("child_added", function(childSnapshot) {
        var startTimeConverted = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");
        var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
        var timeRemain = timeDiff % childSnapshot.val().frequency;
        var minToArrival = childSnapshot.val().frequency - timeRemain;
        var nextTrain = moment().add(minToArrival, "minutes");
        var key = childSnapshot.key;

        var newrow = $("<tr>");
        newrow.append($("<td>" + childSnapshot.val().trainName + "</td>"));
        newrow.append($("<td>" + childSnapshot.val().destination + "</td>"));
        newrow.append($("<td class='text-center'>" + childSnapshot.val().frequency + "</td>"));
        newrow.append($("<td class='text-center'>" + moment(nextTrain).format("LT") + "</td>"));
        newrow.append($("<td class='text-center'>" + minToArrival + "</td>"));
        newrow.append($("<td class='text-center'><button class='arrival btn btn-color btn-xs' data-key='" + key + "'>X</button></td>"));

        if (minToArrival < 6) {
            newrow.addClass("info");
        }

        $("#newInfo").append(newrow);

    });

    $(document).on("click", ".arrival", function() {
        keyref = $(this).attr("data-key");
        database.ref().child(keyref).remove();
        window.location.reload();
    });


    setInterval(function() {
        window.location.reload();
    }, 60000);

});