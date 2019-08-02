var $categoryList = $("#category-list");

var API = {
  getCategories: function() {
    return $.ajax({
      url: "/api/categories",
      type: "GET"
    });
  },
  addCategory: function(newCategory) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/categories",
      type: "POST",
      data: JSON.stringify(newCategory)
    });
  },
  deleteCategory: function(id) {
    return $.ajax({
      url: "/api/categories/" + id,
      // url: "api/inventory/" + id,
      type: "DELETE"
    });
  },
};

var refreshCategories = function() {
  API.getCategories().then(function(data) {

    var $category = data.map(function(categories) {

      var $a = $("<a>")
        .text(categories.id)
        .attr("href", "/categories/" + categories.id);

      var $p1 = $("<p>")
        .html("<strong>Name</strong>"+": " + categories.categoryName);
      
      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": categories.id
        })
        .append($a,$p1);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $categoryList.empty();
    $categoryList.append($category);
  });
};

var handleFormSubmit = function (event) {
  event.preventDefault();
  console.log("click!");
  var $categoryName = $("#categoryName").val().trim();
  console.log("trying to add: ", $categoryName);

  var newCategory = {
    categoryName: $categoryName,
  };

  if (typeof newCategory.categoryName === "undefined") {
    alert("Category must have a name!");
    return;
  }

  API.addCategory(newCategory).then(function () {
    refreshCategories();
    $("#categoryName").val("");
  });

  // $.post("/api/catagories/create", newCategory).then(refreshExamples());

};

// handleDeleteBtnClick is called when an inventory's delete button is clicked
// Remove the item from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");
  console.log(idToDelete);

  API.deleteCategory(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$("#submit").unbind().click(handleFormSubmit);
$categoryList.on("click", ".delete", handleDeleteBtnClick);
refreshCategories();
