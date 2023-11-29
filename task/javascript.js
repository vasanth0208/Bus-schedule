fetch('https://apps.messagepoint.tv/extAPI/swiftly-cttransit/?stopId=8987')
    .then((data) => {
        return data.json();
    })
    .then((json) => {
        const routeDetail = json.stop.RouteDetail[1];

        console.log(routeDetail);

        let datatable = "";
        json.stop.RouteDetail.forEach((route) => {
            datatable += `<tr>
                <td>${route.RouteId}</td>
                <td>${route.LName}</td>
                <td>${route.HumanSDT}</td>
            </tr>`;
        });

        document.getElementById("table_body").innerHTML = datatable;
    })
    .catch((err) => console.log(err));
