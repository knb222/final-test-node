/*
 * This files holds all the code to for your card game
 */

/* how to remove a image 
var el = document.getElementById('image id');
el.parentNode.removeChild(el);
*/

//const { response } = require("express");

//const express = require('express');

//Run once broswer has loaded everything
window.onload = function () {

    // Get the start modal
    var modal = document.getElementById("myModal");
    // get the player win modal
    var modal2 = document.getElementById("myModal2");
    // get the dealer win modal
    var modal3 = document.getElementById("myModal3");

    modal.style.display = "block";

    console.log('HI')

    var playerhand=[];
    var dealerhand=[];

    var playerscore=0;
    var dealerscore=0;

    //good need modals
    //button event for deal
    document.getElementById("deal").addEventListener("click",function(e){
        console.log('deal')
        modal.style.display = "none";

        playerhand=[];
        dealerhand=[];

        playerscore=0;
        dealerscore=0;

        //how to shuffle the cards need to get id to pass to the deck stuff below    
        deckprom=fetch("http://deckofcardsapi.com/api/deck/new/draw/?count=4").then(response => response.json());

        
        async function resolveprom() {
              const deck = await deckprom;
              console.log(deck); 

              deckid=deck.deck_id;

              console.log(deck)
      
              console.log(deck)
      
              //adding the cards to the players hand
              playerhand.push(deck.cards.slice(2,4));
              
              //adding the cards to the dealers hand
              dealerhand.push(deck.cards.slice(0,2));    
      
              //calculating the players score
              for(i=0;i<=playerhand.length;i++){
                crdval=playerhand[0][i].value;
                console.log(crdval)
                //if card is a face value card then add 10
                if(crdval.includes('QUEEN') | crdval.includes('KING') || crdval.includes('JACK')){
                playerscore=playerscore+10;
                console.log('add 10')
                }
                //if the card is an ace then see if need to be 11 or 1 depending on final hand value
                else if(crdval.includes('ACE'))
                {
                    if(playerscore+11>21){
                    playerscore=playerscore+1;
                    console.log('add 1')
                    }
                    else{
                    playerscore=playerscore+11;
                    console.log('add 11')
                    }
                }
                //if not face card or ace then convert string of value and add to total value of player hand
                else{
                playerscore=parseInt(crdval)+playerscore;
                console.log('add crdval')
                }
              }
      
              //if player score is 21 then they win
              if(playerscore==21){
                //showing the dealer cards
                document.getElementById("d0").src = dealerhand[0][0].image
                document.getElementById("d0").style = 'opacity: 1'
                
                document.getElementById("myModal2").p = "Player Wins"
                modal2.style.display = "block";
              }
      
              //calculating the dealers score
              for(i=0;i<=dealerhand.length;i++){
                  crdval=dealerhand[0][i].value;
                  console.log(crdval)
                  //if card is a face value card then add 10
                  if(crdval.includes('QUEEN') | crdval.includes('KING') || crdval.includes('JACK')){
                    dealerscore=dealerscore+10;
                    console.log('add 10')
                  }
                  //if the card is an ace then see if need to be 11 or 1 depending on final hand value
                  else if(crdval.includes('ACE'))
                  {
                      if(dealerscore+11>21){
                        dealerscore=dealerscore+1;
                        console.log('add 1')
                      }
                      else{
                        dealerscore=dealerscore+11;
                        console.log('add 11')
                      }
                  }
                  //if not face card or ace then convert string of value and add to total value of dealer hand
                  else{
                    dealerscore=parseInt(crdval)+dealerscore;
                    console.log('add crdval')
                  }
              }
      
              //if dealer has 21 then they win
              if(dealerscore==21){
                //showing the dealer cards
                document.getElementById("d0").src = dealerhand[0][0].image
                document.getElementById("d0").style = 'opacity: 1'
                
                modal3.style.display = "block";
              }
      
              //update the player score
              document.getElementById("playerscore").innerHTML = "Player Score: "+playerscore;

              //update the dealer score
              //document.getElementById("dealerscore").innerHTML = "Dealer Score: "+dealerscore;

              //show dealer 1 card, other back of card
            document.getElementById("d1").src = dealerhand[0][1].image
            document.getElementById("d1").style = "opacity: 1"

            document.getElementById("d0").src = "https://thumbs.dreamstime.com/b/playing-card-back-side-isolated-white-clipping-path-included-playing-card-back-side-isolated-white-172500899.jpg"
            document.getElementById("d0").style = "opacity: 1"

              
            //show both player cards
            document.getElementById("p0").src = playerhand[0][0].image
            document.getElementById("p1").src = playerhand[0][1].image
            document.getElementById("p1").style = "opacity: 1"
            document.getElementById("p0").style = "opacity: 1"

            console.log("player score: " + playerscore)
            console.log("dealer score: " + dealerscore)

            console.log('dealer cards are: '+dealerhand[0][0].value + ' and ' +dealerhand[0][1].value)
            console.log('player cards are: '+playerhand[0][0].value + ' and ' +playerhand[0][1].value)  
          }
        
        resolveprom();
    },false);


    //good need modals
    //button event for hit me
    document.getElementById("hitme").addEventListener("click",function(e){
        
        console.log("hit me")    
        console.log('the player score is: '+playerscore)


        //draw cards
        cardprom=fetch("http://deckofcardsapi.com/api/deck/"+deckid+"/draw/?count=1").then(response => response.json()); 

        async function resolveprom() {
            
            //resolving the promise
            const card = await cardprom;
            console.log(card); 
                       
            //adding card to hand
            playerhand[0].push(card.cards[0])

            //adding the card to the players score
            crdval=card.cards[0].value;
            console.log(crdval)
            //if card is a face value card then add 10
            if(crdval.includes('QUEEN') | crdval.includes('KING') || crdval.includes('JACK')){
                playerscore=playerscore+10;
                console.log('add 10')
            }
            //if the card is an ace then see if need to be 11 or 1 depending on final hand value
            else if(crdval.includes('ACE'))
            {
                if(playerscore+11>21){
                    playerscore=playerscore+1;
                    console.log('add 1')
                }
                else{
                    playerscore=playerscore+11;
                    console.log('add 11')
                }
            }
            //if not face card or ace then convert string of value and add to total value of player hand
            else{
                playerscore=parseInt(crdval)+playerscore;
                console.log('add ' + crdval)
            }
            
            //if player has 21 then they win
            if(playerscore==21){
                //showing the dealer cards
                document.getElementById("d0").src = dealerhand[0][0].image
                document.getElementById("d0").style = 'opacity: 1'

                modal2.style.display = "block";
            }

            //if play goes over 22 they bust and lose
            if(playerscore>21){
                //showing the dealer cards
                document.getElementById("d0").src = dealerhand[0][0].image
                document.getElementById("d0").style = 'opacity: 1'

                console.log('did i do it right?')
                //document.getElementById("modal2-content").innerHTML = "<p>Dealer Wins</p>"
                modal3.style.display = "block";
            }

            //update player score
            document.getElementById("playerscore").innerHTML = "Player Score: "+playerscore;

            //place to update
            console.log('player hand')
            console.log(playerhand)
            console.log('dealer hand')
            console.log(dealerhand)

            upspot=playerhand[0].length-1;
            document.getElementById("p"+upspot).src = playerhand[0][upspot].image
            document.getElementById("p"+upspot).style = 'opacity: 1'
        }

        resolveprom();
        
    },false);
    
    //good need modals
    //button event for Stay
    document.getElementById("stay").addEventListener("click",function(e){
        
        console.log("Staying")   
        console.log("dealer score is: "+dealerscore) 

        //show dealer 1 card
        document.getElementById("d0").src = dealerhand[0][0].image

        //draw cards
        cardprom=fetch("http://deckofcardsapi.com/api/deck/"+deckid+"/draw/?count=1").then(response => response.json());

        async function resolveprom() {
             
            console.log("dealer score is: "+dealerscore) 

            //resolving the promise
            const card = await cardprom;

            console.log(card)
                   
            //adding card to hand
            dealerhand[0].push(card.cards[0])

            //adding card value to dealer score
            crdval=card.cards[0].value;
            console.log(crdval)
            //if card is a face value card then add 10
            if(crdval.includes('QUEEN') | crdval.includes('KING') || crdval.includes('JACK')){
                dealerscore=dealerscore+10;
                console.log('add 10')
            }
            //if the card is an ace then see if need to be 11 or 1 depending on final hand value
            else if(crdval.includes('ACE'))
            {
                if(dealerhand+11>21){
                    dealerscore=dealerscore+1;
                    console.log('add 1')
                }
                else{
                    dealerscore=dealerscore+11;
                    console.log('add 11')
                }
            }
            //if not face card or ace then convert string of value and add to total value of player hand
            else{
                dealerscore=parseInt(crdval)+dealerscore;
                console.log('add ' + crdval)
            }
            
            //updating player score
            document.getElementById("playerscore").innerHTML = "Player Score: "+playerscore;
            
            //updateing dealer score
            document.getElementById("dealerscore").innerHTML = "Dealer Score: "+dealerscore;

            //if dealer is 21 then they win
            if(dealerscore==21){
                modal3.style.display = "block";
            }

            //if dealer score over 21 then they bust and lose
            if(dealerscore>21){
                modal2.style.display = "block";
            }

            console.log('above if')

            //showing the cards
            upspot=dealerhand[0].length-1;
            document.getElementById("d"+upspot).src = dealerhand[0][upspot].image
            document.getElementById("d"+upspot).style = 'opacity: 1'
            
            //if dealer scire below 17 then draw another card
            if(dealerscore<17){
                console.log('in the if')
                cardprom=fetch("http://deckofcardsapi.com/api/deck/"+deckid+"/draw/?count=1").then(response => response.json());
                resolveprom();
            }
        }

        //updateing dealer score
        document.getElementById("dealerscore").innerHTML = "Dealer Score: "+dealerscore;

        //if initial hand is under 17 then draw a card
        if(dealerscore<17){
            resolveprom();
        }

        console.log('dealer done')

        

        //if player score higher than dealer than player wins
        if(playerscore>dealerscore){
            modal2.style.display = "block";
        }
        //if dealer score is higher then dealer wins
        else if (playerscore<dealerscore){
            modal3.style.display = "block";
        }
        //if the scores are equal then it is a tie
        else{
            modal3.style.display = "block";
        }

    },false);

    //good need modals
    //button event for play again
    document.getElementById("playagain").addEventListener("click",function(e){
        console.log('play again')
        
        playerhand=[];
        dealerhand=[];

        playerscore=0;
        dealerscore=0;

        //close the models
        modal2.style.display = "none";

        for (upspot=0;upspot<9;upspot++){
            document.getElementById("d"+upspot).style = 'opacity: 0'
            document.getElementById("p"+upspot).style = 'opacity: 0'
        }

        //how to shuffle the cards need to get id to pass to the deck stuff below    
        deckprom=fetch("http://deckofcardsapi.com/api/deck/new/draw/?count=4").then(response => response.json());

        
        async function resolveprom() {
            //resolve promise
            const deck = await deckprom;
            console.log(deck); 

            deckid=deck.deck_id;

            console.log(deck)
    
            console.log(deck)
    
            //adding the cards to the players hand
            playerhand.push(deck.cards.slice(2,4));
            
            //adding the cards to the dealers hand
            dealerhand.push(deck.cards.slice(0,2));    
    
            //calculating the players score
            for(i=0;i<=playerhand.length;i++){
            crdval=playerhand[0][i].value;
            console.log(crdval)
            //if face card add 10
            if(crdval.includes('QUEEN') | crdval.includes('KING') || crdval.includes('JACK')){
            playerscore=playerscore+10;
            console.log('add 10')
            }
            //if ace add 11 or 1 based on hand count
            else if(crdval.includes('ACE'))
            {
                if(playerscore+11>21){
                playerscore=playerscore+1;
                console.log('add 1')
                }
                else{
                playerscore=playerscore+11;
                console.log('add 11')
                }
            }
            //if not face card or ace then add the value of card
            else{
            playerscore=parseInt(crdval)+playerscore;
            console.log('add crdval')
            }
            }
    
            //if player score is 21 they win
            if(playerscore==21){
                modal2.style.display = "block";
            }
    

            //calculating the dealers score
            for(i=0;i<=dealerhand.length;i++){
                crdval=dealerhand[0][i].value;
                console.log(crdval)
                //if face card add 10
                if(crdval.includes('QUEEN') | crdval.includes('KING') || crdval.includes('JACK')){
                dealerscore=dealerscore+10;
                console.log('add 10')
                }
                //if ace add 11 or 1 based on hand count
                else if(crdval.includes('ACE'))
                {
                    if(dealerscore+11>21){
                    dealerscore=dealerscore+1;
                    console.log('add 1')
                    }
                    else{
                    dealerscore=dealerscore+11;
                    console.log('add 11')
                    }
                }
                //if not face card or ace then add the value of card
                else{
                dealerscore=parseInt(crdval)+dealerscore;
                console.log('add crdval')
                }
            }
    
            //if dealer has 21 then they win
            if(dealerscore==21){
                //showing the dealer cards
                document.getElementById("d0").src = dealerhand[0][0].image
                document.getElementById("d0").style = 'opacity: 1'

                modal2.style.display = "block";
            }
    
            //update player score
            document.getElementById("playerscore").innerHTML = "Player Score: "+playerscore;

            //update dealer score
            document.getElementById("dealerscore").innerHTML = " ";

            console.log("player score: " + playerscore)
            console.log("dealer score: " + dealerscore)

            console.log('dealer cards are: '+dealerhand[0][0].value + ' and ' +dealerhand[0][1].value)
            console.log('player cards are: '+playerhand[0][0].value + ' and ' +playerhand[0][1].value)

            //show dealer 1 card, other back of card
            document.getElementById("d1").src = dealerhand[0][1].image
            document.getElementById("d1").style = "opacity: 1"

            document.getElementById("d0").src = "https://thumbs.dreamstime.com/b/playing-card-back-side-isolated-white-clipping-path-included-playing-card-back-side-isolated-white-172500899.jpg"
            document.getElementById("d0").style = "opacity: 1"

              
            //show both player cards
            document.getElementById("p0").src = playerhand[0][0].image
            document.getElementById("p1").src = playerhand[0][1].image
            document.getElementById("p1").style = "opacity: 1"
            document.getElementById("p0").style = "opacity: 1"

        }
        
        resolveprom();
    
    },false);

    //good need modals
    //button event for play again
    document.getElementById("playagain2").addEventListener("click",function(e){
        console.log('play again')

        modal3.style.display = "none";
        
        playerhand=[];
        dealerhand=[];

        playerscore=0;
        dealerscore=0;

        //close the models
        modal2.style.display = "none";

        for (upspot=0;upspot<9;upspot++){
            document.getElementById("d"+upspot).style = 'opacity: 0'
            document.getElementById("p"+upspot).style = 'opacity: 0'
        }

        //how to shuffle the cards need to get id to pass to the deck stuff below    
        deckprom=fetch("http://deckofcardsapi.com/api/deck/new/draw/?count=4").then(response => response.json());

        
        async function resolveprom() {
            //resolve promise
            const deck = await deckprom;
            console.log(deck); 

            deckid=deck.deck_id;

            console.log(deck)
    
            console.log(deck)
    
            //adding the cards to the players hand
            playerhand.push(deck.cards.slice(2,4));
            
            //adding the cards to the dealers hand
            dealerhand.push(deck.cards.slice(0,2));    
    
            //calculating the players score
            for(i=0;i<=playerhand.length;i++){
            crdval=playerhand[0][i].value;
            console.log(crdval)
            //if face card add 10
            if(crdval.includes('QUEEN') | crdval.includes('KING') || crdval.includes('JACK')){
            playerscore=playerscore+10;
            console.log('add 10')
            }
            //if ace add 11 or 1 based on hand count
            else if(crdval.includes('ACE'))
            {
                if(playerscore+11>21){
                playerscore=playerscore+1;
                console.log('add 1')
                }
                else{
                playerscore=playerscore+11;
                console.log('add 11')
                }
            }
            //if not face card or ace then add the value of card
            else{
            playerscore=parseInt(crdval)+playerscore;
            console.log('add crdval')
            }
            }
    
            //if player score is 21 they win
            if(playerscore==21){
                //showing the dealer cards
                document.getElementById("d0").src = dealerhand[0][0].image
                document.getElementById("d0").style = 'opacity: 1'

                modal2.style.display = "block";
            }
    

            //calculating the dealers score
            for(i=0;i<=dealerhand.length;i++){
                crdval=dealerhand[0][i].value;
                console.log(crdval)
                //if face card add 10
                if(crdval.includes('QUEEN') | crdval.includes('KING') || crdval.includes('JACK')){
                dealerscore=dealerscore+10;
                console.log('add 10')
                }
                //if ace add 11 or 1 based on hand count
                else if(crdval.includes('ACE'))
                {
                    if(dealerscore+11>21){
                    dealerscore=dealerscore+1;
                    console.log('add 1')
                    }
                    else{
                    dealerscore=dealerscore+11;
                    console.log('add 11')
                    }
                }
                //if not face card or ace then add the value of card
                else{
                dealerscore=parseInt(crdval)+dealerscore;
                console.log('add crdval')
                }
            }
    
            //if dealer has 21 then they win
            if(dealerscore==21){
                //showing the dealer cards
                document.getElementById("d0").src = dealerhand[0][0].image
                document.getElementById("d0").style = 'opacity: 1'

                modal3.style.display = "block";
            }
    
            //update player score
            document.getElementById("playerscore").innerHTML = "Player Score: "+playerscore;

            //update dealer score
            document.getElementById("dealerscore").innerHTML = "";

            console.log("player score: " + playerscore)
            console.log("dealer score: " + dealerscore)

            console.log('dealer cards are: '+dealerhand[0][0].value + ' and ' +dealerhand[0][1].value)
            console.log('player cards are: '+playerhand[0][0].value + ' and ' +playerhand[0][1].value)

            //show dealer 1 card, other back of card
            document.getElementById("d1").src = dealerhand[0][1].image
            document.getElementById("d1").style = "opacity: 1"

            document.getElementById("d0").src = "https://thumbs.dreamstime.com/b/playing-card-back-side-isolated-white-clipping-path-included-playing-card-back-side-isolated-white-172500899.jpg"
            document.getElementById("d0").style = "opacity: 1"

              
            //show both player cards
            document.getElementById("p0").src = playerhand[0][0].image
            document.getElementById("p1").src = playerhand[0][1].image
            document.getElementById("p1").style = "opacity: 1"
            document.getElementById("p0").style = "opacity: 1"

        }
        
        resolveprom();
    
    },false);
};