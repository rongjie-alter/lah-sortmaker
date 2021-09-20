let namMember = [];
let lstMember = [];
let parentMember = [];
let equal = [];
let rec = [];
let cmp1 = 0, cmp2 = 0;
let head1 = 0, head2 = 0;
var nrec;
var canvasObj;

let numQuestion = 0;
let totalSize = 0;
let finishSize = 0;
let finishFlag = 1;


function initList() {
	let n = 0;
	let mid = 0;

	//The sequence that you should sort
	lstMember[n] = [];
	for (let i = 0; i < namMember.length; i++) {
		lstMember[n][i] = i;
	}
	parentMember[n] = -1;
	totalSize = 0;
	n++;

	for (let i = 0; i < lstMember.length; i++) {
		//And element divides it in two/more than two
		//Increase divided sequence of last in first member
		if (lstMember[i].length >= 2) {
			mid = Math.ceil(lstMember[i].length / 2);
			lstMember[n] = [];
			lstMember[n] = lstMember[i].slice(0, mid);
			totalSize += lstMember[n].length;
			parentMember[n] = i;
			n++;
			lstMember[n] = [];
			lstMember[n] = lstMember[i].slice(mid, lstMember[i].length);
			totalSize += lstMember[n].length;
			parentMember[n] = i;
			n++;
		}
	}

	//Preserve this sequence
	for (let i = 0; i < namMember.length; i++) {
		rec[i] = 0;
	}
	nrec = 0;

	//List that keeps your results
	//Value of link initial
	// Value of link initial
	for (let i = 0; i <= namMember.length; i++) {
		equal[i] = -1;
	}

	cmp1 = lstMember.length - 2;
	cmp2 = lstMember.length - 1;
	head1 = 0;
	head2 = 0;
	numQuestion = 1;
	finishSize = 0;
	finishFlag = 0;
}


function sortList(flag) {
	if (finishFlag == 1)
		return;

	let i = 0;
	let str = "";

	//rec preservation
	if (flag < 0) {
		rec[nrec] = lstMember[cmp1][head1];
		head1++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec - 1]] != -1) {
			rec[nrec] = lstMember[cmp1][head1];
			head1++;
			nrec++;
			finishSize++;
		}
	}
	else if (flag > 0) {
		rec[nrec] = lstMember[cmp2][head2];
		head2++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec - 1]] != -1) {
			rec[nrec] = lstMember[cmp2][head2];
			head2++;
			nrec++;
			finishSize++;
		}
	}
	else {
		rec[nrec] = lstMember[cmp1][head1];
		head1++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec - 1]] != -1) {
			rec[nrec] = lstMember[cmp1][head1];
			head1++;
			nrec++;
			finishSize++;
		}
		equal[rec[nrec - 1]] = lstMember[cmp2][head2];
		rec[nrec] = lstMember[cmp2][head2];
		head2++;
		nrec++;
		finishSize++;
		while (equal[rec[nrec - 1]] != -1) {
			rec[nrec] = lstMember[cmp2][head2];
			head2++;
			nrec++;
			finishSize++;
		}
	}

	//Processing after finishing with one list
	if (head1 < lstMember[cmp1].length && head2 == lstMember[cmp2].length) {
		//List the remainder of cmp2 copies, list cmp1 copies when finished scanning
		while (head1 < lstMember[cmp1].length) {
			rec[nrec] = lstMember[cmp1][head1];
			head1++;
			nrec++;
			finishSize++;
		}
	}
	else if (head1 == lstMember[cmp1].length && head2 < lstMember[cmp2].length) {
		//List the remainder of cmp1 copies, list cmp2 copies when finished scanning
		while (head2 < lstMember[cmp2].length) {
			rec[nrec] = lstMember[cmp2][head2];
			head2++;
			nrec++;
			finishSize++;
		}
	}

	//When it arrives at the end of both lists
	//Update a pro list
	if (head1 == lstMember[cmp1].length && head2 == lstMember[cmp2].length) {
		for (let i = 0; i < lstMember[cmp1].length + lstMember[cmp2].length; i++) {
			lstMember[parentMember[cmp1]][i] = rec[i];
		}
		lstMember.pop();
		lstMember.pop();
		cmp1 = cmp1 - 2;
		cmp2 = cmp2 - 2;
		head1 = 0;
		head2 = 0;

		//Initialize the rec before performing the new comparison
		if (head1 == 0 && head2 == 0) {
			for (let i = 0; i < namMember.length; i++) {
				rec[i] = 0;
			}
			nrec = 0;
		}
	}

	showProgress();

	if (cmp1 < 0) {
		showResults();
		finishFlag = 1;
	}
	else {
		showImage();
	}
}

