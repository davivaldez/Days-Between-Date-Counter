const dateStart = document.getElementById("date-start");
const dateFinal = document.getElementById("date-final");
const dateResult = document.getElementById("date-result");

function clearInputs() {
  dateStart.value = "";
  dateFinal.value = "";
  dateResult.value = "";
}

function daysToNextDate() {
  if (!dateStart.value || !dateFinal.value) {
    return alert("Por favor, preencha todos os campos para ver a diferença de dias.");
  }

   fetch("http://localhost:3000/date", {
     method: "POST",
     headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       dateStartBody: dateStart.value,
       dateFinalBody: dateFinal.value
       })
     })
     .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro na requisição!");
        }
     })
     .then((data) => {
        data = data.toString();
        if (data.indexOf("-") !== -1) {
            clearInputs();
            return alert("A data de início não pode ser posterior à data final.");
          }

        else if (data === "0") {
          clearInputs();
          return alert("A data de início não pode ser igual à data final.");
        }
        dateResult.value = data + " dia(s)";
     })
     .catch((error) => {
      console.error("Erro: " + error);
     })
}
