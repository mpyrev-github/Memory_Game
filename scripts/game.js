var temp_id,second_card=false;	//temp_id - идентификатор карты на игровом поле, выбранной в прошлый раз, second_card - определяет открывается вторая карта или же это ещё первая
var opened_pair=0;				//количество открытых пар
// проверка на уникальность рандомных карт
function Check_Arr(Arr_Of_Names,first_symbol,second_symbol) { 					
	var collusion=false;
	for (var i = 0; i < Arr_Of_Names.length; i++){ 
		if (Arr_Of_Names[i]==first_symbol+second_symbol)
			collusion=true;
	}
	return collusion;
}
function Get_Score (operation){
	var temp_score,score=document.getElementById('score');
	if (operation==false){
		temp_score=Number(score.innerHTML)-window.opened_pair*42;
		if (temp_score>=0)
			score.innerHTML=temp_score;
		else
			score.innerHTML=0;
	}
	else {
		score.innerHTML=Number(score.innerHTML)+(9-window.opened_pair)*42;
		window.opened_pair++;
	}
	if (window.opened_pair==9)
		setTimeout(function(){document.location = "end.html?score=" + score.innerHTML;},500);	
}
// проверка на совпадение открытых карт.
function Check_Card(img_clicked,img_temp,inner_Div_clicked,inner_Div_temp){ 	
	if (img_clicked.src==img_temp.src)
	{
		img_clicked.className='cards animated zoomOutDown';
		img_temp.className='cards animated zoomOutDown';
		setTimeout(function(){
			inner_Div_clicked.removeAttribute('id');
			inner_Div_temp.removeAttribute('id');
			inner_Div_clicked.innerHTML='';
			inner_Div_temp.innerHTML='';
		},400);
		Get_Score(true);
	}
	else{
		img_clicked.className='cards animated flipOutY';
		img_temp.className='cards animated flipOutY';
		setTimeout(function(){
			img_clicked.className='cards animated flipInY';
			img_temp.className='cards animated flipInY';
			img_clicked.src='./pic/card-face.png';
			img_temp.src='./pic/card-face.png';
		},400);
		Get_Score(false);
	}
}
function Open_First_Card(Rand_Arr_Of_Cards,i,img_clicked){
	img_clicked.className='cards animated flipInY';
	img_clicked.src = Rand_Arr_Of_Cards.src;
	window.temp_id=i;
	window.second_card=true;
}
function Open_Second_Card(Rand_Arr_Of_Cards,i,img_clicked,img_temp,inner_Div_clicked,inner_Div_temp){
	img_clicked.className='cards animated flipInY';
	img_clicked.src=Rand_Arr_Of_Cards.src;
	setTimeout(Check_Card,500,img_clicked,img_temp,inner_Div_clicked,inner_Div_temp);
	window.second_card=false;
}
function Click_On_Card(Rand_Arr_Of_Cards,i) {
	var inner_Div_clicked = document.getElementById('divcards'+i);
    inner_Div_clicked.onclick = function() {
		var img_clicked = document.getElementById('card'+i);
		if (img_clicked!=null){
			if ( window.second_card==false || window.temp_id==i)
			{
				img_clicked.className='cards animated flipOutY';
				setTimeout(Open_First_Card,400,Rand_Arr_Of_Cards,i,img_clicked);
			}
			else {
				var inner_Div_temp=document.getElementById('divcards'+window.temp_id);
				var img_temp=document.getElementById('card'+window.temp_id);
				img_clicked.className='cards animated flipOutY';
				setTimeout(Open_Second_Card,400,Rand_Arr_Of_Cards,i,img_clicked,img_temp,inner_Div_clicked,inner_Div_temp);
			}
		}
	}
}
function Flip_Card(Rand_Arr_Of_Cards) {
	for (i = 0; i < 18; i++) {
		var img=document.getElementById("card"+i);
		img.className='cards animated-start flipOutY';
	}
	setTimeout(function(){
		for (i = 0; i < 18; i++) {
			var img=document.getElementById("card"+i);
			img.src='./pic/card-face.png';
			img.className='cards animated-start flipInY';
			img.setAttribute('data-tid','Card-flipped');
			Click_On_Card(Rand_Arr_Of_Cards[i],i);
		}
	},500);
}
function Create_Container(){
	var div = document.getElementById('divcards');
	for (j = 0; j < 3; j++) {
		for (i = 0; i < 5; i++) {
			var inner_Div = document.createElement('div');
			inner_Div.className='cards';
			inner_Div.id = 'divcards'+(i+6*j);
			inner_Div.style.paddingTop='20px';
			inner_Div.style.paddingRight='20px';
			div.appendChild(inner_Div);
		}
		var inner_Div = document.createElement('div');
			inner_Div.className='cards';
			inner_Div.id = 'divcards'+(5+6*j);
			inner_Div.style.paddingTop='20px';
			inner_Div.style.paddingRight='0px';
			div.appendChild(inner_Div);
	}
	for (i = 0; i < 18; i++) {
		var inner_Div = document.getElementById('divcards'+i);
		var img = document.createElement('img');
			img.id = 'card'+i;
			img.className='cards animated-start flipInX';
			img.setAttribute('data-tid','Card');
			inner_Div.appendChild(img);
	}
}
// сгенерить рандомные карты из возможных достоинств и мастей
function Gen_Cards() {
	Create_Container();
	var index_first,index_second,first_symbol,second_symbol,index_arr,
		arr_first_symbol = '023456789AJKQ',
		arr_second_symbol = 'CDHS',
		i=0;
	var Arr_Of_Names=new Array ();
	var Arr_Of_Cards=new Array ();
	var Rand_Arr_Of_Cards=new Array ();
	for (i = 0; i < 9; i++) {
		do {
			index_first = Math.floor(Math.random() * arr_first_symbol.length);
			index_second = Math.floor(Math.random() * arr_second_symbol.length);
			first_symbol = arr_first_symbol[index_first];
			second_symbol = arr_second_symbol[index_second];
		} while ( Check_Arr(Arr_Of_Names,first_symbol,second_symbol) )
		Arr_Of_Names[i]=first_symbol+second_symbol;
		Arr_Of_Cards[i]=new Image ();
		Arr_Of_Cards[i].src ='./pic/cards/'+Arr_Of_Names[i]+'.png';
		Arr_Of_Cards[i+9]=Arr_Of_Cards[i];
	}
	for (i = 0; i < 18; i++) {
		do {
		index_arr = Math.floor(Math.random() * Arr_Of_Cards.length);
		} while ( Rand_Arr_Of_Cards[index_arr]!=null )
		Rand_Arr_Of_Cards[index_arr]=Arr_Of_Cards[i];
	}
	for (i = 0; i < 18; i++) {
		document.getElementById('card'+i).src=Rand_Arr_Of_Cards[i].src;
	}
	setTimeout(Flip_Card, 5000, Rand_Arr_Of_Cards);
}