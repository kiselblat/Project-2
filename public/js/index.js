// Get references to page elements
var $inventoryText = $("#inventory-text");
var $inventoryDescription = $("#inventory-description");
var $submitBtn = $("#submit");
var $inventoryList = $("#inventory-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveInventory: function(inventory) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/create",
      type: "POST",
      url: "api/inventory",
      data: JSON.stringify(inventory)
    });
  },
  getInventory: function() {
    return $.ajax({
      url: "api/inventory",
      type: "GET"
    });
  },
  deleteInventory: function(id) {
    return $.ajax({
      url: "api/inventory/" + id,
      type: "DELETE"
    });
  }
};

// refreshInventory gets new inventory from the db and repopulates the list
var refreshInventory = function() {
  API.getInventory().then(function(data) {
    var $inventory = data.map(function(inventory) {
      var $a = $("<a>")
        .text(inventory.text)
        .attr("href", "/inventory/" + inventory.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": inventory.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $inventoryList.empty();
    $inventoryList.append($inventory);
  });
};

// handleFormSubmit is called whenever we submit a new item
// Save the new item to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var inventory = {
    text: $inventoryText.val().trim(),
    description: $inventoryDescription.val().trim()
  };

  if (!(inventory.text && inventory.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveInventory(inventory).then(function() {
    refreshInventory();
  });

  $inventoryText.val("");
  $inventoryDescription.val("");
};

// handleDeleteBtnClick is called when an inventory's delete button is clicked
// Remove the item from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteInventory(idToDelete).then(function() {
    refreshInventory();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$inventoryList.on("click", ".delete", handleDeleteBtnClick);
