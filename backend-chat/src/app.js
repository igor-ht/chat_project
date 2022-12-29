"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mockMessages_1 = require("./chat/mockMessages");
const mockUserDetails_1 = require("./chat/mockUserDetails");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
app.get('/', (req, res) => {
    res.send('hello there');
});
app.get('/mockMessages', (req, res) => {
    const mockMessagesWithNames = mockMessages_1.mockMessages.map((message) => {
        const author = mockUserDetails_1.mockUserDetails.find(user => user.id === message.authorId);
        const authorName = author && author.name;
        return Object.assign(Object.assign({}, message), { authorName });
    });
    res.send(mockMessagesWithNames);
});
app.post('/addNewMessage', (req, res) => {
    var _a;
    const msg = req.body;
    msg.likes = [];
    msg.authorName = (_a = mockUserDetails_1.mockUserDetails[msg.authorId]) === null || _a === void 0 ? void 0 : _a.name;
    try {
        mockMessages_1.mockMessages.push(msg);
        res.send({ message: "Message succesfully received." });
        res.status(200);
    }
    catch (e) {
        console.log(e);
        res.send({ message: "Server couldn`t save the message. Try again later." });
        res.status(500);
    }
});
app.post('/handleLike', (req, res) => {
    const msg = req.body;
    try {
        if (msg.like === false) {
            mockMessages_1.mockMessages.forEach(message => {
                if (message.id === msg.messageId) {
                    message.likes.push(msg.userId);
                }
            });
        }
        else {
            mockMessages_1.mockMessages.forEach(message => {
                if (message.id === msg.messageId) {
                    message.likes = message.likes.filter(id => +id !== +msg.userId);
                }
            });
        }
        res.status(200);
        res.send('Handle Input succesfully updated');
    }
    catch (e) {
        res.send(e);
        res.status(500);
    }
});
app.get('/mockUsers', (req, res) => {
    res.send(mockUserDetails_1.mockUserDetails);
});
app.get('/mockUsers/:id', (req, res) => {
    res.send(mockUserDetails_1.mockUserDetails.filter(user => {
        if (user.id === +req.params.id) {
            return true;
        }
    }));
});
app.listen(3000, () => console.log('server 3000 listening'));
