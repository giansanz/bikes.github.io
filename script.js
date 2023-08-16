const xmlData = `
<?xml version="1.0" encoding="UTF-8"?>
<root>
    <motorcycles>
        <motorcycle1>
            <accelerationTime>3.53 sec 0...60mph</accelerationTime>
            <bodyType>Sport</bodyType>
            <fuelCapacity>4.0 gal</fuelCapacity>
            <name>Ninja 650</name>
            <speed>Max 131mph</speed>
            <vehicleEngine>649cc parallel twin</vehicleEngine>
            <manufacturer>Kawasaki</manufacturer>
            <weightTotal>419 lbs</weightTotal>
            <image>ninja 650.jpg</image>
        </motorcycle1>
        <motorcycle2>
            <accelerationTime>5.8 sec 0...100mph</accelerationTime>
            <bodyType>Hyper Sport</bodyType>
            <fuelCapacity>4.5 gal</fuelCapacity>
            <name>Ninja H2</name>
            <speed>Max 202mph</speed>
            <vehicleEngine>998cc Supercharged Inline 4</vehicleEngine>
            <manufacturer>Kawasaki</manufacturer>
            <weightTotal>524 lbs</weightTotal>
            <image>ninja h2.jpg</image>
        </motorcycle2>
        <motorcycle3>
            <accelerationTime>5.1 sec 0...60mph</accelerationTime>
            <bodyType>Sport</bodyType>
            <fuelCapacity>3.7 gal</fuelCapacity>
            <name>R3</name>
            <speed>Max 112mph</speed>
            <vehicleEngine>321cc inline twin</vehicleEngine>
            <manufacturer>Yamaha</manufacturer>
            <weightTotal>375 lbs</weightTotal>
            <image>r3.jpg</image>
        </motorcycle3>
        <motorcycle4>
        <accelerationTime>5.4 sec 0…100mph</accelerationTime>
        <bodyType>Super Sport</bodyType>
        <fuelCapacity>4.5 gal</fuelCapacity>
        <name>Ninja ZX-10R ABS</name>
        <speed>Max 190mph</speed>
        <vehicleEngine>998cc inline 4</vehicleEngine>
        <manufacturer>Kawasaki</manufacturer>
        <weightTotal>452lbs</weightTotal>
        <image>ninja zx-10r abs.jpg</image>
    </motorcycle4>
    <motorcycle5>
        <accelerationTime>5.27 sec 0…100mph</accelerationTime>
        <bodyType>Supersport</bodyType>
        <fuelCapacity>4.4 gal</fuelCapacity>
        <name>S1000RR</name>
        <speed>Max 190mph</speed>
        <vehicleEngine>999cc inline 4</vehicleEngine>
        <manufacturer>BMW</manufacturer>
        <weightTotal>434lbs</weightTotal>
        <image>s1000rr.jpg</image>
    </motorcycle5>
    <motorcycle6>
        <accelerationTime>6.36 sec 0…60</accelerationTime>
        <bodyType>Sport</bodyType>
        <fuelCapacity>3.4 gal</fuelCapacity>
        <name>CBR 300R</name>
        <speed>Max 98mph</speed>
        <vehicleEngine>286cc single cylinder</vehicleEngine>
        <manufacturer>Honda</manufacturer>
        <weightTotal>357lbs</weightTotal>
        <image>cbr 300r.jpg</image>
    </motorcycle6>
    <motorcycle7>
        <accelerationTime>3.8 sec 0…60</accelerationTime>
        <bodyType>Sport</bodyType>
        <fuelCapacity>5.3 gal</fuelCapacity>
        <name>Vstrom650</name>
        <speed>Max 125mph</speed>
        <vehicleEngine>645cc V-twin</vehicleEngine>
        <manufacturer>Suzuki</manufacturer>
        <weightTotal>476lbs</weightTotal>
        <image>vstrom650.jpg</image>
    </motorcycle7>
    <motorcycle8>
        <accelerationTime>4.86 sec 0…60</accelerationTime>
        <bodyType>Touring</bodyType>
        <fuelCapacity>6 gal</fuelCapacity>
        <name>Road Glide</name>
        <speed>Max 105mph</speed>
        <vehicleEngine>1746cc V-twin</vehicleEngine>
        <manufacturer>Harley Davidson</manufacturer>
        <weightTotal>820</weightTotal>
        <image>road glide.jpg</image>
    </motorcycle8>
    <motorcycle9>
        <accelerationTime>9.4 sec 0…60mph</accelerationTime>
        <bodyType>Cruiser</bodyType>
        <fuelCapacity>3.46 gal</fuelCapacity>
        <name>Street 500</name>
        <speed>Max 80mph</speed>
        <vehicleEngine>494cc V-twin</vehicleEngine>
        <manufacturer>Harley Davidson</manufacturer>
        <weightTotal>492lbs</weightTotal>
        <image>street 500.jpg</image>
    </motorcycle9>
    <motorcycle10>
        <accelerationTime>7.3 sec 0…60mph</accelerationTime>
        <bodyType>Chopper</bodyType>
        <fuelCapacity>3.4 gal</fuelCapacity>
        <name>Fury</name>
        <speed>103mph</speed>
        <vehicleEngine>1312cc V-twin</vehicleEngine>
        <manufacturer>Honda</manufacturer>
        <weightTotal>663lbs</weightTotal>
        <image>fury.jpg</image>
    </motorcycle10>
    </motorcycles>
    <brands>
    <brand>
        <name>BMW</name>
        <image>bmw.jpg</image>
    </brand>
    <brand>
        <name>Harley Davidson</name>
        <image>harley davidson.jpg</image>
    </brand>
    <brand>
        <name>Honda</name>
        <image>honda.jpg</image>
    </brand>
    <brand>
        <name>Kawasaki</name>
        <image>kawasaki.jpg</image>
    </brand>
    <brand>
        <name>Suzuki</name>
        <image>suzuki.jpg</image>
    </brand>
    <brand>
        <name>Yamaha</name>
        <image>yamaha.jpg</image>
    </brand>
</root>
`.trim();

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlData, "text/xml");

function filterMotorcyclesBySearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    const motorcyclesElement = xmlDoc.getElementsByTagName('motorcycles')[0];
    if (!motorcyclesElement) {
        console.error("The 'motorcycles' element is not found in the XML data.");
        return;
    }
    const motorcycles = motorcyclesElement.children;

    for (let i = 0; i < motorcycles.length; i++) {
        const motorcycle = motorcycles[i];
        const manufacturer = motorcycle.getElementsByTagName('manufacturer')[0].textContent.toLowerCase();
        const bodyType = motorcycle.getElementsByTagName('bodyType')[0].textContent.toLowerCase();
        const name = motorcycle.getElementsByTagName('name')[0].textContent.toLowerCase();

        if (manufacturer.includes(searchTerm) || bodyType.includes(searchTerm) || name.includes(searchTerm)) {
            displayMotorcycle(motorcycle, resultsDiv);
        }
    }

    if (!resultsDiv.innerHTML) {
        resultsDiv.innerHTML = '<p>No motorcycles found based on the search term.</p>';
    }
}

function filterByBike(bikeName) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    const motorcyclesElement = xmlDoc.getElementsByTagName('motorcycles')[0];
    if (!motorcyclesElement) {
        console.error("The 'motorcycles' element is not found in the XML data.");
        return;
    }
    const motorcycles = motorcyclesElement.children;

    for (let i = 0; i < motorcycles.length; i++) {
        const motorcycle = motorcycles[i];
        const name = motorcycle.getElementsByTagName('name')[0].textContent.toLowerCase();

        // If the bike name matches the clicked bike name, display the motorcycle
        if (name === bikeName.toLowerCase()) {
            const manufacturer = motorcycle.getElementsByTagName('manufacturer')[0].textContent;
            const bodyType = motorcycle.getElementsByTagName('bodyType')[0].textContent;
            const speed = motorcycle.getElementsByTagName('speed')[0].textContent;
            const accelerationTime = motorcycle.getElementsByTagName('accelerationTime')[0].textContent;
            const fuelCapacity = motorcycle.getElementsByTagName('fuelCapacity')[0].textContent;
            const vehicleEngine = motorcycle.getElementsByTagName('vehicleEngine')[0].textContent;
            const weightTotal = motorcycle.getElementsByTagName('weightTotal')[0].textContent;
            const image = motorcycle.getElementsByTagName('image')[0].textContent;

            resultsDiv.innerHTML += `
                <div class="motorcycle">
                    <img src="Images/${image}" alt="${name} image">
                    <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                    <p><strong>Manufacturer:</strong> ${manufacturer}</p>
                    <p><strong>Body Type:</strong> ${bodyType}</p>
                    <p><strong>Speed:</strong> ${speed}</p>
                    <p><strong>Acceleration:</strong> ${accelerationTime}</p>
                    <p><strong>Fuel Capacity:</strong> ${fuelCapacity}</p>
                    <p><strong>Engine:</strong> ${vehicleEngine}</p>
                    <p><strong>Weight:</strong> ${weightTotal}</p>
                </div>
            `;
        }
    }

    // Display a message if no results are found
    if (!resultsDiv.innerHTML) {
        resultsDiv.innerHTML = '<p>No motorcycles found based on the selection.</p>';
    }
}

