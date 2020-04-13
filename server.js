// Config servidor
const express = require('express')
const server = express()

const db = require("./db")

// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729005.svg" ,
//         title:"Exercícios",
//         category:"Saude",
//         description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo velit sint fugiat quas dolorum,",
//         url:"https://google.com.br",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg" ,
//         title:"Curso de Programacao",
//         category:"Estudo",
//         description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo velit sint fugiat quas dolorum,",
//         url:"https://google.com.br",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg" ,
//         title:"Meditação",
//         category:"Estudo",
//         description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo velit sint fugiat quas dolorum,",
//         url:"https://google.com.br",
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg" ,
//         title:"Karaoke",
//         category:"Lazer em Familia",
//         description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo velit sint fugiat quas dolorum,",
//         url:"https://google.com.br",
//     }

// ]


// configurar arquivos estaticos 
server.use(express.static("public"))

// habilitar uso do req.body
server.use(express.urlencoded({ extended:true }))

// configuracao do nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure("views", {
    express: server,
    noCache: true,

})

// Cria a rota
server.get("/",function(req,res){


    db.all(`SELECT * FROM ideas`, function(err,rows){
        if (err) return console.log(err)
        
        const reverseIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reverseIdeas){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }
    
        return res.render("index.html", {ideas: lastIdeas})
    })


})

server.get("/ideias.html",function(req,res){
    db.all(`SELECT * FROM ideas`, function(err,rows){
        if (err){
            console.log(err)
            return res.send("Erro no banco de dados!") 
           }      
        const reverseIdeas = [...rows].reverse()
        return res.render("ideias.html",{ideas: reverseIdeas})
    })
})

server.post("/", function(req,res){
    
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?)
    `
    const values = [
       req.body.image,
       req.body.title,
       req.body.category,
       req.body.description,
       req.body.link,   
   ]

   db.run(query, values, function(err){
       if (err){
        console.log(err)
        return res.send("Erro no banco de dados!") 
       }

    return res.redirect("/ideias.html")

   })
})


//Liga o Server 
server.listen(3000)