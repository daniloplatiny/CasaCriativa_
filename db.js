const sqlite3 =  require("sqlite3").verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function(){

    //Criar tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS ideas(
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         title TEXT,
    //         category TEXT,
    //         description TEXT,
    //         link TEXT
    //     ); 
    //  `)
    
    //  // Inserir dados na Tabela
    //  const query = `
    //  INSERT INTO ideas(
    //      image,
    //      title,
    //      category,
    //      description,
    //      link
    //  ) VALUES (?,?,?,?,?)
    //  `
    //  const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    //     "Exercícios",
    //     "Saude",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo velit sint fugiat quas dolorum,",
    //     "https://google.com.br"
    // ]

    // db.run(query, values, function(err){
    //     if (err) return console.log(err)
    //     console.log(this)
    // })

    //  //Deletar um dado da Tabela
    //  db.run(`DELETE FROM ideas Where id=?`, [1],function(err){

    //     if (err) return console.log(err)
    //     console.log("DELETEI",this)
    // })   
     //Consultar dados na Tabela 
    db.all(`SELECT * FROM ideas`, function(err,rows){
        if (err) return console.log(err)
        console.log(rows)
    })
    
})

module.exports = db