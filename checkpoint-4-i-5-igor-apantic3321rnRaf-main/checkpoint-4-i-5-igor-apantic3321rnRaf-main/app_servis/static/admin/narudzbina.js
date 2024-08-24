window.addEventListener("load", function () {
    this.window.dodajJelo = function (id, kolicina){   
        document.getElementById("spisakJela").selectedIndex = 0;
        console.log("Select Dropdown Options:", document.getElementById("spisakJela").innerHTML);
        var naziv = document.querySelector(`#spisakJela > option[value='${id}']`).innerHTML;
        var span = document.createElement("span");
        span.classList.add("badge");
        span.classList.add("bg-secondary");
        span.dataset.id = id;
        span.dataset.kolicina = kolicina;
        span.innerHTML = naziv + ' ' + kolicina;
        console.log("Kliknuo si +");
        var button = document.createElement("button");
        button.type="button";
        button.classList.add("btn");
        button.classList.add("btn-default");
        button.classList.add("btn-sm");
        button.innerHTML = "X";
        
        span.appendChild(button);
        document.getElementById("stavka").appendChild(span);
        document.getElementById("stavka").appendChild(document.createTextNode(" "));
        button.addEventListener("click", function(){    
            var id = this.parentNode.dataset.id;
            this.parentNode.parentNode.removeChild( this.parentNode );
            document.querySelector(`#spisakJela > option[value='${id}']`).disabled = false;

            var spanovi = document.querySelectorAll("#stavka > span.badge");
            var niz = Array.from(spanovi).map(span => ({
                id: span.dataset.id,
                kolicina: span.dataset.kolicina
            }));
            var nizJSON = JSON.stringify(niz);
            console.log(nizJSON);
            document.getElementById('sastojci-input').value = nizJSON;
        });
        var spanovi = document.querySelectorAll("#stavka > span.badge");
        var niz = [];
        for(let i=0; i<spanovi.length; i++){
            niz.push(spanovi[i].dataset.id);
         }
         var nizJSON = JSON.stringify(niz);
         document.getElementById('jela-input').value = nizJSON;
    }

    
    document.getElementById("dodajJelo").addEventListener("click", function(){
        var id = document.getElementById("spisakJela").value;
        var kolicina = document.getElementById("kolicina").value;
        if(!id){
            alert("Izaberi sastojak");
            return;
        }
        dodajJelo( id, kolicina );
    });

});

