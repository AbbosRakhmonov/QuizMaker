let NameOfUser = document.getElementById("name");
let SurnameOfUser = document.getElementById("surname");
let questions_base = null;
//edit question
function edit_question(id) {
  questions_base.map((item) => {
    if (id == item.id) {
      $("#result-box").removeClass("d-none").addClass("d-flex");
      $("#question-edit-pop").removeClass("d-none").addClass("d-block");
      $("#question-edit-pop #question-name").val(item.name);
      $("#question-edit-pop .answers .an_1").val(item.an_tr1);
      $("#question-edit-pop .answers .an_2").val(item.an2);
      $("#question-edit-pop .answers .an_3").val(item.an3);
      $("#question-edit-pop .answers .an_4").val(item.an4);

      $("#question-edit-pop .btn-add-question").click(function () {
        let name = $("#question-edit-pop #question-name").val();
        let an_tr1 = $("#question-edit-pop .answers .an_1").val();
        let an2 = $("#question-edit-pop .answers .an_2").val();
        let an3 = $("#question-edit-pop .answers .an_3").val();
        let an4 = $("#question-edit-pop .answers .an_4").val();
        let id = item.id;

        $.ajax({
          type: "POST",
          url: "main.php",
          data: {
            id: id,
            name: name,
            an_tr1: an_tr1,
            an2: an2,
            an3: an3,
            an4: an4,
          },
          success: function () {
            location.reload();
          },
          error: function (e) {
            console.log(e);
          },
        });
      });
    }
  });
}
//delete question
function delete_question() {
  $(".question-row").map((index, item) => {
    if ($(item).hasClass("selected-question")) {
      $("#result-box").removeClass("d-none").addClass("d-flex");
      $("#question-delete-pop").removeClass("d-none").addClass("d-block");
      $("#result-box .true-btn").click(function () {
        let id = item.id;
        $.ajax({
          type: "POST",
          url: "delete.php",
          data: {
            id: id,
          },
          success: function () {
            location.reload();
          },
          error: function (e) {
            console.log(e);
          },
        });
      });
      $("#result-box .false-btn").click(function () {
        $("#result-box").removeClass("d-flex").addClass("d-none");
        $("#question-delete-pop").removeClass("d-block").addClass("d-none");
      });
    }
  });
}
// myFunc => enter question page if username and surname are not empty
function myfunc() {
  let TestName = NameOfUser.value;
  let TestSurname = SurnameOfUser.value;
  if (isNaN(TestName) && isNaN(TestSurname)) {
    document
      .getElementById("location_play")
      .setAttribute("href", "./question-page.html");
    window.location.href = "question-page.html";
  } else return false;
}
// change windows location to admin.html
function adminPage() {
  window.location.href = "admin.html";
}
// checkmark on the left side
function put_checkmark(event) {
  $(".question-row").map((index, item) => {
    if (item.getAttribute("key") == event.id) {
      $(item).toggleClass("selected-question");
    }
  });
}

