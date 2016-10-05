function mainBar(){
	this.mainWidth;
	this.mainHeight;

	this.PiX = 20;
	this.PiY = 40;
	this.ctx;
	this.j = 25;
	this.b = 0;
	this.pointSelected = undefined;

	this.ax;
	this.ay;
	this.axh;
	this.ayh;

	this.drawTemp = true;
	this.drawHum = true;

	this.SetParameters = fSetParameters;
	this.drawReferer = fdrawReferer;
	this.drawShapes = fdrawShapes;
	this.drawPoint = fdrawPoint;
	this.drawLine = fdrawLine;
	this.drawLineI = fdrawLineI;
	this.drawLineIh = fdrawLineIh;
	this.setDrawTemp = fdibTemp;
	this.setDrawHum = fdibHum;

	this.getMaxValue = fgetMaxValue;

	this.shapes = [];
	this.points = [];
	this.pointsh = [];
	this.newShape = fnewShape;
	this.delShape = fdelShape;
	this.newPoint = fnewPoint;
	this.delPoint = fdelPoint;
	this.newPointH = fnewPointH;

	this.getDay = fgetDay;
	this.getTemp = fgetTemp;
	this.getHum = fgetHum;
	this.getSelected = fgetSelect;

	this.refresh = frefresh;
	this.delView = fdelView;
	this.mouseDown = fmouseDown;
}

/* FUNCIONES */

/* Carga el contexto Canvas */
function CargaContextoCanvas(idCanvas){
   var elemento = idCanvas;
   if(elemento && elemento.getContext){
      var contexto = elemento.getContext('2d');
      if(contexto){
         return contexto;
      }
   }
   return false;
}

/* Objeto de los Shapes */
function objeto(i,h,d)
{
	this.temp = i;
	this.hum = h;
	this.fecha = d;
	this.selectTemp = false;
	this.selectHum = false;
}

/* Objeto Point */
function points(x,y)
{
	this.x = x;
	this.y = y;
}

/* Borra los Points */
function fdelPoint(){
	this.points = [];
	this.pointsh = [];
}

/* Borra los Shapes y los Points */
function fdelShape(){
	this.shapes = [];
	this.delPoint();
}

/* Borra el Canvas */
function fdelView(){
	this.ctx.clearRect(0, 0, this.mainWidth, this.mainHeight);
}

/* Setea si hay que dibujar la curva de la temperatura */
function fdibTemp(h){
	this.drawTemp = h;
}

/* Setea si hay que dibujar la curva de la humedad */
function fdibHum(h){
	this.drawHum = h;
}

/* Dibuja las lineas de la temperatura y de la humedad */
function fdrawLine(bTemp,bHum){
	if(this.drawTemp){
		this.ctx.beginPath();
		this.ctx.lineWidth = 1.8;
		if(bTemp){
			this.ctx.moveTo(this.points[0].x,this.points[0].y);
			this.ctx.strokeStyle = '#43affa';
			for (var i = 1; i < this.points.length; i++) {
				this.ctx.lineTo(this.points[i].x,this.points[i].y);
			}
		}
		this.ctx.stroke();
	}
	if(this.drawHum){
		this.ctx.beginPath();
		this.ctx.lineWidth = 1.8;
		if(bHum){
			this.ctx.moveTo(this.pointsh[0].x,this.pointsh[0].y);
			this.ctx.strokeStyle = '#43faaf';
			for (var i = 0; i < this.pointsh.length; i++) {
				this.ctx.lineTo(this.pointsh[i].x,this.pointsh[i].y);
			}
		}
		this.ctx.stroke();
	}
	if(this.drawTemp){this.drawLineI();}
	if(this.drawHum){if(this.drawTemp){this.drawLineIh(false);}else{this.drawLineIh(true)}}
}

/* Pinta el area debajo de la curva de temperatura */
function fdrawLineI(){
	this.ctx.beginPath();
	this.ctx.lineWidth = 1;
	this.ctx.strokeStyle = 'rgba(0,0,0,0)';
	this.ctx.moveTo(this.ax,this.ay);
	this.ctx.fillStyle = 'rgba(67,175,250,0.2)';
	var xx;
	for (var i = 0; i < this.points.length; i++) {
		this.ctx.lineTo(this.points[i].x,this.points[i].y);
		xx = this.points[i].x;
	}
	this.ctx.lineTo(xx,this.ay);
	this.ctx.closePath();
	this.ctx.stroke();
	this.ctx.fill();
}

