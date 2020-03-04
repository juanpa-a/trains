$(document).ready(function() {
  // let trainSchedule = {};

  let firebaseConfig = {
    apiKey: "AIzaSyA_A0W_Q5poGczoc1lSrzsefB0M8hAxdiw",
    authDomain: "trains-4d998.firebaseapp.com",
    databaseURL: "https://trains-4d998.firebaseio.com",
    projectId: "trains-4d998",
    storageBucket: "trains-4d998.appspot.com",
    messagingSenderId: "88639027155",
    appId: "1:88639027155:web:51f3026cf893b3cdebe126",
    measurementId: "G-X7LFEWHR8Q"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Database reference
  let database = firebase.database();
  // Database object reference
  let train = database.ref("/");

  // input letiables
  let trainName = "";
  let destinationText = "";
  let firstTrainTime = "";
  let frequencyMins = 0;

  $("#addTrain").on("click", function() {
    // Retrieving input from the form
    trainName = $("#trainName")
      .val()
      .trim();
    destinationText = $("#destinationText")
      .val()
      .trim();
    firstTrainTime = $("#firstTrainTime")
      .val()
      .trim();
    frequencyMins = $("#frequencyMins")
      .val()
      .trim();

      train.push({
        name: trainName,
        destination: destinationText,
        first: firstTrainTime,
        freq: frequencyMins
      });

      console.log('ok');
      event.preventDefault()
  });

  train.on('value', res => console.log(res))

  train.on("child_added", function(snapshot) {
    let newRow = $("<tr>");

    let frequency = snapshot.val().frequency;
    let firstTrainTime = snapshot.val().firsTrainTime;
    let nextArrival = getNextArrivalTime(firstTrainTime, frequency);
    // console.log(nextArrival);
    let minsAway = moment().to(moment(nextArrival, "HH:mm"));

    newRow.append("<td>" + snapshot.val().name + "</td>");
    newRow.append("<td>" + snapshot.val().destination + "</td>");
    newRow.append("<td>" + frequency + "</td>");
    newRow.append("<td>" + moment(nextArrival).format("HH:mm") + "</td>");
    newRow.append("<td>" + minsAway + "</td>");

    $("#trainsTable").append(newRow);
    console.log('add');
  });

  // Function to calculate the next arrival time
  function getNextArrivalTime(hour, frequency) {
    let nextArrival = moment(hour, "HH:mm");

    while (nextArrival.isSameOrBefore(moment())) {
      console.log("Initial: " + moment(nextArrival).format("HH:mm"));
      nextArrival = moment(nextArrival, "HH:mm").add(frequency, "minutes");
      console.log("Final: " + moment(nextArrival).format("HH:mm"));
    }
    return nextArrival;
  }
});
