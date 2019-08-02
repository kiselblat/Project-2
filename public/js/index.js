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
  getOne: function (id) {
    return $.ajax({
      // url: "api/:item",
      url:"api/inventory/" + id,
      type: "GET"
    });
  },
  editItem: function (item) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/update/",
      type: "PUT",
      data: JSON.stringify(item)
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

      var $editCard = $("<i>");
      $editCard.attr("class","fas fa-pen-alt editing float-left");
      $editCard.attr("data-toggle", "modal");
      $editCard.attr("data-target", "#myModal");
      // $editCard.text("Edit");

      var $deleteCard = $("<i>");
      $deleteCard.attr("class", "fas fa-trash-alt delete float-right");
      $deleteCard.attr("data-toggle", "modal");
      $deleteCard.attr("data-target", "#deleteModal");
      // $deleteCard.text("Delete");

      var $cardHeader = $("<div>")
        .attr("class","card-header text-right")
        .append($editCard, $deleteCard);

      var $cardT1 = $("<p>")
        .attr({
          class: "card-title"
        })
        .append(inventory.item);
      var $cardT2 = $("<p>")
        .attr({
          class: "card-text"
        })
        .append(inventory.description);
      var $cardT3 = $("<p>")
        .attr({
          class: "card-text"
        })
        .append(inventory.cost);

      var $cardBody = $("<div>")
        .attr({class:"card-body"})
        .append($cardT1, $cardT2, $cardT3);
      var $card = $("<div>")
        .attr({
          class:"card text-white bg-success mb-3",
          "data-id": inventory.id,
          style:"max-width: 18rem"
        })
        .append($cardHeader, $cardBody);
      
      return $card;
    });

    $inventoryList.empty();
    $inventoryList.append($inventory);
  });
};

// handleFormSubmit is called whenever we submit a new item
// Save the new item to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var $id = $("#idSeq").val().trim();
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
    warrantyExp: $warrantyExp
  };

  var updateItem = {
    id: parseInt($id),
    item: $itemName,
    CategoryId: $category,
    LocationId: $location,
    description: $description,
    cost: parseFloat($cost),
    serialNum: $serialNum,
    warrantyExp: $warrantyExp
  };

  $("#form").trigger("reset");

  console.log(newItem);
  console.log("id here:" + $id);

  if ((!newItem.item) || (!newItem.CategoryId) || (!newItem.LocationId)) {
    alert("Item name, category, and location must be completed.");
    return;
  }
  if ((!updateItem.item) || (!updateItem.CategoryId) || (!updateItem.LocationId)) {
    alert("Item name, category, and location must be completed.");
    return;
  }

  $(".add-form").children("input").val("");

  if (!$id){
    API.addItem(newItem).then(function () {
      refreshExamples();
      $(".add-form input, textarea").val("");
    });
  }
  else {
    console.log("Now ID is:" + $id);
    API.editItem(updateItem).then(function () {
      refreshExamples();
      $(".add-form input, textarea").val("");
    });
  }
  
};

// handleDeleteBtnClick is called when an inventory's delete button is clicked
// Remove the item from the db and refresh the list
var handleConfirmBtnClick = function () {
  // var idToDelete = $(this)
  //   .parent()
  //   .parent()
  //   .attr("idSeqDelete");
  event.preventDefault();

  // var $id = $("#idSeq").val().trim();
  var idToDelete = $("#idSeqDelete").val().trim();
  console.log("id to delete:" + idToDelete);

  API.deleteItem(idToDelete).then(function () {
    refreshExamples();
  });
};

// handleEditBtnClick is called when inventory's edit button is clicked
var handleEditBtnClick = function() {
  var idToEdit = $(this)
    .parent()
    .parent()
    .attr("data-id");
  console.log(idToEdit);

  API.getOne(idToEdit).then(function (data) {

    $(".modal-body #itemName").val(data.item);
    $(".modal-body #category").val(data.CategoryId);
    $(".modal-body #location").val(data.LocationId);
    $(".modal-body #cost").val(data.cost);
    $(".modal-body #serialNum").val(data.serialNum);
    $(".modal-body #warrantyExp").val(data.warrantyExp);
    $(".modal-body #description").val(data.description);
    $(".modal-body #idSeq").val(data.id);
    // $(".modal-body #itemName").val(data.item);

    console.log(data.warrantyExp);
  });
};

// handleEditBtnClick is called when inventory's edit button is clicked
var handleDeleteBtnClick = function() {
  var idToEdit = $(this)
    .parent()
    .parent()
    .attr("data-id");
  console.log("Here is: "+idToEdit);

  API.getOne(idToEdit).then(function (data) {

    $(".modal-body #idSeqDelete").val(data.id);
    console.log("Here are: " + data.id);
    // $(".modal-body #itemName").val(data.item);
  });
};

// Add event listeners to the submit and delete buttons
$("#submit").unbind().click(handleFormSubmit);
$("#confirming").unbind().click(handleConfirmBtnClick);
// $("#saveChanges").unbind().click(handleFormUpdate);
// $inventoryList.on("click", ".delete", handleDeleteBtnClick);
$inventoryList.on("click", ".editing", handleEditBtnClick);
$inventoryList.on("click", ".delete", handleDeleteBtnClick);
// $(".delete").click(handleDeleteBtnClick);
