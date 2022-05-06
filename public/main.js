window.onload = function () {

    document.getElementById("Lsubmit").addEventListener("click",function(e){ 

        //gran the current form in the HTML document
        var form = document.querySelector("form");

        //data given by the user
        username = form.elements.User.value;
        password = form.elements.Pass.value;

        //async function resolveprom() {
        //    const user= await userprom;
            x=1 //if 200 good if 400 bad
            //if user and pass match in the database
            if(username=="bob" && password=="1234"){
                window.location.href = "ChuckShirt.html";
            }
            else{
                document.getElementById("inval").style = "color:red; opacity:1"
            }
      //  }
    //    resolveprom();
    })

}