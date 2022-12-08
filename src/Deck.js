import initSqlJs from "sql.js";
import JSZip from "jszip";
import sha1 from "js-sha1"


class Deck{
    constructor(){
        //initSqlJs().then((SQL)=>{
        //});
        this.db;
        this.deckid;
        this.media = {};
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
            this.deckid = timenow+50;
            console.log("datenow"+timenow);
            let deckObj = {
                1 : {id:1,mod:0,name:"Defaultty",usn:0,collapsed:true,browserCollapsed:true,desc:"",
            dyn:0,conf:1,extendNew:0,extendRev:0,newToday:[0,0],revToday:[0,0],lrnToday:[0,0],timeToday:[0,0]},
                [this.deckid] : {id:timenow,mod:0,name:"Generated Deck",usn:-1,collapsed:false,
                browserCollapsed:false,desc:"",
                dyn:0,conf:1,extendNew:0,extendRev:0,newToday:[0,0],revToday:[0,0],lrnToday:[0,0],timeToday:[0,0]}
            };
            let confObj = {};
            //TODO: FIND if conf or dconf is causing the issues
            console.log(JSON.stringify(deckObj));
            let dConfObg = {};
            let modelsObj = {1592961957962:{css:".card { font-family: arial; font-size: 20px; text-align: center; color: black; background-color: white; }",
            did:this.deckid,
            flds: [
              {name: "Front", ord:0, sticky:false, rtl:false,font:"Arial",size:20,description:""},
              {name: "Back", ord:1, sticky:false, rtl:false,font:"Arial",size:20,description:""}//error here
            ], id: 1592961957962, latexPost:"\\end{document}",
            latexPre: "\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n",
            mod: Math.floor(timenow/1000),
            name: "Basic-672e3",
            req: [[0,"any",[0]]], sortf:0, tags: [],tmpls: [{
              name:"Card 1", ord: 0, qfmt: "{{Front}}",
              afmt: "{{FrontSide}} <hr id=answer> {{Back}}",
              bqfmt: "", bafmt: "", did: null, bfont: "", bsize:0
            }],
            type: 0, usn: -1, vers: []

            }};
            console.log("\n\n\n"+JSON.stringify(modelsObj)+"\n\n");
            //let testModel = `{"1592961957951":{"id":1592961957951,"name":"Basic-672e3","type":0,"mod":1658111204,"usn":-1,"sortf":0,"did":1615428771302,"tmpls":[{"name":"Card 1","ord":0,"qfmt":"{{Front}}","afmt":"{{FrontSide}}\n\n<hr id=answer>\n\n{{Back}}","bqfmt":"","bafmt":"","did":null,"bfont":"","bsize":0}],"flds":[{"name":"Front","ord":0,"sticky":false,"rtl":false,"font":"Arial","size":20,"description":"","media":[]},{"name":"Back","ord":1,"sticky":false,"rtl":false,"font":"Arial","size":20,"description":"","media":[]}],"css":".card {\n font-family: arial;\n font-size: 20px;\n text-align: center;\n color: black;\n background-color: white;\n}\n","latexPre":"\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n","latexPost":"\\end{document}","latexsvg":false,"req":[[0,"any",[0]]],"vers":[],"tags":[]},"1670338649603":{"id":1670338649603,"name":"Basic","type":0,"mod":0,"usn":0,"sortf":0,"did":null,"tmpls":[{"name":"Card 1","ord":0,"qfmt":"{{Front}}","afmt":"{{FrontSide}}\n\n<hr id=answer>\n\n{{Back}}","bqfmt":"","bafmt":"","did":null,"bfont":"","bsize":0}],"flds":[{"name":"Front","ord":0,"sticky":false,"rtl":false,"font":"Arial","size":20,"description":""},{"name":"Back","ord":1,"sticky":false,"rtl":false,"font":"Arial","size":20,"description":""}],"css":".card {\n    font-family: arial;\n    font-size: 20px;\n    text-align: center;\n    color: black;\n    background-color: white;\n}\n","latexPre":"\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n","latexPost":"\\end{document}","latexsvg":false,"req":[[0,"any",[0]]]}}`;
            
            this.db.run("INSERT INTO col VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", 
            [523534,Math.floor(timenow/1000),timenow,//id, creation in seconds, last modified in ms
            timenow,11,0,0,0,//schema, version,dty,usn,ls
            JSON.stringify(confObj),JSON.stringify(modelsObj),JSON.stringify(deckObj),//conf,models,decks
            JSON.stringify(dConfObg), "{}" //dconf and tags

            ]);
            this.newCard({front: "sfront"+timenow, back: "xxback"+timenow});
            this.newCard({front: "sfs2ront"+timenow, back: "xxbac3k"+timenow});
            this.newCard({front: "sf2rondt"+timenow, back: "xxbac33k"+timenow});
            this.newCard({front: "sf2rdonat"+timenow, back: "xxbfac3k"+timenow});

    }
    newCard(cardData){
      let timenow = Date.now();
      console.log("newCardTimeNow:"+timenow)
      let guid = sha1.hex(cardData.front).slice(5,15);
      //id,guid,mid,mod,usn,tags,flds,sfld,csum,flags,data
      let ShaNum = Number("0x"+sha1.hex(cardData.back));
      console.log("0x"+sha1.hex(cardData.back));
      console.log("ShaNum:"+ShaNum)
      let ShaStr = ShaNum.toString();
      console.log("ShaStr:"+ShaStr);
      let csum = Number(ShaStr.slice(0,11))*1000000000;
      console.log(csum);
      this.db.run("INSERT INTO notes VALUES (?,?,?,?,?,?,?,?,?,?,?)",[
        timenow, guid, 1592961957962, Math.floor(timenow/1000),-1,"",(cardData.front+""+cardData.back),cardData.front,
        csum,0,""
      ]);

      this.db.run("INSERT INTO cards VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [timenow,timenow, this.deckid, 0, Math.floor(timenow/1000),
       -1, 0,0, 0,0,0,0,0,0,0,0,0,"{}"
      ]);
    }
    async GenerateDeckFile(){
        const binaryArray = this.db.export();
        let blobb = new Blob([binaryArray], {type : "SQLite 3.x database"});
        let zip = new JSZip();
        zip.file("collection.anki2", blobb);
        zip.file("media",JSON.stringify(this.media));
        return await zip.generateAsync({type: "blob"});

    }
}
export default Deck;