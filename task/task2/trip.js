document.addEventListener("DOMContentLoaded", function() {
    fetch('https://apps.messagepoint.tv/extAPI/swiftly-cttransit/?stopId=8987')
        .then(response => response.json())
        .then(data => displayTripInfo(data))
        .catch(error => showError());

    function displayTripInfo(data) {
        const tripInfoDiv = document.getElementById('tripInfo');

        if (data.stop && data.stop.RouteDetail) {
            data.stop.RouteDetail.forEach(route => {
                if (route.Trip && route.Trip.length > 0) {
                    const routeDiv = document.createElement('div');
                    routeDiv.innerHTML = `<h2>${route.LName} - ${route.Direction}</h2>`;

                    const table = document.createElement('table');
                    const headerRow = table.insertRow(0);
                    headerRow.innerHTML = '<th>Trip ID</th><th>Scheduled Departure Time</th>';

                    route.Trip.forEach(trip => {
                        const row = table.insertRow();
                        row.innerHTML = `<td>${trip.TripId}</td><td>${trip.HumanSDT}</td>`;
                    });

                    routeDiv.appendChild(table);
                    tripInfoDiv.appendChild(routeDiv);
                }
            });
        } else {
            tripInfoDiv.innerHTML = 'No trip information available.';
        }
    }

    function showError() {
        document.getElementById('tripInfo').innerHTML = 'Error fetching data.';
    }
});
