
const Search = document.getElementById('searchs')

const result = document.getElementById('result')

const imjen_card = document.getElementById('imajenes')




//



Search.addEventListener('click' , function(event){
	event.preventDefault()

	get_poke(result.value);

	console.log(result.value)

})



function  get_poke(buscar){
	

	fetch(`https://pokeapi.co/api/v2/pokemon/${buscar}`)
    .then((response) => response.json())
    .catch(function(error) {
  		octener_poke(false)
		})
    .then((json) => {
    	if(typeof(json) == 'object'){
    		if(json.is_default)octener_poke(json)

    	}
    	
    	 
    });


}






const octener_poke =  data => {




	if(data == false){
		imjen_card.innerHTML = `<h3 class="text-danger">pokemon no encotrado</h3>`
	}else{

		

		
		function loadin(b){

			if(b == true){
				imjen_card.innerHTML = `<div class="spinner-border text-warning mt-3"  role="status">
  				<span class="visually-hidden"></span>
				</div>`
			}
			
		}

		loadin(true)

		setTimeout(function(){

			loadin(false)

			const {stats , types} = data;

			let datos_stats = []
			 stats.forEach(function(name){
			    datos_stats.push(name)
			  });



			

			
			 let title_hp = datos_stats[0].stat.name
			 let hp =datos_stats[0].base_stat

			  let title_atake = datos_stats[1].stat.name
			  let atake =datos_stats[1].base_stat

			  let title_defense = datos_stats[2].stat.name
			  let defense =datos_stats[2].base_stat


			  let title_special_attack = datos_stats[3].stat.name
			  let special_attack =datos_stats[3].base_stat

				
							
		
			const {back_default, back_shiny} = data.sprites;


			let nombre = data.name.toUpperCase()

				imjen_card.innerHTML = `

				

			<div class="col-12 col-md-6">
				

				<div class="card">
					<div class="card-body">
					<div class="card-header bg-primary text-white">${nombre}</div>
					<img class="img-fluid" src="${data.sprites.other.dream_world.front_default}"/>

					</div>
				</div>


			</div>  

				<div  class="col-12 col-md-6 ">

							<div class="card">

								<div class="card-body">
									<div class="card-header bg-primary text-white">Avilidades</div>

							

									<section class="range-slider-wrapper">
									<div class="range-slider-container">
									<div class="range-slider-block">
									<div id="range-sliders" class="range-sliders">
									<div class="range-slider-group range-slider-group-red">
										<h2 class="range-label range-label-red">${title_hp}</h2>
										<input  type="range" min="0" max="100" value="${hp}" data-color="#f00" class="range-slider range-slider-red" id="range-slider-red" />
										<input  type="number" min="0" max="100" value="${hp}" class="input-slider input-slider-red" id="input-slider-red" />
									</div>
									<div class="range-slider-group range-slider-group-green">
										<h2 class="range-label range-label-green">${title_atake}</h2>
										<input disabled type="range" min="0" max="100" value="${atake}" data-color="#090" class="range-slider range-slider-green" id="range-slider-green" />
										<input disabled type="number" min="0" max="100" value="${atake}" class="input-slider input-slider-green" id="input-slider-green" />
									</div>
									<div class="range-slider-group range-slider-group-blue">
										<h2 class="range-label range-label-blue">${title_defense}</h2>
										<input disabled type="range" min="0" max="100" value="121" data-color="#00f" class="range-slider range-slider-blue" id="range-slider-blue" />
										<input disabled type="number" min="0" max="100" value="${defense}" class="input-slider input-slider-blue" id="input-slider-blue" />
									</div>

									<div class="range-slider-group range-slider-group-blue">
										<h2 class="range-label range-label-blue">${title_special_attack}</h2>
										<input disabled type="range" min="0" max="100" value="${special_attack}" data-color="#00fffd" class="range-slider range-slider-blue" id="range-slider-blue" />
										<input disabled type="number" min="0" max="100" value="${special_attack}" class="input-slider input-slider-blue" id="input-slider-blue" />
									</div>
									</div>
									</div>
									</div>
								</section>

							



								</div>
							

							


							</div>
							
							


					</div> 




			
	
			    `



			},2000)



		

	}


   
	// nombre del pokemo 

	



}

