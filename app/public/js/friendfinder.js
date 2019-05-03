
$(document).on("click", "#submit", function () {
    var person = {};

    person.name = $("#name").val();
    person.photo = $("#photo").val();
    person.scores = [];
    var selectEles = $(".select");

    for (var i = 0; i < selectEles.length; i++) {
        person.scores.push($(selectEles[i]).val());
    }
    console.log(person);

    $.ajax({
        url: "/api/friends",
        method: "POST",
        data: JSON.stringify(person),
        contentType: "application/json"
    }).done(function (msg) {
        console.log(msg);
        displayNewBestFriend(msg);
    }).fail(function(jqXHR){
        console.log(jqXHR.responseText)
    });


});

function displayNewBestFriend(person){
    $("#matchname").html(person.name);
    $("#matchpic").attr("src", person.photo);
    $("#friendsModal").modal("show");
}