const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(`Response from Server at port ${port} please visit : localhost:${port}/git/<b>userid</b>`);
})

app.get("/git/:user", (req, res) => {
    const userid = req.params.user;
    const github_user_url = `https://api.github.com/users/${userid}`;
    fetch(github_user_url)
        .then(response => response.json())
        .then(json => {
            if (json.message == "Not Found") {
                res.send("Please verify whether an user actually exists by that username, github responded us with : <hr>" + JSON.stringify(json) + "<hr>");
            } else {
                res.send(json);
            }
        });
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})