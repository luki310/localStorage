(function () {

    function DBSaver (db) {
        this.db = db;
        this.fields = this.db.querySelectorAll("input[name]");
        this.dbID = this.db.getAttribute("id");
        this.dbSuffix = null;
        this.dbVal = {};

        this.db.onsubmit = this.addSaveToDB.bind(this);
    }

    DBSaver.prototype.addSaveToDB = function(e){
        e.preventDefault();

        this.dbSuffix = this.fields[0].value;

        for(var i = 0; i < this.fields.length; i++){
            this.dbVal[this.fields[i].getAttribute("name")] = this.fields[i].value;
            this.fields[i].value = "";
        }

        this.saveToLocalStorage();
    };

    DBSaver.prototype.saveToLocalStorage = function(){
        window.localStorage.setItem(( this.dbID + "." + this.dbSuffix ), JSON.stringify(this.dbVal));
        info.textContent = "Poprawnie zapisano w bazie danych";
        this.loadDBValues();
    };

    DBSaver.prototype.loadDBValues = function() {

        var savedDB = window.localStorage[( this.dbID + "." + this.dbSuffix )];

        if(savedDB) {
            var dc = document.createDocumentFragment(),
                h5 = document.createElement("h5");

            h5.innerHTML = "----" + ( this.dbID + "." + this.dbSuffix ) + "----";;
            dc.appendChild(h5);

            savedDB = JSON.parse(savedDB);
            for(var key in savedDB) {
                var p = document.createElement("p");

                p.innerHTML = "<b>" + key + " : </b>" + savedDB[key];
                dc.appendChild(p);
                // console.log(key + " - " +savedDB[key]);

            }

            document.querySelector(".resolt").appendChild(dc);
        }
    };

    var output = document.querySelector("#output"),
        info = document.createElement("span");
        info.classList.add("list-group-item");

    if(typeof Storage === "function") {
        info.classList.add("list-group-item-success");
        info.textContent = "Wykryto wsparcie dla Web Storage";

        var dbToSave = new DBSaver(document.querySelector("#db"));

    } else {
        info.classList.add("list-group-item-danger");
        info.textContent = "Brak wsparcia dla Web Storage";
    }

    output.appendChild(info);



})();