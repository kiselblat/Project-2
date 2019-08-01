
$emailInput = $("#email-address");
$messageText = $("#additional-message");

var postMail = function(email) {
  return $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "api/send",
    data: JSON.stringify(email)
  });
};

encloseMail = function () {
  console.log("enclosing mail...");
  $.ajax({
    url: "api/inventory",
    type: "GET"
  }).then(function(dbItems) {

    var $messageBody = $("<div/>");
    var $additionalMessage = $("<p/>").text($messageText.val().trim());
    // TODO: Make table of items here
    var $inventoryTable = $("<p/>").text("This is where the inventory could go.");
    
    $messageBody.append($additionalMessage, $("<br>"), $inventoryTable);
    
    var newMail = {
      // from: "Email Sender" // this gets assigned in the route to avoid hardcoding
      to: $emailInput.val().trim(),
      html: $messageBody.prop("outerHTML"),
      attachment: dbItems
    };

    postMail(newMail);
    console.log("...and sent!");
    resetForm();
  });
};

var resetForm = function () {
  $emailInput.val("");
  $messageText.val("");
};

$("document").ready( function () {
  $("#submit").click(function(event) {
    event.preventDefault();
    console.log("click");
    encloseMail();
  });
});