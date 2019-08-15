require('dotenv').config()

const axios = require('axios');
const chalk = require('chalk');

console.log(chalk.blue('Starting.'));
console.log(chalk.blue('Targeting : ' + process.env.TARGET_LOGIN));
console.log(chalk.blue('Please wait..'));

axios.get('http://ladder-fou.herokuapp.com/users')
    .then(function (response) 
    {
        const users = response.data.filter(function (user) { return user !== null });
        const target = users.filter(function (user) { return user.user.login == process.env.TARGET_LOGIN })[0];
        const position = users.findIndex(i => i.user.login == process.env.TARGET_LOGIN);
        
        console.log(chalk.blue('Position of ' + process.env.TARGET_LOGIN + ' is ' + position));
    })
    .catch(function (error) {
        console.log('Failed to fetch from API...' + error);
    })