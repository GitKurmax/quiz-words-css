quiz();

function quiz(){
	let wordsObject = {
		words: [['I','1'],['like','2'],['coding','3'],['javascript','4'],['want','5'],['a','6'],['car','7'],['to','8'],['become','9'],['programmer','10']]
			}
	let answer = [[1,2,4],[4,1,2],[2,4,1]];
	let wordBox = document.querySelector('#words-box');
	let wrapper = document.querySelector('#wrapper');
	let wordsArray = [];
	let sentenceBlock = document.querySelector('#sentence');
	let sentenceArray = [];
	let line = sentence.querySelectorAll('.line');
	var x = getObjectCoords(wordBox,"left");
	
	let distanceBetweenLines = getObjectCoords(line[1],"top") - getObjectCoords(line[0],"top");
	let lineCount = 0;
	let finalCoordsRight;
			
	for(var i=0; i < wordsObject.words.length; i++){
		wordsArray.push(wordsObject.words[i][0]);
	}

	placeWordsRandom(wordBox,wordsArray);
	check();

	function placeWordsRandom(parent, wordsArray){
		while(wordsArray.length > 0){
			let i = Math.round(Math.random()*(wordsArray.length - 1));
			var word = document.createElement('span');
			word.innerHTML = wordsArray[i];
			for (let i = 0; i < wordsObject.words.length; i++) {
				if(word.innerHTML == wordsObject.words[i][0]){
					word.setAttribute("data-word-number",wordsObject.words[i][1]);
				}
			}
			word.classList.add('word');
			parent.appendChild(word);
			wordsArray.splice(i,1);
			
		word.addEventListener('click', function moveObj(){
			if(!sentenceArray.length){
				lineCount = 0;
			}

			if(hasClass('.belongsToSentence').length == 0){
				var biasThisY = this.zeroY + getObjectCoords(line[lineCount],"bottom") - this.offsetHeight;
				var	biasThisX = this.zeroX + getObjectCoords(line[lineCount],"left") + 10;
				finalCoordsRight = getObjectCoords(line[lineCount],"left") + 10 + this.offsetWidth;

						move(this,biasThisY,biasThisX);
						
						this.setAttribute("data-line-number",lineCount);

					}

			if(hasClass('.belongsToSentence').length > 0){
				if(finalCoordsRight + this.offsetWidth > getObjectCoords(line[lineCount],"right")-10){
					lineCount++;
					var biasThisY = this.zeroY + getObjectCoords(line[lineCount],"bottom") - this.offsetHeight;
					var biasThisX = this.zeroX + getObjectCoords(line[lineCount],"left") + 10;
					
					finalCoordsRight = getObjectCoords(line[lineCount],"left") + 10 + this.offsetWidth;
						
					move(this,biasThisY,biasThisX);
							
					this.classList.toggle('belongsToSentence');
					sentenceArray.push(this);
					this.removeEventListener('click',moveObj);
					this.addEventListener('click',function moveBack(){     var
					index = sentenceArray.indexOf(this);
					   if (this ===
							sentenceArray[sentenceArray.length - 1] ) { lineCount--;
					}
						
						this.classList.toggle('belongsToSentence');
						for (var i = 0; i < sentenceArray.length; i++){
							if(sentenceArray[i] === this){
								sentenceArray.splice(i,1);
							}
						}

						back(this,sentenceArray);
						finalCoordsRight = moveSentence(this,index,sentenceArray);
						this.removeEventListener('click', moveBack);
						this.addEventListener('click', moveObj);
					});

					this.setAttribute("data-line-number",lineCount);
					
					return;
				}
				
						var biasThisY = this.zeroY + getObjectCoords(line[lineCount],"bottom") - this.offsetHeight;
						var biasThisX = this.zeroX + finalCoordsRight + 10;

						finalCoordsRight += 10 + this.offsetWidth;
						
						move(this,biasThisY,biasThisX);
				}
							
					this.classList.toggle('belongsToSentence');
					sentenceArray.push(this);

					this.removeEventListener('click',moveObj);
					this.addEventListener('click',function moveBack(){
						this.classList.toggle('belongsToSentence');
						
						var index = sentenceArray.indexOf(this);

						for (var i = 0; i < sentenceArray.length; i++) {
							if(sentenceArray[i] === this){
								sentenceArray.splice(i,1);
							}
						}

						back(this, sentenceArray);

						finalCoordsRight = moveSentence(this,index,sentenceArray);
						this.removeAttribute("data-line-number");
						this.removeEventListener('click', moveBack);
						this.addEventListener('click', moveObj);
					});
					this.setAttribute("data-line-number",lineCount);
				});				
			}

			var words = document.querySelectorAll(".word");
			window.addEventListener("resize", function(){
				for (var i = 0; i < words.length; i++) {
					var biasY = y - getObjectCoords(wrapper,"top");
					var biasX = x - document.documentElement.clientWidth;
				words[i].zeroX += biasX;
				words[i].zeroY += biasY - window.pageYOffset;
				
				
			}
			y = getObjectCoords(wrapper,"top");
			
			});		
			for (var i = 0; i < words.length; i++) {
				words[i].zeroX = - getObjectCoords(words[i],"left");
				words[i].zeroY = - getObjectCoords(words[i],"top") - window.pageYOffset;
			}
			var y = getObjectCoords(wrapper,"top");
			var x = document.documentElement.clientWidth;
		}

	function getObjectCoords(object,coordSide){
		let coords = object.getBoundingClientRect();
		return coords[coordSide];
	}

	function hasClass(className){
		let objWithClass = document.querySelectorAll(className);
		return objWithClass;
	}

	function move(obj,biasThisY,biasThisX){
				obj.style.top = biasThisY + window.pageYOffset + "px";
				obj.style.left = biasThisX + "px";
			}

	function back(obj,array){
			obj.style.top = 0;
			obj.style.left = 0;
			obj.style.color = "black";
			obj.style.backgroundColor = "lightgrey";
		}

	function moveSentence(obj,index,array){
			if(!array.length){
				return;
			}
			lineCount = obj.dataset.lineNumber;
			if(array[index-1]&&obj.dataset.lineNumber == array[index-1].dataset.lineNumber){
				finalCoordsRight = getObjectCoords(array[index-1], "right");
			}else{
				finalCoordsRight = getObjectCoords(line[lineCount],"left");
			}
			
			for (var i = index; i < array.length; i++) {
				if(hasClass('.belongsToSentence').length > 0){
				if(finalCoordsRight + array[i].offsetWidth > getObjectCoords(line[lineCount],"right")-10){
					lineCount++;
					var biasThisY = array[i].zeroY + getObjectCoords(line[lineCount],"bottom") - array[i].offsetHeight;
					var biasThisX = array[i].zeroX + getObjectCoords(line[lineCount],"left") + 10;
					
					finalCoordsRight = getObjectCoords(line[lineCount],"left") + 10 + array[i].offsetWidth;
						
					move(array[i],biasThisY,biasThisX);
				}else{
					var biasThisY = array[i].zeroY + getObjectCoords(line[lineCount],"bottom") - array[i].offsetHeight;
					var biasThisX = array[i].zeroX + finalCoordsRight + 10;

					finalCoordsRight += 10 + array[i].offsetWidth;
					array[i].dataset.lineNumber = lineCount;
					move(array[i],biasThisY,biasThisX);
					
					}
				}
			}
			return finalCoordsRight;
		}

		function check(){
			var button = document.querySelector('#check');

			button.addEventListener('click', function(){
				var flagsArray = [];
				if(!sentenceArray.length){
					alert("You need to choose anything");
					return;
				}
				
				for (var i = 0; i < sentenceArray.length; i++) {
					for (var j = 0; j < answer.length; j++) {
						if (sentenceArray[i].dataset.wordNumber == answer[j][i]) {
							sentenceArray[i].style.color = "white";
							sentenceArray[i].style.backgroundColor = "green";
							var flag = true;
							break;
						}else{
							sentenceArray[i].style.color = "white";
							sentenceArray[i].style.backgroundColor = "red";
							var flag = false;
							
						}
					}
					flagsArray.push(flag);
				}
				if(sentenceArray.length < answer[0].length){
					for (var i = 0; i < flagsArray.length; i++) {
						if (!flagsArray[i]) {
							break;
						}else if(flagsArray[flagsArray.length-1]){
							alert("This sentence is not finished");
							break;
						}
					}
				}
			});
		}
	}