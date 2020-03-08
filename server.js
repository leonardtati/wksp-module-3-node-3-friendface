'use strict';
const express = require('express');
const morgan = require('morgan');
const { users } = require('./data/users');
const PORT = process.env.PORT || 8000;
let currentUser = null;





const handleHome = (req, res) =>{
    if(!currentUser) {res.redirect('/signin'); return; };
// I NEEED TO PUT ALL THE INFORMATION OF EACH USER IN MY FRIENDS ARRAY
// friends [1002, 1003, 1004] = friends [id: '1002',//                             id:1003
                                         //// name: 'Scott',//                     name:Johnny
                                         ////friends: ['1007', '1008', '1009'],// friends ['1007', '1008', '1009']
                                         /////avatarUrl://                         avatarUrl://

const myFriends = currentUser.friends.map(friendsId => {
    let friendObj = undefined;
users.forEach(currentUser => {
    if(friendsId===currentUser.id){
        friendObj = currentUser;
    }
}); 
console.log(friendObj)
return friendObj;
})


res.render('pages/homepage', {title:'Welcome to FriendFace', user: currentUser, listOfFriends: myFriends });
}
const handleSign = (req, res) =>{
    if(currentUser) {res.redirect('/'); return; };
    res.render('pages/signin', {title:'Signin to FriendFace'});

    }
const handleUser = (req, res) =>{
    if(!currentUser) {res.redirect('/signin'); return; };

    const userId = req.params.id
    const friendPage = users.find(user => user.id === userId)
    const currentFriend = friendPage.friends.map(friendsId => {
        let friendObj = undefined;
    users.forEach(user => {
        if(friendsId===user.id){
            friendObj = user;
        }
    }); 
    return friendObj;
    })
    res.render('pages/friendPage', {title:'Welcome to FriendFace', user: friendPage, listOfFriends: currentFriend});
}
const handleName = (req, res) =>{
    const firstName = req.query.firstName;
    currentUser = users.find(user => user.name === firstName) || null;
    res.redirect(`${currentUser ? '/' : '/signin'}`);
}

// -----------------------------------------------------
// server endpoints

const app = express();
    app.use(morgan('dev'));
    app.use(express.static('public'));
    app.use(express.urlencoded({extended: false}));
    app.set('view engine', 'ejs');
    // endpoints

    app.get('/', handleHome)
    app.get('/signin', handleSign)
    app.get('/user/:id', handleUser)
    app.get('/getname', handleName)
    app.get

    app.get('*', (req, res) => {
        res.status(404);
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    })
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));