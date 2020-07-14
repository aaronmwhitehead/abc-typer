var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var i = 0;
var interval;
var mil = 00;
var sec = 00;
var bestMil = 99;
var bestSec = 99;
var playing = true;


$(document).keypress(function(event){
    // ENTER key is 13
    // String.fromCharCode(event.which)
    switch(event.which) {
        case(13):
            // alert('Enter was pressed. Starting game');
            if(playing == false) {
                playing = true;
                i = 0;
                mil = 00;
                sec = 00;
                $('#mil').html('.00')
                $('#sec').html('00')
                $('.letter-container').each(function( index ) {
                    $(this).removeClass('typed');
                });
            }
            
            break;

        default:
            var currLetter = String.fromCharCode(event.which).toUpperCase();
            $('#text').val('');

            if(currLetter == letters[i]) {
                $(`.${currLetter}`).addClass('typed');
                $(`.${currLetter}`).removeClass('wrong'); 

                if(currLetter === 'A') {
                    interval = setInterval(startTimer, 10);
                }           
                if(currLetter === 'Z') {
                    playing = false;
                    clearInterval(interval);

                    if((bestSec*100+bestMil) > (sec*100+mil)) {
                        bestSec = sec;
                        bestMil = mil;
                    }

                    if(bestSec / 10 < 1) {
                        bestSec = `${bestSec}`;
                    } 
                    
                    if(bestMil / 10 < 1) {
                        bestMil = `0${bestMil}`;
                    }

                    $('.best-time').html(``);
                    $('.best-time').html(`${bestSec}.${bestMil}`)
                    
                } else {
                    i++;
                }
            } else {
                if(playing)
                    $(`.${letters[i]}`).addClass('wrong');
            }

            break;
    }
});

function startTimer() {
    mil++; 
    
    if(mil < 100){
        if(mil < 10)
            $('#mil').html(`.0${mil}`)
        else
            $('#mil').html(`.${mil}`)
    }

    if(mil == 100) {
        mil = 0;
        sec++;

        if(sec < 10)
            $('#sec').html(`0${sec}`)
        else
            $('#sec').html(`${sec}`)
    }

}