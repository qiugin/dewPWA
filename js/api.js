
const base_url = 'https://api.football-data.org/v2/'
const api_token = 'eb5b58e773eb400385da4dcfae7864b9'

let status = res => {
		if(res.status != 200){
				console.log(`Error : ${res.status}`)
				return Promise.reject(new Error(res.statusText()))
		}else{
				return Promise.resolve(res)
		}
}


const getJadwal = leagueID => {
		if('caches' in window){
				caches.match(`${base_url}competitions/${leagueID}/matches?status=SCHEDULED`)
				.then(res => {
						if(res){
								res.json()
								.then(data => {
									var klassemenHTML = '';
									var klassemCardContent ='';
							
									klassemCardContent =`
										 <span class="card-title">${data.competition.name} ${data.competition.area.name}</span>
									`;
									data.matches.slice(0, 10).forEach(data => {
										klassemenHTML += `
										<div class="col s12 m6 l6">
											<div class="card">
											<div class="card-content">
											<div center-align>
													<h5 class="center-align">Matchday: ${data.matchday}</h5>
													<div class="center-align">Kick Off: ${new Date(
														data.utcDate
													).toLocaleString("en-id", {
														day: "2-digit",
														month: "long",
														year: "numeric",
														hour: "2-digit",
														minute: "2-digit"
													})}</div>
									
												<div class="row" style="margin:20px">
													<div class="col s5 truncate right-align">
													<span class="blue-text text-darken-2">  ${
														data.homeTeam.name
													}</span>
													</div>
													<div class="col s2 ">
														VS
													</div>
													<div class="col s5 truncate left-align">
							
													<span class="blue-text text-darken-2">  ${
														data.awayTeam.name
													}</span>
													</div>
												</div>
											</div>
											</div>
											</div>
										</div>
												`;
									});
									document.getElementById('loader2').style.display = 'none'
									document.getElementById("klassemen").innerHTML = klassemenHTML;
									// document.getElementsByClassName('preloader').style.display = 'none'
									document.getElementById("klassemenCard").innerHTML = klassemCardContent;
								})
								.catch(err => console.log(err))
						}
				})
				 
		}
		
		fetch(`${base_url}competitions/${leagueID}/matches?status=SCHEDULED`,{
				headers:{
						'X-Auth-Token' : api_token
				}
		})
		.then(status)
		.then(res => res.json())
		.then(data => {
			var klassemenHTML = '';
			var klassemCardContent ='';
	
			klassemCardContent =`
				 <span class="card-title">${data.competition.name}${data.matches[0].matchday}</span>
			`;
			data.matches.slice(0, 10).forEach(data => {
				klassemenHTML += `
				<div class="col s12 m6 l6">
					<div class="card">
					<div class="card-content">
					<div center-align>
							<h5 class="center-align">Matchday: ${data.matchday}</h5>
							<div class="center-align">Kick Off: ${new Date(
								data.utcDate
							).toLocaleString("en-id", {
								day: "2-digit",
								month: "long",
								year: "numeric",
								hour: "2-digit",
								minute: "2-digit"
							})}</div>
			
						<div class="row" style="margin:20px">
							<div class="col s5 truncate right-align">
							<span class="blue-text text-darken-2">  ${
								data.homeTeam.name
							}</span>
							</div>
							<div class="col s2 ">
								VS
							</div>
							<div class="col s5 truncate left-align">
	
							<span class="blue-text text-darken-2">  ${
								data.awayTeam.name
							}</span>
							</div>
						</div>
					</div>
					</div>
					</div>
				</div>
						`;
			});
			document.getElementById('loader2').style.display = 'none'
			document.getElementById("klassemen").innerHTML = klassemenHTML;
			// document.getElementsByClassName('preloader').style.display = 'none'

			document.getElementById("klassemenCard").innerHTML = klassemCardContent;
		})
		.catch(err => console.log(err))
}

