window.addEventListener('load' , init);

//Variable
var Salida , Current , MESSAGE , ALERTS;
let seg =`00`, minutes = `00`,cronoCall,Crono, contCheck = `0`,contIncorrec = '0' , suma='0';
// DIC
const lista = [ 
    'My name is Arnulfo',
    'pearl',
     'java',
     'python',
     'cobol',
     'javascript',
     'c++',
     'node',
     'ruby',
     'mysql',
     'sql',
     'c#',
     'codeblock',
     'php',
     'adobe',
     'go',
     'mongol'

];


/***************  Dom ********************/
Salida = document.querySelector('#salida');
Current = document.querySelector('#current');
MESSAGE = document.querySelector('#message');
Crono = document.querySelector('#crono');
Check = document.querySelector('#check');
ALERTS = document.getElementById("alertS");

/*****************INIT()*********************************/

function init() {  

        Salida.addEventListener('input' ,() => {

        const arrayQuote = Current.querySelectorAll('span')
        const arrayValue = Salida.value.split('')


       
        
        let correct = true
        let incorrect = false   
        
        arrayQuote.forEach((characterSpan , index) => {
            const character = arrayValue[index] 
            //console.log("index "+index);
            console.log("arrayValue[2]: "+arrayValue[2]);

            if(character == null){
                
                characterSpan.classList.remove('correct');
                characterSpan.classList.remove('incorrect');
                correct = false;
               
                
            }
            else if (character == characterSpan.innerHTML){

                characterSpan.classList.remove('stringg');
                characterSpan.classList.add('correct');
                characterSpan.classList.remove('incorrect');
                console.log("c2 " + characterSpan.innerHTML)
                suma ++;
                console.log("suma: " + suma)
                
                } 
            else if (character != characterSpan.innerHTML) {
                
                characterSpan.classList.add('stringg');

                characterSpan.classList.remove('correct');
                characterSpan.classList.add('incorrect');
                incorrect = true;
                correct = false;
               /* console.log("CHaracter: "+character);
                console.log("characterSpan: "+characterSpan);
                console.log("characterSpan.innerHTML: "+characterSpan.innerHTML);*/

                
            }

                });


               /** CORRECT */
        if (correct){
            renderNewQuote();
            contCheck ++;
            minutes ++;
            document.querySelector("#check").textContent = contCheck;

            document.querySelector("#add").textContent = 1;
            setTimeout('show()',500);
            setTimeout('hidden()',1000);
            document.querySelector('#crono').textContent = `${minutes}:${seg}`;        
        }

        Salida.onkeydown = function() {
        var x = event.keyCode || event.charCode;
        
        //  If backspace then null   /////////////////////////////////////////////
        if(x === 8){
            //ok
        }
        //  Negative Game SCORE   /////////////////////////////////////////////
        else if (incorrect){
            contIncorrec ++;
            document.querySelector("#close").textContent = contIncorrec;
            
        }
        } 

        });
    
    Salida.addEventListener('input' , renderNewQuote())
    document.querySelector('.btn-play').addEventListener('click', function() {

        if(minutes == `00`){

                ALERTS.classList.remove("hide");
            
           return false;
        }

       
       cronoCall = setInterval(time, 25);
       document.querySelector('#play').classList.remove()    
       document.querySelector('#play').textContent = 'GOO'; 
       document.querySelector('.btn-play').disabled= true;
       document.querySelector('.btn-hard').disabled= true;
       document.querySelector('.btn-medium').disabled= true;
       document.querySelector('.btn-easy').disabled= true;
       goInput()

    
    });

}


//***********SHOW AND HIDDEN ADD ++ TIME************ */
function show(){
    document.querySelector('#add').style.opacity='100';
}


  function hidden(){
   document.querySelector('#add').style.opacity='0';
  }

/******************************************************** */
function goInput(){
    document.getElementById("salida").disabled = false;
    document.getElementById('salida').focus();
}
/********************************************************** */

