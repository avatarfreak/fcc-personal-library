$(document).ready(function() {
  var items = [];
  var itemsRaw = [];

  $.getJSON("/api/books", function(data) {
    //var items = [];
    itemsRaw = data;

    items.push(
      `<h5 class="text-center text-light text-uppercase book-collection">Collection of Books <span class="text-primary font-weight-bold">&#128218; </span><span class="badge badge-pill badge-primary">${data.length}</span></h5>`
    );
    $.each(data, function(i, val) {
      items.push(
        `<li class="bookItem list-group-item d-flex justify-content-between align-items-center" id='${i}'>
         <strong class="text-capitalize">${val.title}</strong>
              <span> ${
                val.commentcount > 1 ? "comments" : "comment"
              } <sup class="badge badge-pill badge-info">${
          val.commentcount
        }</sup></span>
        </li>`
      );
      return i !== 14;
    });
    if (items.length >= 15) {
      items.push(
        "<p class='text-danger font-weight-bold'>...and " +
          (data.length - 15) +
          " more!</p>"
      );
    }
    $("<ul/>", {
      class: "listWrapper list-group",
      html: items.join("")
    }).appendTo("#display");
  });

  var comments = [];
  $("#display").on("click", "li.bookItem", function() {
    $("#detailTitle").html(
      `<p class=" text-light bg-primary">${itemsRaw[this.id].title}</p>
        <small class="text-capitalize text-light"> ( id: ${itemsRaw[this.id]._id} ) </small>`
    );
    $.getJSON("/api/books/" + itemsRaw[this.id]._id, function(data) {
      comments = [];
      $.each(data.comments, function(i, val) {
        comments.push(`<li class="list-group-item">${i + 1}. ${val}</li>`);
      });
      comments.push(`<form id="newCommentForm" class="mt-3 bg-secondary p-3 rounded">
              <div class="input-group">
                <input type="text" class="form-control" id="commentToAdd" name="comment" placeholder="New Comment" required=""/>
                <div class="input-group-append">
                  <button class="btn btn-info addComment" id=${data._id} > Add Comment </button>
                </div>
                <div class="input-group-append">
                  <button class="btn btn-danger deleteBook" id=${data._id} > Delete Book </button>
                </div>
              </div>
            </form>`);
      $("#detailComments").html(comments.join(""));
    });
  });

  $("#bookDetail").on("click", "button.deleteBook", function() {
    $.ajax({
      url: "/api/books/" + this.id,
      type: "delete",
      success: function(data) {
        //update list
        $("#dataResult").text(data);
        $("#book-library").modal({ show: true });
        $("#book-library").on("hidden.bs.modal", function() {
          location.reload();
        });
      }
    });
  });

  $("#bookDetail").on("click", "button.addComment", function() {
    var newComment = $("#commentToAdd").val();
    $.ajax({
      url: "/api/books/" + this.id,
      type: "post",
      dataType: "json",
      data: $("#newCommentForm").serialize(),
      success: function(data) {
        comments.unshift(newComment); //adds new comment to top of list
        $("#detailComments").html(comments.join(""));
      }
    });
  });

  $("#newBook").click(function() {
    $.ajax({
      url: "/api/books",
      type: "post",
      dataType: "json",
      data: $("#newBookForm").serialize(),
      success: function(data) {
        //update
      }
    });
  });

  $("#deleteAllBooks").click(function() {
    $.ajax({
      url: "/api/books",
      type: "delete",
      dataType: "json",
      data: $("#newBookForm").serialize(),
      success: function(data) {
        //update list
        $("#dataResult").text(data);
        $("#book-library").modal({ show: true });
        $("#book-library").on("hidden.bs.modal", function() {
          location.reload();
        });
      }
    });
  });
});
