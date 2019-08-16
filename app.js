/* ************************************************************************** */
/*                                                          LE - /            */
/*                                                              /             */
/*   app.js                                           .::    .:/ .      .::   */
/*                                                 +:+:+   +:    +:  +:+:+    */
/*   By: Snkh <inquiries@snkh.me>                   +:+   +:    +:    +:+     */
/*                                                 #+#   #+    #+    #+#      */
/*   Created: 2019/08/15 11:32:34 by Snkh         #+#   ##    ##    #+#       */
/*   Updated: 2019/08/16 05:16:52 by Snkh        ###    #+. /#+    ###.fr     */
/*                                                         /                  */
/*                                                        /                   */
/* ************************************************************************** */

require('dotenv').config()

const axios = require('axios');
const chalk = require('chalk');
var Twit = require('twit')

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.TOKEN_KEY,
  access_token_secret: process.env.TOKEN_SECRET,
  timeout_ms:           60*1000
})

console.log(chalk.green('[42Tracking] Starting...'));
console.log(chalk.green('[42Tracking] Target: ' + process.env.TARGET_LOGIN));
console.log(chalk.green('[42Tracking] Fetching from API.'));

axios.get('http://ladder-fou.herokuapp.com/users')
    .then(function (response) 
    {
        const users     = response.data.filter(function (user) { return user !== null });
        const target    = users.filter(function (user) { return user.user.login == process.env.TARGET_LOGIN })[0];
        const position  = users.findIndex(i => i.user.login == process.env.TARGET_LOGIN);

        const now       = new Date();
        const date      = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        const status    = '[42Tracking] ' + date + 
        '\n🔹User: @' + process.env.TARGET_TWITTER +
        '\n🔹Position: ' + position + '/200' + 
        '\n🔹Level: ' + target.level + 
        '\n mec t\'y est presque igo' 
        
        T.post('statuses/update',
        { status: status},
        function(err, data, response) {
            if (err)
                return console.log(chalk.red('Error! ' + err));
            console.log(chalk.green('[42Tracking] Tweet sent with success! '))
            console.log(chalk.green(
            '[42Tracking] * Tweet Link: https://twitter.com/' 
            + data.user.screen_name
            + '/status/'
            + data.id_str
            ))
        })
          
    })
    .catch(function (error) {
        console.log(chalk.red('Failed to fetch from API...' + error));
    })