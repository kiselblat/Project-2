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
  var $messageBody = $("<div/>");
  var $additionalMessage = $("<p/>").text($messageText.val().trim());
  // TODO: Make table of items here
  var $inventoryTable = $("<p/>").text("This is where the inventory could go.");

  $messageBody.append($additionalMessage, $("<br>"), $inventoryTable);

  var newMail = {
    from: "little.mailer.mailer@gmail.com",
    to: $emailInput.val().trim(),
    subject: "Item Report from Nesterly",
    html: $messageBody.prop("outerHTML"),
    attachments: [
      {
        filename: "attachment.txt",
        content: "This is an attachment."
      }
    ]
  };
  postMail(newMail);
  resetForm();
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