// Add the event listener for the form
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from actually submitting and refreshing the page
    filterMotorcycles();   // Call the search function
});

function displayMotorcycle(motorcycle, resultsDiv) {
    const name = motorcycle.getElementsByTagName('name')[0].textContent;
    const manufacturer = motorcycle.getElementsByTagName('manufacturer')[0].textContent;
    const bodyType = motorcycle.getElementsByTagName('bodyType')[0].textContent;
    const speed = motorcycle.getElementsByTagName('speed')[0].textContent;
    const accelerationTime = motorcycle.getElementsByTagName('accelerationTime')[0].textContent;
    const fuelCapacity = motorcycle.getElementsByTagName('fuelCapacity')[0].textContent;
    const vehicleEngine = motorcycle.getElementsByTagName('vehicleEngine')[0].textContent;
    const weightTotal = motorcycle.getElementsByTagName('weightTotal')[0].textContent;
    const image = motorcycle.getElementsByTagName('image')[0].textContent;

    resultsDiv.innerHTML += `
        <div class="motorcycle">
            <img src="Images/${image}" alt="${name} image">
            <h3>${name}</h3>
            <p><strong>Manufacturer:</strong> ${manufacturer}</p>
            <p><strong>Body Type:</strong> ${bodyType}</p>
            <p><strong>Speed:</strong> ${speed}</p>
            <p><strong>Acceleration:</strong> ${accelerationTime}</p>
            <p><strong>Fuel Capacity:</strong> ${fuelCapacity}</p>
            <p><strong>Engine:</strong> ${vehicleEngine}</p>
            <p><strong>Weight:</strong> ${weightTotal}</p>
        </div>
    `;
}

// Add the event listener for the search form
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from actually submitting and refreshing the page
    filterMotorcyclesBySearch();   // Call the search function
});
document.addEventListener("DOMContentLoaded", function() {
    // make it as accordion for smaller screens
    if (window.innerWidth < 992) {
        // close all inner dropdowns when parent is closed
        document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown) {
            everydropdown.addEventListener('hidden.bs.dropdown', function() {
                // after dropdown is hidden, then find all submenus
                this.querySelectorAll('.submenu').forEach(function(everysubmenu) {
                    // hide every submenu as well
                    everysubmenu.style.display = 'none';
                });
            });
        });

        document.querySelectorAll('.dropdown-menu a').forEach(function(element) {
            element.addEventListener('click', function(e) {
                let nextEl = this.nextElementSibling;
                if (nextEl && nextEl.classList.contains('submenu')) {
                    // prevent opening link if link needs to open dropdown
                    e.preventDefault();
                    if (nextEl.style.display == 'block') {
                        nextEl.style.display = 'none';
                    } else {
                        nextEl.style.display = 'block';
                    }
                }
            });
        });
    }
});