const getSpanyol = leagueID => {
		if('caches' in window){
				caches.match(`${base_url}competitions/${leagueID}/standings`)
				.then(res => {
						if(res){
								res.json()
								.then(data => {
										let standingsHTML = '';
										var klassemCardContent ='';
										klassemCardContent =`
										<span class="card-title"><h4>${data.competition.name} ${data.competition.area.name}</h4></span>`;
										
										data = data.standings[0].table

										data.forEach(team => {
												let urlTeamImage = team.team.crestUrl
												urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')


												standingsHTML +=
												`<tr>
														<td>${team.position}</td>
														<td>
															<a href="./tim.html?tim=${team.team.id}">
															<p class="hide-on-small-only">
																<img class="responsive-img" width="20" height="20" src="${ team.team.crestUrl || '/images/no-image.png'}">${team.team.name}
															</p>
															</a>
															<a href="./tim.html?tim=${team.team.id}">
																<p class="hide-on-med-and-up">
																<img class="responsive-img" width="20" height="20" src="${ team.team.crestUrl || '/images/no-image.png'}">
															</p>
															</a>
														</td>
														<td>${team.playedGames}</td>
														<td>${team.won}</td>
														<td>${team.draw}</td>
														<td>${team.lost}</td>
														<td><b>${team.points}</b></td>

													</tr>
											`;
										})
										document.getElementById("klassemenCard_v1").innerHTML = klassemCardContent;
										document.getElementById('klassemen_v1').innerHTML = standingsHTML
										document.getElementById('loader2').style.display = 'none';
								})
								.catch(err => console.log(err))
						}
				})
				 
		}
		
		fetch(`${base_url}competitions/${leagueID}/standings`,{
				headers:{
						'X-Auth-Token' : api_token
				}
		})
		.then(status)
		.then(res => res.json())
		.then(data => {
				let standingsHTML = '';
				var klassemCardContent ='';
				klassemCardContent =`
				<span class="card-title">${data.competition.name} ${data.competition.area.name}</span>`;

				data = data.standings[0].table
				data.forEach(team => {
						let urlTeamImage = team.team.crestUrl
						urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
						standingsHTML +=
						`<tr>
														<td>${team.position}</td>
														<td>
															<a href="./tim.html?tim=${team.team.id}">
															<p class="hide-on-small-only">
																<img class="responsive-img" width="20" height="20" src="${ team.team.crestUrl || '/images/no-image.png'}">${team.team.name}
															</p>
															</a>
															<a href="./tim.html?tim=${team.team.id}">
																<p class="hide-on-med-and-up">
																<img class="responsive-img" width="20" height="20" src="${ team.team.crestUrl || '/images/no-image.png'}">
															</p>
															</a>
														</td>
														<td>${team.playedGames}</td>
														<td>${team.won}</td>
														<td>${team.draw}</td>
														<td>${team.lost}</td>
														<td><b>${team.points}</b></td>

													</tr>
											`;
				})
				// document.getElementsByClassName('lds-ripple').style.display = 'none';
				
				
				document.getElementById("klassemenCard_v1").innerHTML = klassemCardContent;
				document.getElementById('klassemen_v1').innerHTML = standingsHTML
				document.getElementById('loader2').style.display = 'none'
		})
		.catch(err => console.log(err))
}
const getItalia = leagueID => {
		if('caches' in window){
				caches.match(`${base_url}competitions/${leagueID}/standings`)
				.then(res => {
						if(res){
								res.json()
								.then(data => {
										let standingsHTML = '';
										var klassemCardContent ='';
										klassemCardContent =`
										<span class="card-title"><h4>${data.competition.name} ${data.competition.area.name}</h4></span>`;
										
										data = data.standings[0].table

										data.forEach(team => {
												let urlTeamImage = team.team.crestUrl
												urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')


												standingsHTML +=
												`<tr>
														<td>${team.position}</td>
														<td>
															<a href="./tim.html?tim=${team.team.id}">
															<p class="hide-on-small-only">
																<img class="responsive-img" width="20" height="20" src="${ team.team.crestUrl || '/images/no-image.png'}">${team.team.name}
															</p>
															</a>
															<a href="./tim.html?tim=${team.team.id}">
																<p class="hide-on-med-and-up">
																<img class="responsive-img" width="20" height="20" src="${ team.team.crestUrl || '/images/no-image.png'}">
															</p>
															</a>
														</td>
														<td>${team.playedGames}</td>
														<td>${team.won}</td>
														<td>${team.draw}</td>
														<td>${team.lost}</td>
														<td><b>${team.points}</b></td>

													</tr>
											`;
										})
										document.getElementById('loader2').style.display = 'none';
										document.getElementById("klassemenCard_v2").innerHTML = klassemCardContent;
										document.getElementById('klassemen_v2').innerHTML = standingsHTML
								})
								.catch(err => console.log(err))
						}
				})
				 
		}
		
		fetch(`${base_url}competitions/${leagueID}/standings`,{
				headers:{
						'X-Auth-Token' : api_token
				}
		})
		.then(status)
		.then(res => res.json())
		.then(data => {
				let standingsHTML = '';
				var klassemCardContent ='';
				klassemCardContent =`
				<span class="card-title">${data.competition.name} ${data.competition.area.name}</span>`;

				data = data.standings[0].table
				data.forEach(team => {
						let urlTeamImage = team.team.crestUrl
						urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
						standingsHTML +=
						`<tr>
														<td>${team.position}</td>
														<td>
															<a href="./tim.html?tim=${team.team.id}">
															<p class="hide-on-small-only">
																<img class="responsive-img" width="20" height="20" src="${ team.team.crestUrl || '/images/no-image.png'}">${team.team.name}
															</p>
															</a>
															<a href="./tim.html?tim=${team.team.id}">
																<p class="hide-on-med-and-up">
																<img class="responsive-img" width="20" height="20" src="${ team.team.crestUrl || '/images/no-image.png'}">
															</p>
															</a>
														</td>
														<td>${team.playedGames}</td>
														<td>${team.won}</td>
														<td>${team.draw}</td>
														<td>${team.lost}</td>
														<td><b>${team.points}</b></td>

													</tr>
											`;
				})
				document.getElementById('loader2').style.display = 'none';
				document.getElementById("klassemenCard_v2").innerHTML = klassemCardContent;
				document.getElementById('klassemen_v2').innerHTML = standingsHTML
		})
		.catch(err => console.log(err))
}
const getIggris = leagueID => {
		if('caches' in window){
				caches.match(`${base_url}competitions/${leagueID}/standings`)
				.then(res => {
						if(res){
								res.json()
								.then(data => {
										let standingsHTML = '';
										var klassemCardContent ='';
										klassemCardContent =`
										<span class="card-title"><h4>${data.competition.name} ${data.competition.area.name}</h4></span>`;
										
										data = data.standings[0].table

										data.forEach(team => {
												let urlTeamImage = team.team.crestUrl
												urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')


												standingsHTML +=
												`<tr>
														<td>${team.position}</td>
														<td>
															<a href="./tim.html?tim=${team.team.id}">
															<p class="hide-on-small-only">
																<img class="responsive-img" width="20" height="20" src="${ team.team.crestUrl || '/images/no-image.png'}">${team.team.name}
															</p>
															</a>
															<a href="./tim.html?tim=${team.team.id}">
																<p class="hide-on-med-and-up">
																<img class="responsive-img" width="20" height="20" src="${ team.team.crestUrl || '/images/no-image.png'}">
															</p>
															</a>
														</td>
														<td>${team.playedGames}</td>
														<td>${team.won}</td>
														<td>${team.draw}</td>
														<td>${team.lost}</td>
														<td><b>${team.points}</b></td>

													</tr>
											`;
										})
										document.getElementById("klassemenCard_v3").innerHTML = klassemCardContent;
										document.getElementById('klassemen_v3').innerHTML = standingsHTML
								})
								.catch(err => console.log(err))
						}
				})
				 
		}
		
		fetch(`${base_url}competitions/${leagueID}/standings`,{
				headers:{
						'X-Auth-Token' : api_token
				}
		})
		.then(status)
		.then(res => res.json())
		.then(data => {
				let standingsHTML = '';
				var klassemCardContent ='';
				klassemCardContent =`
				<span class="card-title">${data.competition.name} ${data.competition.area.name}</span>`;

				data = data.standings[0].table
				data.forEach(team => {
						let urlTeamImage = team.team.crestUrl
						urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
						standingsHTML +=
						`<tr>
														<td>${team.position}</td>
														<td>
															<a href="./tim.html?tim=${team.team.id}">
															<p class="hide-on-small-only">
																<img class="responsive-img" width="20" height="20" src="${ team.team.crestUrl || '/images/no-image.png'}">${team.team.name}
															</p>
															</a>
															<a href="./tim.html?tim=${team.team.id}">
																<p class="hide-on-med-and-up">
																<img class="responsive-img" width="20" height="20" src="${ team.team.crestUrl || '/images/no-image.png'}">
															</p>
															</a>
														</td>
														<td>${team.playedGames}</td>
														<td>${team.won}</td>
														<td>${team.draw}</td>
														<td>${team.lost}</td>
														<td><b>${team.points}</b></td>

													</tr>
											`;
				})
				document.getElementById("klassemenCard_v3").innerHTML = klassemCardContent;
				document.getElementById('klassemen_v3').innerHTML = standingsHTML
		})
		.catch(err => console.log(err))
}

