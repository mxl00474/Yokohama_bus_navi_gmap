function initMap() {

    let bus_info;

    fetch("/bus_monitor/data")
        .then(response => response.json())
        .then(bus_info => {

            let origin = { lat: 35.46591430126525, lng: 139.62125644093177 };
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 12,
                center: origin,
            });

            let markers = {}

            Object.keys(bus_info).forEach(function (value) {
                console.log(value + '：' + this[value].lat);

                let latlng = { lat: this[value].lat, lng: this[value].lng }
                let rot = bus_info[value].azimuth
                
                const titleString = 'ルート:' + bus_info[value].route_name + '\n'
                                  + '前のバス停：' + bus_info[value].pole_name_x + '\n'
                                  + '次のバス停：' + bus_info[value].pole_name_y + '\n'
                                  + '混雑度：' + bus_info[value].occupancy

                markers[value] = new google.maps.Marker({
                    position: latlng,
                    map,
                    icon: getIcon(google.maps.SymbolPath.FORWARD_CLOSED_ARROW,rot),
                    label: this[value].route_num,
                    title: titleString
                });
            }, bus_info)

            updateLocation(markers);
        })
}

function updateLocation(markers) {

    window.setInterval(() => {
        fetch("/bus_monitor/data")
            .then(response => response.json())
            .then(bus_info => {

                Object.keys(bus_info).forEach(function (value) {

                    let latlng = { lat: this[value].lat, lng: this[value].lng }
                    let rot = bus_info[value].azimuth

                    const titleString = 'ルート:' + bus_info[value].route_name + '\n'
                    + '前のバス停：' + bus_info[value].pole_name_x + '\n'
                    + '次のバス停：' + bus_info[value].pole_name_y + '\n'
                    + '混雑度：' + bus_info[value].occupancy

                    if (value in markers) {
                        markers[value].setPosition(latlng)
                        markers[value].setIcon(getIcon(google.maps.SymbolPath.FORWARD_CLOSED_ARROW,rot))
                        markers[value].setTitle(titleString)
                    } else {
                        markers[value] = new google.maps.Marker({
                            position: latlng,
                            map,
                            icon: getIcon(google.maps.SymbolPath.FORWARD_CLOSED_ARROW,rot),
                            label: this[value].route_num,
                            title: titleString
                        });
                    }
                }, bus_info)

                Object.keys(markers).forEach(function (value) {
                    if (!value in bus_info) {
                        console.log(value + " removed.")
                        markers[value].setMap(null)
                        delete markers[value]
                    }
                }, bus_info)
            });
    }, 30000);
}

// 角度を指定してシンボルマーカーを取得
var getIcon = function (icon, angle) {
    return {
        path: icon,
        scale: 5,
        rotation: angle,
        fillColor: '#ff0000',
        fillOpacity: 0.7,
        strokeColor: '#ff0000',
        strokeWeight: 2
    };
};