/* Pinta el area debajo de la curva de humedad */
function fdrawLineIh(b){
	if(b){
	this.ctx.beginPath();
	this.ctx.lineWidth = 1;
	this.ctx.strokeStyle = 'rgba(0,0,0,0)';
	this.ctx.moveTo(this.axh,this.ayh);
	this.ctx.fillStyle = 'rgba(39,250,67,0.2)';
	var xx;
	for (var i = 0; i < this.pointsh.length; i++) {
		this.ctx.lineTo(this.pointsh[i].x,this.pointsh[i].y);
		xx = this.pointsh[i].x;
	}
	this.ctx.lineTo(xx,this.ayh);
	this.ctx.closePath();
	this.ctx.stroke();
	this.ctx.fill();
	}
	else{
		this.ctx.beginPath();
		this.ctx.lineWidth = 1;
		var t = this.points.length - 1;
		this.ctx.strokeStyle = 'rgba(0,0,0,0)';
		this.ctx.moveTo(this.axh,this.ayh);
		this.ctx.fillStyle = 'rgba(39,250,67,0.2)';
		var xx;
		for (var i = 0; i < this.pointsh.length; i++) {
			this.ctx.lineTo(this.pointsh[i].x,this.pointsh[i].y);
			xx = this.pointsh[i].x;
		}
		for (var i = t; i >= 0; i--) {
			this.ctx.lineTo(this.points[i].x,this.points[i].y);
			xx = this.points[i].x;
		}
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.fill();
	}
}

/* Dibuja los puntos en el Canvas */
function fdrawPoint(bTemp,bHum){
	if(bTemp){ /* Dibuja los puntos de la temperatura */
		for (var i = 0; i < this.points.length; i++) {
			var r = 5;
			if(this.pointSelected != undefined){
				if(this.pointSelected == i){
					r = 10;
				}
				else{r=5;}
			}
			else{r=5;}
			this.ctx.beginPath();
			this.ctx.fillStyle = '#0a96f8';
			this.ctx.arc(this.points[i].x,this.points[i].y,r,0,2*Math.PI,true);
			this.ctx.fill();
		}
	}
	if(bHum){ /* Dinuja los puntos de la humedad */
		for (var i = 0; i < this.pointsh.length; i++) {
			var r = 5;
			if(this.pointSelected != undefined){
				if(this.pointSelected == i){
					r = 10;
				}
				else{r=5;}
			}
			else{r=5;}
			this.ctx.beginPath();
			this.ctx.fillStyle = '#0af896';
			this.ctx.arc(this.pointsh[i].x,this.pointsh[i].y,r,0,2*Math.PI,true);
			this.ctx.fill();
		}
	}
}

/* Dibuja los ejes de referencia */
function fdrawReferer(){
	var maximo = this.getMaxValue(); /* Obtenemos el max valor de los shapes */
	var PiY = this.PiY; /* Posicion inicial desde donde va a comenzar a trazar los ejes */
	var PiX = this.PiX;
	var px = PiX+10;
	var py = PiY;
	var j = this.j;
	var b = 0;

	while(py < (this.mainHeight-20))
	{
		this.ctx.beginPath();
		this.ctx.lineWidth = 0.2;
		this.ctx.strokeStyle = '#777';
		this.ctx.moveTo(px,py);
		this.ctx.lineTo(this.mainWidth,py);
		this.ctx.stroke();
		b++;
		py += j;
	}

	this.ctx.beginPath();
	this.ctx.lineWidth = 0.2;
	this.ctx.strokeStyle = '#777';
	this.ctx.moveTo(PiX+15,PiY-5);
	this.ctx.lineTo(PiX+15,py-20);
	this.ctx.stroke();
	py = PiY;
	b = b-1;
	this.b = b;

	for (var i = 0; i < (b+1); i++) {
		this.ctx.font="12px Segoe UI";
		this.ctx.fillStyle = '#959595';
		this.ctx.textAlign="right";
		this.ctx.textBaseline="middle"; 
		this.ctx.fillText(parseInt((maximo/b)*(b-i)),PiX+5,py);
		py += j;
	}
}

