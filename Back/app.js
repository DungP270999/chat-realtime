require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const port = 8888;

// Gửi yêu cầu phân tích kiểu nội dung application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Gửi yêu cầu phân tích kiểu nội dung application/json
app.use(bodyParser.json());

app.use(cors());
//import routes
const routes = require('./routes/route');
app.use('/api/v1', routes);

//socket.io
io.on('connection', (socket) => {
    console.log(`${socket.id} đã kết nối`);
});

// Lắng nghe các requests
server.listen(port, function () {
    console.log("Server listening port:", port)
});

