// start button logic
const start_btn = document.querySelector(".start-button button");
const info_box = document.querySelector(".info-box");
const quit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz-box");


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
}

let que_count = 0;

const next_btn = quiz_box.querySelector(".next-btn");

next_btn.onclick = ()=>{
	if(que_count < questions.length-1 ){
		que_count++;
		showquestion(que_count);
	}else{
		console.log("Quiz Complete");
	}
}

next_btn

// get the question
function showquestion(index){
	const que_text = document.querySelector(".que-text");
	const option_list = document.querySelector(".option-list")
	let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question+'</span>';
	let option_tag = 
		'<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    	+ '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    	+ '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    	+ '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
	que_text.innerHTML = que_tag;
	option_list.innerHTML = option_tag;
}