/* Toma los Shapes y con su informacion crea los Points */
function fdrawShapes(){
	var longitud = this.shapes.length;
	var CiX = this.PiX+15;
	var CiY = this.PiY;
	var lX = this.mainWidth-this.PiX-30;
	var lY = this.b*this.j;
	var tX = CiX;
	var tY = CiY;
	var p = this.getMaxValue();
	if(this.drawTemp){
	this.ax = CiX;
	this.ay = CiY+lY;
	for (var i = 0; i < longitud; i++) {
		var t = this.shapes[i].temp;
		var xx = tX;
		var yy = (CiY+lY)-((lY/p)*t);
		var pp = true;
		if(i == 0)
		{
			pp = false;
		}
		this.newPoint(xx,yy);
		tX = tX + (lX/(longitud-1));
		ax = xx;
		ay = yy;
	}
	}
	if(this.drawHum){
	this.axh = CiX;
	this.ayh = CiY+lY;
	var tX = CiX;
	var tY = CiY;
	for (var i = 0; i < longitud; i++) {
		var t = this.shapes[i].hum;
		var xx = tX;
		var yy = (CiY+lY)-((lY/p)*t);
		var pp = true;
		if(i == 0)
		{
			pp = false;
		}
		this.newPointH(xx,yy);
		tX = tX + (lX/(longitud-1));
		axh = xx;
		ayh = yy;
	}
	}
	this.drawLine(true,true);
	this.drawPoint(this.drawTemp,this.drawHum);
}

/* Retorna el valor maximo que hay en los Shapes, sirve para dibujar los ejes de coordenada */
function fgetMaxValue(){
	return 100;
}

/* Obtiene la fecha de un determinado Shape referenciado por el ID */
function fgetDay(id){
	return this.shapes[id].fecha;
}

/* Obtiene la temperatura de un determinado Shape referenciado por el ID */
function fgetTemp(id){
	return this.shapes[id].temp;
}

/* Obtiene la humedad de un determinado Shape referenciado por el ID */
function fgetHum(id){
	return this.shapes[id].hum;
}

/* Obtiene el Shape seleccionado, retorna el ID del Shape si es que hay uno seleccionado. Sino retorna undefined */
function fgetSelect(){
	return this.pointSelected;
}

/* Si se presiono el click izquierdo del mouse, verifica si se presiono sobre un Point */
function fmouseDown(mouseX , mouseY){
	if(this.pointSelected != undefined){
		this.pointSelected = undefined;
	}

	for (var i = 0; i < this.points.length; i++) {
		if( ((this.points[i].x - 5) < mouseX) && ((this.points[i].x + 5) > mouseX) && ((this.points[i].y - 5) < mouseY) && ((this.points[i].y + 5) > mouseY) ){
			this.pointSelected = i;
			i = 1000;
		}
		else{
			this.pointSelected = undefined;
		}
	}
	if(this.pointSelected == undefined){
		for (var i = 0; i < this.pointsh.length; i++) {
			if( ((this.pointsh[i].x - 5) < mouseX) && ((this.pointsh[i].x + 5) > mouseX) && ((this.pointsh[i].y - 5) < mouseY) && ((this.pointsh[i].y + 5) > mouseY) ){
				this.pointSelected = i;
				i = 1000;
			}
			else{
				this.pointSelected = undefined;
			}
		}
	}

	if(this.pointSelected != undefined){return 0;}
	else{return 1;}
}

/* Agrega un nuevo Point de temperatura */
function fnewPoint(x,y){
	this.points.push(new points(x,y));
}

/* Agrega un nuevo Point de humedad */
function fnewPointH(x,y){
	this.pointsh.push(new points(x,y));
}

/* Agrega un nuevo Shape */
function fnewShape(i,h,d){
	this.shapes.push(new objeto(i,h,d));
}

/* Refresca el Canvas */
function frefresh(){
	this.delView();
	this.drawReferer();
	this.drawShapes();
}

/* Setea los parametros de la clase */
function fSetParameters(w,h,ctx){
	var tctx = CargaContextoCanvas(ctx);
	if(tctx){
		this.ctx = tctx;
	}
	else{
		alert("contexto no cargado");
	}
	this.mainWidth = w;
	this.mainHeight = h;
}