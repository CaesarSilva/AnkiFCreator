# AnkiFCreator
`npm install ankifcreator`
##### Purpose
This library allows you to create Anki flash cards deck on javascript applications, it runs on the browser and also in Node.js.  
##### Usage
In this example, we will create a deck and 2 functions, one function to add cards to the deck, the other one to download the deck.
````
<script src="../dist/AnkiFCreator.umd.js"></script>
        <script>
        let deck = AnkiFCreator.NewDeck("My new deck");//deck name
        function addCard(front, back){
          deck.newCard({front: front, back: back});
        }
        async function DownloadDeck(){
            let blob = await deck.GenerateDeckFile();
            console.log(blob);
    		let tempLink = document.createElement("a");
    		tempLink.setAttribute("href", URL.createObjectURL(blob));
    		tempLink.setAttribute("download", "testdeck.apkg");
    		tempLink.click();
        }
        </script>
````
##### Requirements
You need to include the file sql-wasm.wasm(from https://github.com/sql-js/sql.js/) in the same folder as your HTML file.
##### Limitations
This library currently doesn't support adding media to the anki deck, that includes images and audio. However, embedded media seems to work, but in this case, the images are saved in an external location in the web.   
Also, html with base64 encoded images do work, but I don't recommend doing that because it will bloat the database with binary data.
The constructor of the class `deck` calls an asynchronous function, and you're not supposed to add new cards before this functions finishes executing. Usually, it takes less than a second
#### License
GPLv3