const getTopInggris = leagueID => {
		if('caches' in window){
				caches.match(`${base_url}competitions/${leagueID}/scorers`)
				.then(res => {
						if(res){
								res.json()
								.then(data => {
										let topHTML = '';
										var klassemCardContent ='';
										klassemCardContent =`<span class="card-title"><h4>Top Skor ${data.competition.name} ${data.competition.area.name}</h4></span>`;
										
										data = data.scorers

										data.forEach(team => {

												topHTML +=
												`<tr>
													<td>`+team.player.firstName+`</td>
													<td>`+team.team.name+`</td>
													<td>`+team.numberOfGoals+`</td>
													<td>`+team.player.nationality+`</td>
												</tr>
											`;
										})
										document.getElementById('loader2').style.display = 'none';
										document.getElementById("klassemenCard_v1").innerHTML = klassemCardContent;
										document.getElementById('topskor_v1').innerHTML = topHTML
								})
								.catch(err => console.log(err))
						}
				})
				 
		}
		
		fetch(`${base_url}competitions/${leagueID}/scorers`,{
				headers:{
						'X-Auth-Token' : api_token
				}
		})
		.then(status)
		.then(res => res.json())
		.then(data => {
				let topHTML = '';
				var klassemCardContent ='';
				klassemCardContent =`<span class="card-title"><h4>Top Skor ${data.competition.name} ${data.competition.area.name}</h4></span>`;

				data = data.scorers
				data.forEach(team => {
						topHTML +=
						`<tr>
							<td>`+team.player.firstName+`</td>
							<td>`+team.team.name+`</td>
							<td>`+team.numberOfGoals+`</td>
							<td>`+team.player.nationality+`</td>
						</tr>
					`;
				})
				document.getElementById('loader2').style.display = 'none';
				document.getElementById("klassemenCard_v1").innerHTML = klassemCardContent;
				document.getElementById('topskor_v1').innerHTML = topHTML
		})
		.catch(err => console.log(err))
}
const getTopItalia = leagueID => {
		if('caches' in window){
				caches.match(`${base_url}competitions/${leagueID}/scorers`)
				.then(res => {
						if(res){
								res.json()
								.then(data => {
										let topHTML = '';
										var klassemCardContent ='';
										klassemCardContent =`<span class="card-title"><h4>Top Skor ${data.competition.name} ${data.competition.area.name}</h4></span>`;
										
										data = data.scorers

										data.forEach(team => {

												topHTML +=
												`<tr>
													<td>`+team.player.firstName+`</td>
													<td>`+team.team.name+`</td>
													<td>`+team.numberOfGoals+`</td>
													<td>`+team.player.nationality+`</td>
												</tr>
											`;
										})
										document.getElementById("klassemenCard_v2").innerHTML = klassemCardContent;
										document.getElementById('topskor_v2').innerHTML = topHTML
								})
								.catch(err => console.log(err))
						}
				})
				 
		}
		
		fetch(`${base_url}competitions/${leagueID}/scorers`,{
				headers:{
						'X-Auth-Token' : api_token
				}
		})
		.then(status)
		.then(res => res.json())
		.then(data => {
				let topHTML = '';
				var klassemCardContent ='';
				klassemCardContent =`<span class="card-title"><h4>Top Skor ${data.competition.name} ${data.competition.area.name}</h4></span>`;

				data = data.scorers
				data.forEach(team => {
						topHTML +=
						`<tr>
							<td>`+team.player.firstName+`</td>
							<td>`+team.team.name+`</td>
							<td>`+team.numberOfGoals+`</td>
							<td>`+team.player.nationality+`</td>
						</tr>
					`;
				})
				document.getElementById("klassemenCard_v2").innerHTML = klassemCardContent;
				document.getElementById('topskor_v2').innerHTML = topHTML
		})
		.catch(err => console.log(err))
}