/************    MODE     ************ */

document.querySelector('.btn-easy').addEventListener('click', Easy);
async function Easy(){

        minutes = `15`;
        document.querySelector('#crono').textContent = '15:00';
        document.querySelector('#Easy').style.color= "#11f511";
        document.querySelector('#Hard').style.color= "#41b3f6";
        document.querySelector('#Medium').style.color= "#41b3f6";
        ALERTS.classList.add("hide");
    }

document.querySelector('.btn-medium').addEventListener('click', Med);
    function Med(){
        minutes = `10`;
        document.querySelector('#crono').textContent = '10:00';
        document.querySelector('#Medium').style.color= "yellow";
        document.querySelector('#Easy').style.color= "#41b3f6";
        document.querySelector('#Hard').style.color= "#41b3f6";
        ALERTS.classList.add("hide");
    }

document.querySelector('.btn-hard').addEventListener('click', Hard);
    function Hard(){
        minutes = `5`;
        
        document.querySelector('#crono').textContent = '5:00';
        document.querySelector('#Hard').style.color= "red";
        document.querySelector('#Easy').style.color= "#41b3f6";
        document.querySelector('#Medium').style.color= "#41b3f6";
        ALERTS.classList.add("hide");
    }
//////////////////////////////////////////////////////////////////////////



//**************** */ NEW GAME *****************//
document.querySelector('.btn-new').addEventListener('click', reset);
/*************************** *******************/

/*********RESET GAME*************/
function reset() {

    seg =`00` ;
    minutes = `00`;
    contCheck = 0;
    contIncorrec = 0;
    
    clearInterval(cronoCall);
    Easy()
    document.querySelector('#crono').textContent = `${minutes}:${seg}`;
    document.querySelector("#check").textContent = contCheck
    document.querySelector("#close").textContent = contIncorrec
    document.querySelector('#crono').classList.remove('incorrect')
    document.getElementById("salida").disabled = true;
    document.querySelector('.btn-play').disabled= false;
    document.querySelector('#play').textContent = 'Play'
    
    document.querySelector('.btn-hard').disabled= false;
    document.querySelector('.btn-medium').disabled= false;
    document.querySelector('.btn-easy').disabled= false;

    renderNewQuote()
    Salida.value = '';
}

/************************* Cronometrs*********************************/
function time(){
     seg --;

     //if (seg < 1) seg = `0` + seg
     
     if(seg < 0) {
         seg = `59`;
         minutes --;

         if(minutes < 10) minutes = `0` + minutes
         
     }
     
    if (minutes > 59){
         minutes = `00`;
         
        
      }    
    
    document.querySelector('#crono').textContent = `${minutes}:${seg}`;
    
    /*********GAME OVER********* */
    if(seg == `00` && minutes == `00`){
        clearInterval(cronoCall)
        document.getElementById("salida").disabled = true;
        document.querySelector('#play').textContent = 'GAME OVER'
        document.querySelector('#crono').classList.add('incorrect')     
    }
}
/*************************************************************** */

//****************NEW VALUE QUOTE**************** */
async function renderNewQuote(){
    const randomE = Math.floor(Math.random() * lista.length)
    const quote = document.querySelector('#current').textContent = lista[randomE];

    Current.innerHTML = ''
    quote.split('').forEach(character =>{
        const characterSpan = document.createElement('span')
        characterSpan.innerHTML = character
        Current.appendChild(characterSpan)
        
    })
    Salida.value = null;
}
//****************NEW VALUE QUOTE**************** */


//***** DARK MODE **************//

const switchs = document.querySelector('#master');

switchs.addEventListener('click', () => {

    document.body.classList.toggle('dark');
    switchs.classList.toggle('active');
 

})

///******************************* Close Btn **************************************** */

document.querySelector('.close-btn').addEventListener('click', function() {
        
    ALERTS.classList.add("hide");

});