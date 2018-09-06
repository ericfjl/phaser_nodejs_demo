const express = require("express"); 
const app = express();
const server = require("http").Server(app);
const io = require("socket.io").listen(server);
const path = require("path");
var debug = require('debug')('r3pi-hzb:server');

const PORT = process.env.PORT || 8888;
const INDEX = path.join(__dirname, "/index.html")

//variables ṕara almacenar jugadores y balas 
var players = {};
var bullets = [];

var gameWidth = 0;
var gameHeight = 0;


//cargar los archivos estaticos
app.use(express.static(__dirname + "/static"));

//creamos una ruta para visualizar el juego
app.get("/", function(req, res){
	res.sendFile(index.html, INDEX);			
});

//iniciamos el servidor de sockets
io.on("connection",function(socket){
		
	//mostramos un mensaje cuando un usuario se conecta
	console.log("nuevo usuario conectado");

	//cuando se conecte un usuario creamos un jugador
	socket.on("newPlayer", function(infoPlayer){

		players[socket.id] = {
			name: infoPlayer.name,
			type: infoPlayer.type, 
			rotation: 0,		
			x: Math.floor(Math.random() * 800) + 400,
			y: Math.floor(Math.random() * 600) + 300,
			playerId: socket.id,
			health: 3
		};

		//enviar todos los jugadores al cliente
		socket.emit("currentPlayers", players);

		//enviar a los demas jugadores mis datos de jugador 
		socket.broadcast.emit("newPlayer", players[socket.id]);
	});


	//detecta cuando un usuario se desconecta
	socket.on("disconnect", function(){

		console.log("Un usuario se desconecto");
		//removemos el jugador de players
		delete players[socket.id];
		//emitimos a todos el id del jugador que se desconecto
		io.emit("disconnect", socket.id);
	});

	//recibimos las nuevas coordenadas de cada jugador
	//para enviarlo a los demas jugadores
	socket.on("playerMovement", function(movementData){
		
		players[socket.id].x = movementData.x;
		players[socket.id].y = movementData.y;
		players[socket.id].rotation = movementData.rotation;
		
		//envias los datos de un jugador a los demas
		socket.broadcast.emit("playerMoved", players[socket.id]);
	});

	//recibimos el evento de cuando una bala es disparada
	socket.on("shootBullet", function(bulletInfo){

		if(players[socket.id]){

			//le asignamos el id del jugador al que pertenecen
			bulletInfo.ownerId = socket.id;	
			bullets.push(bulletInfo);
		}	

	});

});

//enviamos las nuevas coordenadas de las balas cada 16 milisegundos
setInterval(function(){
	updateBullets();
	io.emit("bulletsUpdate", bullets);
}, 16)

//corremos el servidor en el puerto 8080
server.listen(PORT , function(){
	console.log("servidor corriendo en el puerto " + PORT);
	var addr = server.address();
	var bind = typeof addr === 'string'
	  ? 'pipe ' + addr
	  : 'port ' + addr.port;
	debug('Listening on ' + bind);
});

//actuliza los datos de las balas 
function updateBullets(){
		
	//recorremos cada bala
	bullets.forEach(function(bullet, i){
		
		//actulizacion de sus coordenadas (movimiento)
		bullet.x += bullet.speed_x;	
		bullet.y += bullet.speed_y;
		
		//colision de la bala en un enemigo
		for( id in players){

			//detectamos la colision de la bala en un enemigo
			if(bullet.ownerId != id  && Math.abs(players[id].x - bullet.x) < 21 && Math.abs(players[id].y - bullet.y) < 21){
				//eliminamos la bala del arreglo
				bullets.splice(i,1);	

				players[id].health -= 1

				if (players[id].health < 1) delete players[id];

				//emitimos un evento con el id del jugador afectado por la bala
				io.emit("playerHit", id)	
			}
		}

		//si la bala sale de los limites del area del juego se elimina
		if(bullet.x < 0 || bullet.x > 1600 || bullet.y < 0 || bullet.y > 1200){
			bullets.splice(i,1);	
		}
		
	});

}
