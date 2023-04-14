const express = require('express');
const app = express();
const cors = require('cors');
const Ken = require('ken32');

app.use(express.static('scr'));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let saveArray = [];

app.get('/save/Encryption/:value', (req, res) => {
    req.params.key = Math.floor(Math.random() * 100000 + (Math.random() * 100 + 1000));
    result = Ken.Encryption(req.params?.value, req.params?.key);
    res.json({result: result, key:random});
    return;
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/scr/html/index.html')
})

app.get('/Encryption/:value/:key', (req, res) => {
    if(req.params?.key == 'random'){
        var random = Math.floor(Math.random() * 100000 + (Math.random() * 100 + 1000));
        req.params.key = random;
        result = Ken.Encryption(req.params?.value, req.params?.key);
        res.json({result: result, key:random});
        return;
    }
    result = Ken.Encryption(req.params?.value, req.params?.key);
    res.json({result: result});
})

app.get('/Decryption/:value/:key', (req, res) => {
    result = Ken.Decryption(req.params?.value, req.params?.key);
    res.json({result: result});
})
    
app.post('/value', (req, res, next) => {
    var result;

    if(req.body?.button == '암호화'){
        result = Ken.Encryption(req.body.value, req.body.key);
    }else if(req.body?.button == '복호화'){
        result = Ken.Decryption(req.body.value, req.body.key);
    }
    res.send(result +`</br></br>혹시 위에 값이 이상하게 나오나요? 키값이 다르거나 복호화는 암호화된 값을 넣어야 작동이 된답니다!</br><input type="button" value ="뒤로가기" onClick="location.href='/'"/>`);
})


const server = app.listen(3000, () => {
    console.log(`Server Started. port : 3000`)
});