const getTeams = leagueID => {
	if('caches' in window){
				caches.match(`${base_url}competitions/${leagueID}/teams`)
				.then(res => {
						if(res){
								res.json()
								.then(data => {
										let teamsHTML = '';
										var klassemCardContent ='';
										klassemCardContent =`
										<span class="card-title"><h4>${data.competition.name} ${data.competition.area.name}</h4></span>`;
										
										data = data.teams
										data.forEach(team => {
												let urlTeamImage = team.crestUrl
												urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
												teamsHTML  +=
												`

												<div class="col s12">
													<div class="card horizontal">
														<div class="card-image">
															<img src="${urlTeamImage}" alt="${team.name}">
														</div>
														<div class="card-stacked">
														<div class="card-content">
															<h4>${team.name}</h4>
															<p><b>Stadion</b> : ${team.venue}</p>
															<p><b>Alamat</b> : ${team.address}</p>
															<p><b>Berdiri</b> : ${team.founded}</p>
															<p><b>Phone</b> : ${team.phone}</p>
															<p><b>Email</b> : ${team.email}</p>
															<p><b>Website</b> :<a href="${team.website}" target="_blank">${team.website}</a></p>
														</div>
															<div class="card-action">
																<button onclick="savFav(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.address}','${team.founded}','${team.phone}','${team.email}','${team.website}')" class="waves-effect waves-light btn blue accent-3">Simpan</button>
															</div>
														</div>
													</div>
												</div>


												
												`
										})
										document.getElementById("klassemenCard_v2").innerHTML = klassemCardContent;
										document.getElementById('loader2').style.display = 'none'
										document.getElementById('teams').innerHTML = teamsHTML
								})
						}
				})
				
		}
		fetch(`${base_url}competitions/${leagueID}/teams`,{
				headers : {
						'X-Auth-Token' : api_token
				}
		})
		.then(status)
		.then(res => res.json())
		.then(data => {
				let teamsHTML = '';
				var klassemCardContent ='';
				klassemCardContent =`<span class="card-title"><h4>${data.competition.name} ${data.competition.area.name}</h4></span>`;
				data = data.teams
				data.forEach(team => {
						let urlTeamImage = team.crestUrl
						urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
						teamsHTML  +=
						`
						<div class="col s12">
							<div class="card horizontal">
								<div class="card-image">
									<img src="${urlTeamImage}" alt="${team.name}">
								</div>
								<div class="card-stacked">
								<div class="card-content">
									<h4>${team.name}</h4>
									<p><b>Stadion</b> : ${team.venue}</p>
									<p><b>Alamat</b> : ${team.address}</p>
									<p><b>Berdiri</b> : ${team.founded}</p>
									<p><b>Phone</b> : ${team.phone}</p>
									<p><b>Email</b> : ${team.email}</p>
									<p><b>Website</b> :<a href="${team.website}" target="_blank">${team.website}</a></p>

								</div>
									<div class="card-action">
										<button onclick="savFav(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.address}','${team.founded}','${team.phone}','${team.email}','${team.website}')" class="waves-effect waves-light btn blue accent-3">Simpan</button>
									</div>
								</div>
							</div>
						</div>
						`
				})
				document.getElementById("klassemenCard_v2").innerHTML = klassemCardContent;

				document.getElementById('loader2').style.display = 'none'
				document.getElementById('teams').innerHTML = teamsHTML
		})
		.catch(err => console.log(err))
}

