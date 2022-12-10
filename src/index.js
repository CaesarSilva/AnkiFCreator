//const initSqlJs = require('sql-wasm.js');
import initSqlJs from "sql.js";
import JSZip from "jszip";
import Deck from "./Deck.js";
export const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);
export async function testdb(){
    //const db = new SQL.Database();
    let SQL = await initSqlJs();
        // Load the db
        const db = new SQL.Database();
    let sqlstr = "CREATE TABLE hello (a int, b char); \
    INSERT INTO hello VALUES (0, 'hello'); \
    INSERT INTO hello VALUES (1, 'world');";
    db.run(sqlstr);
    const binaryArray = db.export();
    let blobb = new Blob([binaryArray], {type : "SQLite 3.x database"});
    let zip = new JSZip();
    zip.file("stuff.weird", blobb);
    return await zip.generateAsync({type: "blob"});
}
export function NewDeck(deckName, configObj = {}){
    return new Deck(deckName, configObj);
}