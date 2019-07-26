// Get references to page elements

var $itemName = $("#itemName");
var $categoryName = $("#categoryName");
var $locationName = $("#locationName");
var $description = $("#description");
var $cost = $("#cost");
var $serialNum = $("#serialNum");
var $warrantyExp = $("#warrantyExp");
var $form = $("#form");
var $submitBtn = $("#submit");

// The API object contains methods for each kind of request we'll make
var API = {
  addItem: function(newItem) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/create",
      type: "POST",
      data: JSON.stringify(newItem)
    });
  },
  getAll: function() {
    return $.ajax({
      url: "api/inventory",
      type: "GET"
    });
  },
  getOne: function() {
    return $.ajax({
      url: "api/:item",
      type: "GET"
    });
  },
  editItem: function() {
    return $.ajax({
      url: "api/update",
      type: "PUT"
    });
  },
  deleteItem: function(id) {
    return $.ajax({
      url: "api/delete/" + id,
      type: "DELETE"
    });
  }
};


// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getAll().then(function(data) {
    var $examples = data.map(function(example) {

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

  var newItem = {
    item: $itemName.val().trim(),
    category: $categoryName.val().trim(),
    location: $locationName.val().trim(),
    description: $description.val().trim(),
    cost: $cost.val().trim(),
    serialNum: $serialNum.val().trim(),
    warranty: $warrantyExp.val().trim()
  };

  if (!(newItem.item || newItem.category || newItem.location)) {
    alert("Item name, category, and location cannot be blank.");
    return;
  }

  API.addItem(newItem).then(function() {
    refreshExamples();
  });

  $form.reset();

};

// handleDeleteBtnClick is called when an inventory's delete button is clicked
// Remove the item from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteItem(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$inventoryList.on("click", ".delete", handleDeleteBtnClick);
