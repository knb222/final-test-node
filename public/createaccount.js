window.onload = function () {

    document.getElementById("CAsubmit").addEventListener("click",function(e){ 
        console.log("form submitted")

        //gran the current form in the HTML document
        var form = document.querySelector("form");

        //data given by the user
        username = form.elements.User.value;
        password = form.elements.Pass.value;
        NSFW = document.getElementsByName('NSFW');

        //checking that all fields are filled out
        if(username=="" || password == ""){
            document.getElementById("inval").style = "color:red; opacity:1"
        }

        else{
            //if yes checked
            if(NSFW[0].checked){
                window.location.href = "ChuckNoShirt.html";

            }
            else if (NSFW[1].checked){ 
                window.location.href = "ChuckShirt.html";
            }

            else{
                document.getElementById("inval").style = "color:red; opacity:1"
            }
        }
    })

}