const getData = (season, round) => {
  axios.get(`http://ergast.com/api/f1/${season}/${round}/driverstandings.json`)
    .then(response => {
      const data = response.data;
      const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

      if (!standings || standings.length === 0) {
        showError("No data available for the specified season and round.");
        return;
      }

      standings.forEach(driver => {
        const position = driver.position;
        const designation = driver.Driver.givenName + " " + driver.Driver.familyName;
        const nationality = driver.Driver.nationality;
        const sponsor = driver.Constructors[0].name;
        const points = driver.points;
  
        console.log("Position:", position);
        console.log("Name:", designation);
        console.log("Nationality:", nationality);
        console.log("Sponsor:", sponsor);
        console.log("Points:", points);
        console.log("---------------------");
  
        const row = document.createElement("tr");
  
        const positionColumn = createColumn("Position", position);
        const nameColumn = createColumn("Name", designation);
        const nationalityColumn = createColumn("Nationality", nationality);
        const sponsorColumn = createColumn("Sponsor", sponsor);
        const pointsColumn = createColumn("Points", points);
  
        row.appendChild(positionColumn);
        row.appendChild(nameColumn);
        row.appendChild(nationalityColumn);
        row.appendChild(sponsorColumn);
        row.appendChild(pointsColumn);
  
        const tableBody = document.getElementById("table-container");
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      showError("Please enter a valid Round");
    });
};
  
  function createColumn(label, value) {
    const column = document.createElement("td");
    column.textContent = value;
  
    return column;
  }
  
  const getBtn = document.getElementById('get-btn');

  
  getBtn.addEventListener('click', () => {
    var season = document.querySelector('#season').value;
    var round = document.querySelector('#round').value;

    // Clear existing table data
    const tableBody = document.getElementById("table-container");
    tableBody.innerHTML = "";

    // Check if the season and round inputs are valid
    if (!isValidSeason(season)) {
        showError("Invalid season. Please enter a valid year.");
        return;
    }

    if (!isValidRound(round)) {
        showError("Invalid round. Please enter a valid number.");
        return;
    }

    // Call the getData function
    return getData(season, round);
});

function isValidSeason(season) {
    // Validate if the season is a valid year (four digits)
    const regex = /^\d{4}$/;
    return regex.test(season);
}

function isValidRound(round) {
    // Validate if the round is a positive integer
    const regex = /^[1-9]\d*$/;
    return regex.test(round);
}

function showError(message) {
    // Create and show an error pop-up message
    alert(message);
}

