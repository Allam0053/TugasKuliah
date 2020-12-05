// start button logic
const start_btn = document.querySelector(".start-button button");
const info_box = document.querySelector(".info-box");
const quit_btn = document.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz-box");
const option_list = document.querySelector(".option-list");
const timecount = quiz_box.querySelector(".timer .timer-sec");
const timeline = quiz_box.querySelector("header .time-line");
const timeoff = quiz_box.querySelector("header .timer-text");


//start clicked
start_btn.onclick = ()=>{
	info_box.classList.add("activeinfo");//show info box
}

//exit clicked
quit_btn.onclick = ()=>{
	info_box.classList.remove("activeinfo");//remove info box
}

continue_btn.onclick = ()=>{
	info_box.classList.remove("activeinfo"); //remove info box
	quiz_box.classList.add("activequiz"); //show quiz box
	showquestion(0);
	quecounter(1);//nomor yang ada dibawah
	starttimer(15);
	starttimerline(0);
}

let que_count = 0;//nomor disamping soal
let que_numb = 1;//nomor yang ada dibawah
let counter;
let counterline;
let timevalue = 15;
let widthvalue = 0;
let userscore = 0;

const next_btn = quiz_box.querySelector(".next-btn");
const result_box = document.querySelector(".result-box");
const restart_quiz = document.querySelector(".buttons .restart");
const replay_quiz = result_box.querySelector(".buttons .restart");
const quiz_quit = result_box.querySelector(".buttons .quit");

replay_quiz.onclick = ()=>{
	quiz_box.classList.add("activequiz"); //show quiz box
    result_box.classList.remove("activeresult"); //hide result box
    timevalue = 15; 
    que_count = 0;
    que_numb = 1;
    userscore = 0;
    widthvalue = 0;
    showquestion(que_count); //calling showQestions function
    quecounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterline); //clear counterLine
    starttimer(timevalue); //calling startTimer function
    starttimerline(widthvalue); //calling startTimerLine function
    timetext.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

quiz_quit.onclick = ()=>{
	window.location.reload();
}

next_btn.onclick = ()=>{
	if(que_count < questions.length-1 ){
		que_count++;//nomor disamping soal
		que_numb++;//nomor yang ada dibawah
		showquestion(que_count);
		quecounter(que_numb);
		clearInterval(counter); //stop the timer
		starttimer(timevalue);
		clearInterval(counterline);
		starttimerline(widthvalue);
		next_btn.style.display = "none";
		timeoff.textContent = "Time Left";
	}else{
		clearInterval(counter); //stop the timer
		clearInterval(counterline);
		showresultbox();
		console.log("Quiz Complete");
	}
}


// get the question
function showquestion(index){
	const que_text = document.querySelector(".que-text");
	let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question+'</span>';
	let option_tag = 
		'<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    	+ '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    	+ '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    	+ '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
	que_text.innerHTML = que_tag;
	option_list.innerHTML = option_tag;

	const option = option_list.querySelectorAll(".option");
	for(let i=0; i<option.length; i++){
		option[i].setAttribute("onclick", "optionSelected(this)");
	}
}

let tickicon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossicon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
	clearInterval(counter);//stop the timer
	clearInterval(counterline);
	let userans = answer.textContent;
	let correctans = questions[que_count].answer;
	let alloption = option_list.children.length;
	if(userans == correctans){
		userscore +=1 ;
		answer.classList.add("correct");
		console.log("answer is correct");
		answer.insertAdjacentHTML("beforeend", tickicon);
	}else{
		answer.classList.add("incorrect");
		console.log("answer is wrong");
		answer.insertAdjacentHTML("beforeend", crossicon);

		//auto select the correct ans
		for(let i=0; i<alloption; i++){
			if(option_list.children[i].textContent == correctans){
				option_list.children[i].setAttribute("class", "option correct");
				option_list.children[i].insertAdjacentHTML("beforeend", tickicon);
			}
		}
	}

	//when user selected an option, disable all option
	for(let i=0; i<alloption; i++){
		option_list.children[i].classList.add("disabled");
	}

	next_btn.style.display = "block";
}

function showresultbox(){
	quiz_box.classList.remove("activequiz");
	result_box.classList.add("activeresult");
	const scoretext = result_box.querySelector(".score-text");

	if ( userscore<2 ) {
		let scoretag = '<span>and sorry, you got only <p>'+userscore+'</p> out of <p>'+questions.length+'</p></span>';
		scoretext.innerHTML = scoretag;
	}else if (userscore<4) {
		let scoretag = '<span>nice, you got <p>'+userscore+'</p> out of <p>'+questions.length+'</p></span>';
		scoretext.innerHTML = scoretag;
	}else{
		let scoretag = '<span>congrats, you got <p>'+userscore+'</p> out of <p>'+questions.length+'</p></span>';
		scoretext.innerHTML = scoretag;
	}
}

function starttimer(time){
	counter = setInterval(timer, 1000);//stop the timer
	function timer(){
		timecount.textContent = time;
		time--;
		if (time<9) {
			let addzero = timecount.textContent;
			timecount.textContent = "0" + addzero;
		}
		if(time<0){
			clearInterval(counter);
			timecount.textContent = "00";
			timeoff.textContent = "Time Off";

			let correctans = questions[que_count].answer;
			let alloption = option_list.children.length;

			//auto select the correct ans
			for(let i=0; i<alloption; i++){
				if(option_list.children[i].textContent == correctans){
					option_list.children[i].setAttribute("class", "option correct");
					option_list.children[i].insertAdjacentHTML("beforeend", tickicon);
				}
			}
			//when user selected an option, disable all option
			for(let i=0; i<alloption; i++){
				option_list.children[i].classList.add("disabled");
			}

			next_btn.style.display = "block";
		}
	}
}

function starttimerline(time){
	counterline = setInterval(timer, 29);//stop the timer
	function timer(){
		time += 1;
		timeline.style.width = time + "px";
		if(time > 549){
			clearInterval(counterline);
		}
	}
}

function quecounter(index){
	const button_ques_counter = quiz_box.querySelector(".total-que");
	let totalquescounttag = '<span><p>'+ (que_count+1) +'</p>of<p>'+questions.length+'</p>Questions</span>';
	button_ques_counter.innerHTML = totalquescounttag;
}