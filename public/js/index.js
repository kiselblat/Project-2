var $inventoryList = $("#inventory-list");

// The API object contains methods for each kind of request we'll make
var API = {
  addItem: function (newItem) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/inventory",
      type: "POST",
      data: JSON.stringify(newItem)
    });
  },
  getAll: function () {
    return $.ajax({
      url: "api/inventory",
      type: "GET"
    });
  },
  getOne: function () {
    return $.ajax({
      url: "api/:item",
      type: "GET"
    });
  },
  editItem: function () {
    return $.ajax({
      url: "api/update",
      type: "PUT"
    });
  },
  deleteItem: function (id) {
    return $.ajax({
      url: "api/delete/" + id,
      // url: "api/inventory/" + id,
      type: "DELETE"
    });
  },
};


// refreshExamples gets new items from the db and repopulates the list
var refreshExamples = function() {
  API.getAll().then(function(data) {
    var $inventory = data.map(function(inventory) {

      var $a = $("<a>")
        .text(inventory.category)
        .attr("href", "/inventory/" + inventory.id);

      var $p1 = $("<p>")
        .html("<strong>ID</strong>"+": " + inventory.item);
      var $p2 = $("<p>")
        .html("<strong>Category</strong>"+": " + inventory.category);
      var $p3 = $("<p>")
        .html("<strong>Description</strong>"+": " + inventory.description);
      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": inventory.id
        })
        .append($a,$p1,$p2,$p3);

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
var handleFormSubmit = function (event) {
  event.preventDefault();

  var $itemName = $("#itemName").val().trim();
  var $category = $("#category").find(":selected").val();
  var $location = $("#location").find(":selected").val();
  var $description = $("#description").val().trim();
  var $cost = $("#cost").val().trim();
  var $serialNum = $("#serialNum").val().trim();
  var $warrantyExp = $("#warrantyExp").val().trim();

  console.log($category,$location);

  var newItem = {
    item: $itemName,
    CategoryId: $category,
    LocationId: $location,
    description: $description,
    cost: $cost,
    serialNum: $serialNum,
    warranty: $warrantyExp
  };

  if ((!newItem.item) || (!newItem.category) || (!newItem.location)) {
    alert("Item name, category, and location must be completed.");
    return;
  }


  API.addItem(newItem).then(function () {
    refreshExamples();
    $(".add-form input, textarea").val("");
  });
};

// handleDeleteBtnClick is called when an inventory's delete button is clicked
// Remove the item from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");
  console.log(idToDelete);

  API.deleteItem(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$("#submit").unbind().click(handleFormSubmit);
$inventoryList.on("click", ".delete", handleDeleteBtnClick);
// $(".delete").click(handleDeleteBtnClick);