$(document).ready(function () {
  let password = null;
  // get admin password
  $.ajax({
    type: "GET",
    url: "admin.php",
    dataType: "JSON",
    success: function (res) {
      password = res;
    },
    error: function (e) {
      console.log(e);
    },
  });
  // get questions
  $.ajax({
    type: "GET",
    url: "main.php",
    dataType: "JSON",
    success: function (res) {
      questions_base = res;
      questions_base.map((item, index) => {
        $("#question-lists").append(
          `<tr
          class="question-row spacer d-flex align-items-center justify-content-center" id="${
            item.id
          }" key="q-${item.id}">
          <td class="select-col p-0 border-0">
            <input type="checkbox" id="q-${
              item.id
            }" class="user-checkbox d-none" onchange="put_checkmark(this)" />
            <label for="q-${item.id}" class="checkbox">
            <img src="./img/check-mark.svg" alt=""/>
            </label>
          </td>
          <td class="number-col p-0 border-0">${index + 1}</td>
          <td class="title-col p-0 border-0">
            <label for="q-${item.id}" class="m-0 d-block label">${
            item.name
          }</label>
          </td>
          <td
            class="edit-col p-0 border-0 d-flex align-items-center justify-content-end"
          >
            <button class="btn p-0 btn-edit-question btn-edit" id="${
              item.id
            }" onclick="edit_question(this.id)">
              <img src="./img/edit-icon.svg" alt="" />
            </button>
            <button class="btn p-0 btn-edit-question btn-delete" id="${
              item.id
            }" onclick="delete_question()">
              <img src="./img/delete-icon.svg" alt="" />
            </button>
          </td>
        </tr>
          `
        );
      });
    },
    error: function (err) {
      console.log(err);
    },
  });

  $(".enter-db").click(function (e) {
    e.preventDefault();
    if ($(".admin-password").val() == password[0].pass) {
      window.location.href = "database.html";
    } else alert("parol xato");
  });

  $(".btn-messageSend").click(function () {
    let testEmail = $("#inputPassword5").val();
    if (testEmail == "abbos.raxmonov.2001@gmail.com") {
      Email.send({
        Host: "smtp.gmail.com",
        Username: "quizmaker2021@gmail.com",
        Password: "quizmaker123",
        To: testEmail,
        From: "quizmaker2021@gmail.com",
        Subject: "Quiz Maker Password",
        Body: `The password of base is "${password[0].pass}"`,
      }).then(() => {
        $(".succesMessage").text(
          "Check your e-mail , we have sent the password to your email"
        );
        setTimeout(function () {
          $("#staticBackdrop").modal("hide");
          $(".succesMessage").text("");
          $("#inputPassword5").val("");
        }, 1500);
      });
    }
  });

  $(".search-bar-btn").click(function () {
    $("#result-box").removeClass("d-none").addClass("d-flex");
    $("#question-add-pop").removeClass("d-none").addClass("d-block");
    $("#question-add-pop .btn-add-question").click(function () {
      let name = $("#question-add-pop #question-name").val();
      let an_tr1 = $("#question-add-pop .answers .an_1").val();
      let an2 = $("#question-add-pop .answers .an_2").val();
      let an3 = $("#question-add-pop .answers .an_3").val();
      let an4 = $("#question-add-pop .answers .an_4").val();
      let id = null;

      $.ajax({
        type: "POST",
        url: "insert.php",
        data: {
          id: id,
          name: name,
          an_tr1: an_tr1,
          an2: an2,
          an3: an3,
          an4: an4,
        },
        success: function () {
          location.reload();
        },
        error: function (e) {
          console.log(e);
        },
      });
    });
  });

  $("#question-edit-pop .cancel-btn").click(function () {
    $("#result-box").removeClass("d-flex").addClass("d-none");
    $("#question-edit-pop").removeClass("d-block").addClass("d-none");
    $("#question-edit-pop #question-name").val("");
    $("#question-edit-pop .answers .an_1").val("");
    $("#question-edit-pop .answers .an_2").val("");
    $("#question-edit-pop .answers .an_3").val("");
    $("#question-edit-pop .answers .an_4").val("");
  });

  $("#question-add-pop .cancel-btn").click(function () {
    $("#result-box").removeClass("d-flex").addClass("d-none");
    $("#question-add-pop").removeClass("d-block").addClass("d-none");
    $("#question-add-pop #question-name").val("");
    $("#question-add-pop .answers .an_1").val("");
    $("#question-add-pop .answers .an_2").val("");
    $("#question-add-pop .answers .an_3").val("");
    $("#question-add-pop .answers .an_4").val("");
  });

  $("#question-delete-pop .cancel-btn").click(function () {
    $("#result-box").removeClass("d-flex").addClass("d-none");
    $("#question-delete-pop").removeClass("d-block").addClass("d-none");
    $("#question-delete-pop #question-name").val("");
    $("#question-delete-pop .answers .an_1").val("");
    $("#question-delete-pop .answers .an_2").val("");
    $("#question-delete-pop .answers .an_3").val("");
    $("#question-delete-pop .answers .an_4").val("");
  });

  $("#search-input").keyup(function (e) {
    let itemSearched = e.target.value.toLowerCase();
    $("#question-lists .label").map((index, item) => {
      if ($(item).text().toLowerCase().indexOf(itemSearched) == -1) {
        $(".question-row").eq(index).removeClass("d-flex").addClass("d-none");
      } else {
        $(".question-row").eq(index).removeClass("none").addClass("d-flex");
      }
    });
  });
});
