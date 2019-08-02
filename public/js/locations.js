var $locationList = $("#location-list");

var API = {
  getLocations: function() {
    return $.ajax({
      url: "/api/locations",
      type: "GET"
    });
  },
  addLocation: function(newlocation) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/locations",
      type: "POST",
      data: JSON.stringify(newlocation)
    });
  },
  deleteLocation: function(id) {
    return $.ajax({
      url: "/api/locations/" + id,
      // url: "api/inventory/" + id,
      type: "DELETE"
    });
  },
};

var refreshExamples = function() {
  API.getAll().then(function(data) {
    var $location = data.map(function(locations) {

      var $a = $("<a>")
        .text(locations.location)
        .attr("href", "/locations/" + locations.id);

      var $p1 = $("<p>")
        .html("<strong>Name</strong>"+": " + locations.locationName);
      
      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": locations.id
        })
        .append($a,$p1);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $locationList.empty();
    $locationList.append($location);
  });
};

var handleFormSubmit = function (event) {
  event.preventDefault();
  console.log("click!");
  var $locationName = $("#locationName").val().trim();
  console.log("trying to add: ", $locationName);

  var newLocation = {
    locationName: $locationName,
  };

  if (typeof newLocation.locationName === "undefined") {
    alert("location must have a name!");
    return;
  }

  API.addLocation(newLocation).then(function () {
    refreshExamples();
    $("#locationName").val("");
  });

  // $.post("/api/catagories/create", newlocation).then(refreshExamples());

};

// handleDeleteBtnClick is called when an inventory's delete button is clicked
// Remove the item from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");
  console.log(idToDelete);

  API.deleteLocation(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$("#submitLocation").unbind().click(handleFormSubmit);
$locationList.on("click", ".delete", handleDeleteBtnClick);
