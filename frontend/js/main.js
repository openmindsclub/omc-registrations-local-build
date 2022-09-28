const url = "http://localhost:3000/members/";

$(document).ready(function () {
  $("form").validate({
    submitHandler: function (form) {
      console.log("done");
      return;
    },
    errorElement: "div",
    errorPlacement: function (error, element) {
      var placement = $(element).data("error");
      if (placement) {
        $(placement).append(error);
      } else {
        error.insertAfter(element);
      }
    },
  });
});

function doSubmit() {
  // get all selected teams
  var team = [];
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");

  for (var i = 0; i < checkboxes.length; i++) {
    team.push(checkboxes[i].value);
  }

  // post request data
  let formData = new FormData(document.querySelector("form"));
  let data = Object.fromEntries(formData.entries());
  data.team = team;

  // request options
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // send POST request
  fetch(url, options)
    .then((res) => {
      if (res.ok) {
        alert(
          "Inscription Terminée ! Nous allons vous envoyer un email d'acceptation plus tard aujourd'hui. Veuillez vérifier votre messagerie pour plus d'instructions."
        );
      } else {
        alert(
          "Une erreur s'est produite (champs non complet, incorrect ou utilisateur non unique). Contactez-nous sur nos réseaux sociaux ou envoyez un email a 'openmindsclub@gmail.com' pour en savoir plus."
        );
      }
    })
    .catch((err) =>
      alert(
        "Une erreur s'est produite (champs non complet, incorrect ou utilisateur non unique). Contactez-nous sur nos réseaux sociaux ou envoyez un email a 'openmindsclub@gmail.com' pour en savoir plus."
      )
    );
}
