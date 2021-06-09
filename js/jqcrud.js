$(function () {
  read_product();
  $("#card").on("click", ".deleteButton", delete_product);
  $(".product-main").on("click", ".editButton", update_product);
  $("#addBtn").click(add_product);
  $("#updateBtn").click(function () {
    var id = $("#updatedId").val();
    var name = $("#updatedname").val();
    var price = $("#updatedprice").val();
    var color = $("#updatedcolor").val();
    var department = $("#updateddepartment").val();
    var description = $("#updateddescription").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/" + id,
      data: { name, price, color, department, description },
      method: "PUT",
      success: function (response) {
        console.log(response);
        read_product();
        $("#updateproductmodal").modal("hide");
      },
    });
  });
});
function read_product() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "GET",
    success: function (response) {
      console.log(response);
      var product = $(".product-main");
      product.empty();
      for (var i = 0; i < response.length; i++) {
        var temp = response[i];
        product.append(
          `<div class="col-12 col-lg-3 p-3 text-center product mt-3 ml-1" data-id="${temp._id}">
          <span class="deparment">&ThickSpace;&ThickSpace;${temp.department} &ThinSpace;</span>
          <h3 class="mt-3">${temp.name}</h3>
          <span>Rs ${temp.price}</span>
          <p class="text-justify">${temp.description}</p>
          <p>Colors: ${temp.color}</p>
          <div class="buttons">
            <button class="btn btn-primary deleteButton">Delete</button>
            <button class="btn btn-outline-primary editButton">Edit</button>
          </div>
          </div>`
        );
      }
    },
  });
}
function delete_product() {
  var btn = $(this);
  var parent = btn.closest(".product");
  let id = parent.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/" + id,
    method: "DELETE",
    success: function (response) {
      read_product();
    },
  });
}
function add_product() {
  var name = $("#name").val();
  var price = $("#price").val();
  var color = $("#color").val();
  var department = $("#department").val();
  var description = $("#description").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "POST",
    data: { name, price, color, department, description },
    success: function (response) {
      console.log(response);
      $("#name").val("");
      $("#price").val("");
      $("#color").val("");
      $("#department").val("");
      $("#description").val("");
      read_product();
      $("#addproductmodal").modal("hide");
    },
  });
}
function update_product() {
  var btn = $(this);
  var parent = btn.closest(".product");
  let id = parent.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/" + id,
    method: "GET",
    success: function (response) {
      $("#updatedId").val(response._id);
      $("#updatedname").val(response.name);
      $("#updatedprice").val(response.price);
      $("#updatedcolor").val(response.color);
      $("#updateddepartment").val(response.department);
      $("#updateddescription").val(response.description);
      $("#updateproductmodal").modal("show");
    },
  });
}
