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

      // var $a = $("<a>")
      //   .text(inventory.category)
      //   .attr("href", "/inventory/" + inventory.id);

      // var $p1 = $("<p>")
      //   .html("<strong>ID</strong>"+": " + inventory.item);
      // var $p2 = $("<p>")
      //   .html("<strong>Category</strong>"+": " + inventory.category);
      // var $p3 = $("<p>")
      //   .html("<strong>Description</strong>"+": " + inventory.description);
      // var $li = $("<li>")
      //   .attr({
      //     class: "list-group-item",
      //     "data-id": inventory.id
      //   })
      //   .append($a,$p1,$p2,$p3);

      // var $button = $("<button>")
      //   .addClass("btn btn-danger float-right delete")
      //   .text("ｘ");

      // $li.append($button);
      // var $editCard = $("<i class='fas fa-pen-alt editing' data-toggle='modal' data-target='#myModal'></i>").html();
      var $editCard = $("<i>");
      $editCard.attr("class","fas fa-pen-alt editing");
      $editCard.attr("data-toggle", "modal");
      $editCard.attr("data-target", "#myModal");
      $editCard.text("Edit");

      // var $deleteCard = $("<i>")
      //   .attr({
      //     class:"fas fa-trash-alt delete"
      //   });
      // var $deleteCard = $("<i class='fas fa-trash-alt delete'></i>").html();
      var $deleteCard = $("<i>");
      $deleteCard.attr("class", "fas fa-trash-alt delete");
      $deleteCard.text("Delete");

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
    category: $category,
    location: $location,
    description: $description,
    cost: parseFloat($cost),
    serialNum: $serialNum,
    warrantyExp: $warrantyExp
  };

  $("#form").trigger("reset");

  console.log(newItem);
  console.log("id here:" + $id);

  if ((!newItem.item) || (!newItem.category) || (!newItem.location)) {
    alert("Item name, category, and location must be completed.");
    return;
  }
  if ((!updateItem.item) || (!updateItem.category) || (!updateItem.location)) {
    alert("Item name, category, and location must be completed.");
    return;
  }

  $(".add-form").children("input").val("");

  if ($id === null){
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
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .parent()
    .attr("data-id");
  console.log(idToDelete);

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
    $(".modal-body #category").val(data.category);
    $(".modal-body #location").val(data.location);
    $(".modal-body #cost").val(data.cost);
    $(".modal-body #serialNum").val(data.serialNum);
    $(".modal-body #warrantyExp").val(data.warranty);
    $(".modal-body #description").val(data.description);
    $(".modal-body #idSeq").val(data.id);
    // $(".modal-body #itemName").val(data.item);

    console.log(data.warranty);
  });
};

// Add event listeners to the submit and delete buttons
$("#submit").unbind().click(handleFormSubmit);
// $("#saveChanges").unbind().click(handleFormUpdate);
$inventoryList.on("click", ".delete", handleDeleteBtnClick);
$inventoryList.on("click", ".editing", handleEditBtnClick);
// $(".delete").click(handleDeleteBtnClick);
