
const search = document.getElementById('searchs');
const result = document.getElementById('result');
const imjenCard = document.getElementById('imajenes');

search.addEventListener('click', async function(event) {
	event.preventDefault();
	try {
		const data = await getPoke(result.value);
		octenerPoke(data);
	} catch (error) {
		octenerPoke(false);
		console.error(error);
	}
});

async function getPoke(buscar) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${buscar}`);
	const json = await response.json();
	if(typeof(json) === 'object' && json.is_default) {
		return json;
	}
	throw new Error('Invalid Pokemon object');
}

function octenerPoke(data) {
	if(data === false) {
		imjenCard.innerHTML = `<h3 class="text-danger">Pokemon no encontrado</h3>`;
	} else {
		imjenCard.innerHTML = `
			<div class="col-12 col-md-6">
				<div class="card">
					<div class="card-body">
						<div class="card-header bg-primary text-white">${data.name.toUpperCase()}</div>
						<img class="img-fluid" src="${data.sprites.other.dream_world.front_default}"/>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-6 ">
				<div class="card">
					<div class="card-body">
						<div class="card-header bg-primary text-white">Habilidades</div>
						<section class="range-slider-wrapper">
							<div class="range-slider-container">
								${data.stats.map(stat => `
									<div class="range-slider-block">
										<div class="range-slider-group">
											<h2 class="range-label">${stat.stat.name.toUpperCase()}</h2>
											<input type="range" min="0" max="100" value="${stat.base_stat}" data-color="#00fffd" class="range-slider"/>
											<input disabled type="number" min="0" max="100" value="${stat.base_stat}" class="input-slider"/>
										</div> 
							  	    </div>
								`).join('')}
							</div>
						</section>
					</div>
				</div>
			</div>`;
	}
}





const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

// Obtener los nombres y URLs de los primeros 151 Pokémon
fetch(apiUrl + "?limit=100")
  .then(response => response.json())
  .then(data => {
    // Crear una lista de promesas para obtener detalles de cada Pokémon
    const pokemonPromises = data.results.map(result => {
      return fetch(result.url).then(response => response.json());
    });
    
    // Esperar a que se completen todas las promesas
    Promise.all(pokemonPromises).then(pokemonDataArray => {
      // Crear un elemento contenedor para la galería
      const galleryContainer = document.createElement("div");

      // Iterar a través de los datos de cada Pokémon y agregar una imagen a la galería
      pokemonDataArray.forEach(pokemonData => {

		console.log(
			)

		const nombrePoke = pokemonData.name;
        const nombrePokes= document.createElement("span");
		nombrePokes.innerHTML=nombrePoke
		nombrePokes.classList.add("nombre_poke");




        const imageUrl = pokemonData.sprites.front_default;
        const image = document.createElement("img");
        image.src = imageUrl;
        
        const columnContainer = galleryContainer.lastElementChild || createColumn(galleryContainer);

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        imageContainer.appendChild(image);
        columnContainer.appendChild(imageContainer);
		imageContainer.appendChild(nombrePokes);
      });

      // Agregar el elemento contenedor de la galería al DOM
      const appContainer = document.getElementById("app");
      appContainer.appendChild(galleryContainer);
    });
  });

// Crear un elemento contenedor de columna
function createColumn(galleryContainer) {
  const columnContainer = document.createElement("div");
  columnContainer.classList.add("column-container");
  galleryContainer.appendChild(columnContainer);
  return columnContainer;
}
