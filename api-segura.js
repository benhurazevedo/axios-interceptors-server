const http = require('http');
const express = require('express');
const app = express();

app.use(require("cors")());
app.use(express.json());
 
app.get('/auth', (req, res, next) => {
    res.json({token: "123"})
});
 
app.get('/', (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === "123") {
        res.locals.token = token;
        return next();
    }
    res.status(401).json('Unauthorized');
}, (req, res, next) => {
    res.json({ message: "Tudo ok por aqui!" });
})
 
 
const server = http.createServer(app);
server.listen(process.env.PORT || 3001);
console.log(`Servidor escutando na porta ${process.env.PORT || 3001}...`)