// Shuffle Script
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function showResults() {
	finishFlag = 1;

	let ranking = 1;
	let sameRank = 1;
	let str = "";
	let i;

	for (let i = 0; i < namMember.length; i++) {
		const unitName = namMember[lstMember[0][i]].name;
		const unitURL = namMember[lstMember[0][i]].url;
		const unitHTML = '<div id="character-slot"><div>#' + ranking + ' - ' + unitName + '</div><img class="character-spacing" src="' + unitURL + '"></div>';

		if (i <= 4)
			$(unitHTML).insertBefore('#sort-results .results-field .clearfix');
		else
			$(unitHTML).insertBefore('#sort-results .results-field-extended .clearfix');

		if (i < namMember.length - 1) {
			if (equal[lstMember[0][i]] == lstMember[0][i + 1]) {
				sameRank++;
			} else {
				ranking += sameRank;
				sameRank = 1;
			}
		}
	}

	$('#show-results').prop('disabled', true);
	$('#sort-results').toggle(2000, function () { $('#save-results').prop('disabled', false); });
	modifyProgressBar(100);
	scrollToLastHeight();
}

function scrollToLastHeight() {
	$('html, body').animate({ scrollTop: $(window).height() - 40 }, 2000);
}

function showMoreResults() {
	$('#sort-results .results-field-extended').slideDown(1500, function () { $('#save-results').prop('disabled', false); });

	scrollToLastHeight();
	$('#show-more').prop('disabled', true);
	$('#save-results').prop('disabled', true);
}

function modifyProgressBar(percentage) {
	$('#sort-progress .progress-bar').css('width', percentage + '%');
	$('#sort-progress .percentage').text(Math.round(percentage));

	if (percentage >= 100)
		$('#sort-progress .progress-bar').addClass('progress-bar-success').removeClass('progress-bar-striped active');
	else
		$('#sort-progress .progress-bar').removeClass('progress-bar-success').addClass('progress-bar-striped active');
}

function showProgress() {
	$('#sort-title .battle-number').text(numQuestion);
	//$('#sort-title .total-number').text(totalSize * 0.2);

	modifyProgressBar(finishSize * 100 / totalSize);
}

function showImage() {
	const unit1 = lstMember[cmp1][head1], unit2 = lstMember[cmp2][head2];
	const percentage = Math.floor(finishSize * 100 / totalSize);

	$('#left-field .unit-icon').attr('src', namMember[unit1].url);
	$('#left-field .unit-name').text(namMember[unit1].name);

	$('#right-field .unit-icon').attr('src', namMember[unit2].url);
	$('#right-field .unit-name').text(namMember[unit2].name);

	numQuestion++;
}

function downloadScreenshot() {
	let canvas = canvasObj;

	if (canvas) {
		let elem = $('#download-sorter');

		elem.attr('href', canvas.toDataURL('image/jpeg'));
		elem.attr('download', 'SortMaker_' + $('div#dialog-title').text() + '.jpeg');
	}
}

async function showScreenshot() {
	// $('#sort-results').css('width', '1024px');

	canvas = await html2canvas(document.querySelector('#sort-results'))
	$('canvas').remove();
	$('#render-results hr').before(canvas);

	canvasObj = canvas;
}

async function loadList() {
	// To all the hackers out there, you just need to modify this function...
	// Just push objects of {name: String, url: String} into namMember array
	// You can just hardcode it, or fetch from external source then do some processing

	const dataUrl = "https://rawcdn.githack.com/liveahero-wiki/liveahero-wiki.github.io/a9315f0d1dc1a8476c7d03be501f6d4743d756d7/_data/SidekickMaster.json";

	let res = await fetch(dataUrl);
	let data = await res.json();

	for (let k in data) {
		let unit = data[k];
		if (unit.levelZone > 1) continue;
		namMember.push({
			name: unit.cardName,
			url: `https://liveahero-wiki.github.io/cdn/Sprite/icon_${unit.resourceName}_s01.png`,
		})
	}
}

async function main() {
	await loadList();

	namMember = shuffle(namMember);
	initList();
	showProgress();
	showImage();

	$('#sort-results').toggle();
	$('#sort-results .results-field-extended').toggle();

	$('#sort-select #left-field').on('click', function () { sortList(-1); });
	$('#sort-select #right-field').on('click', function () { sortList(1); });
	$('#sort-select #middle-field').on('click', function () { sortList(0); });

	$('#show-more').on('click', showMoreResults);
	$('#download-sorter').on('click', downloadScreenshot);
	$('#show-results').on('click', showResults).prop('disabled', false);
	$('#save-results').on('click', showScreenshot).prop('disabled', true);
}

main();