const xmlData = `
<?xml version="1.0" encoding="UTF-8"?>
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
</motorcycle10>
</motorcycles>
`.trim();

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlData, "text/xml");

function filterMotorcycles() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (!searchTerm) {
        return; // Exit the function if the search term is empty
    }


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

        // If the search term is empty or matches any of the attributes, display the motorcycle
        if (!searchTerm || manufacturer.includes(searchTerm) || bodyType.includes(searchTerm) || name.includes(searchTerm)) {
            const speed = motorcycle.getElementsByTagName('speed')[0].textContent;
            const accelerationTime = motorcycle.getElementsByTagName('accelerationTime')[0].textContent;
            const fuelCapacity = motorcycle.getElementsByTagName('fuelCapacity')[0].textContent;
            const vehicleEngine = motorcycle.getElementsByTagName('vehicleEngine')[0].textContent;
            const weightTotal = motorcycle.getElementsByTagName('weightTotal')[0].textContent;

            resultsDiv.innerHTML += `
                <div class="motorcycle">
                <img src="path_to_default_image.jpg" alt="${name} image"> <!-- Placeholder for image -->
                    <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                    <p><strong>Manufacturer:</strong> ${manufacturer.charAt(0).toUpperCase() + manufacturer.slice(1)}</p>
                    <p><strong>Body Type:</strong> ${bodyType.charAt(0).toUpperCase() + bodyType.slice(1)}</p>
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
        resultsDiv.innerHTML = '<p>No motorcycles found based on the search term.</p>';
    }
}

// Call the function initially to display all motorcycles
filterMotorcycles();
