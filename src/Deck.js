import initSqlJs from "sql.js";
import JSZip from "jszip";

class Deck{
    constructor(){
        //initSqlJs().then((SQL)=>{
        //});
        this.initDb();
    }
    async initDb(){
            let SQL = await initSqlJs();
            //Create the database
            this.db = new SQL.Database();
            this.db.run(`
            CREATE TABLE cards (
                id integer PRIMARY KEY,
                nid integer NOT NULL,
                did integer NOT NULL,
                ord integer NOT NULL,
                mod integer NOT NULL,
                usn integer NOT NULL,
                type integer NOT NULL,
                queue integer NOT NULL,
                due integer NOT NULL,
                ivl integer NOT NULL,
                factor integer NOT NULL,
                reps integer NOT NULL,
                lapses integer NOT NULL,
                left integer NOT NULL,
                odue integer NOT NULL,
                odid integer NOT NULL,
                flags integer NOT NULL,
                data text NOT NULL
              );
              CREATE INDEX ix_cards_usn ON cards (usn);
              CREATE INDEX ix_cards_nid ON cards (nid);
              CREATE INDEX ix_cards_sched ON cards (did, queue, due);
                          
            `);
            this.db.run(`
            CREATE TABLE col (
                id integer PRIMARY KEY,
                crt integer NOT NULL,
                mod integer NOT NULL,
                scm integer NOT NULL,
                ver integer NOT NULL,
                dty integer NOT NULL,
                usn integer NOT NULL,
                ls integer NOT NULL,
                conf text NOT NULL,
                models text NOT NULL,
                decks text NOT NULL,
                dconf text NOT NULL,
                tags text NOT NULL
              );
              
            `);
            this.db.run(`
            CREATE TABLE graves (
                usn integer NOT NULL,
                oid integer NOT NULL,
                type integer NOT NULL
              );              
            `);
            this.db.run(`
            CREATE TABLE notes (
                id integer PRIMARY KEY,
                guid text NOT NULL,
                mid integer NOT NULL,
                mod integer NOT NULL,
                usn integer NOT NULL,
                tags text NOT NULL,
                flds text NOT NULL,
                -- The use of type integer for sfld is deliberate, because it means that integer values in this
                -- field will sort numerically.
                sfld integer NOT NULL,
                csum integer NOT NULL,
                flags integer NOT NULL,
                data text NOT NULL
              );
              CREATE INDEX ix_notes_usn ON notes (usn);
              CREATE INDEX ix_notes_csum ON notes (csum);              
            `);
            this.db.run(`
            CREATE TABLE revlog (
                id integer PRIMARY KEY,
                cid integer NOT NULL,
                usn integer NOT NULL,
                ease integer NOT NULL,
                ivl integer NOT NULL,
                lastIvl integer NOT NULL,
                factor integer NOT NULL,
                time integer NOT NULL,
                type integer NOT NULL
              );
              CREATE INDEX ix_revlog_usn ON revlog (usn);
              CREATE INDEX ix_revlog_cid ON revlog (cid);
              
            `);
            let timenow = Date.now();
            console.log("datenow"+timenow);
            let deckObj = {
                1 : {id:1,mod:0,name:"Default",usn:0,collapsed:true,browserCollapsed:true,desc:"",
            dyn:0,conf:1,extendNew:0,extendRev:0},
                [timenow] : {id:timenow,mod:0,name:"Generated Deck",usn:-1,collapsed:false,
                browserCollapsed:false,desc:"",
                dyn:0,conf:1,extendNew:0,extendRev:0}
            };
            let confObj = {};
            console.log(JSON.stringify(deckObj));


    }
    async GenerateDeckFile(){
        const binaryArray = this.db.export();
        let blobb = new Blob([binaryArray], {type : "SQLite 3.x database"});
        let zip = new JSZip();
        zip.file("collection.anki2", blobb);
        return await zip.generateAsync({type: "blob"});

    }
}
export default Deck;