const getTeamFav = () => {
	//Get All Bookmark Team From Database
	getTeam()
	.then(data => {
			let teamsHTML = ''
			data.forEach(team => {
					teamsHTML  +=
					`

					<div class="col s12">
						<div class="card horizontal">
							<div class="card-image">
								<img src="${team.logo}" alt="${team.name}">
							</div>
							<div class="card-stacked">
							<div class="card-content">
								<h4>${team.name}</h4>
								<p><b>Stadion</b> : ${team.venue}</p>
								<p><b>Alamat</b> : ${team.address}</p>
								<p><b>Berdiri</b> : ${team.founded}</p>
								<p><b>Phone</b> : ${team.phone}</p>
								<p><b>Email</b> : ${team.email}</p>
								<p><b>Website</b> :<a href="${team.website}" target="_blank">${team.website}</a></p>
							</div>
							<div class="card-action center-align">
							<a href="${team.website}" target="_blank" class="website-action btn blue accent-3">WEBSITE</a>
							<button onclick="deleteFav(${team.id},'${team.name}')" class="waves-effect waves-light btn red accent-3">HAPUS</button>
						</div>
							</div>
						</div>
					</div>


				
					`
			})
					if(data.length == 0) teamsHTML += '<h4 class="center-align red-text "><b>Upppsss!!!! Kamu tidak punya Team Favorit</b></h4>'
					 //insert All Team in Database to DOM
					// document.getElementById('loader2').style.display = 'none'
					document.getElementById('bookmarkTeams').innerHTML = teamsHTML
			})
}

function AllKlasemen(){
	// getSpanyol(2014)
	getItalia(2019)
	getIggris(2021)
	
} 

function topSkor(){
    getTopInggris('PL')
    getTopItalia('SA')

}