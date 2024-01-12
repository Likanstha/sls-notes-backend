/**
 * Route: POST /note
 */

 const moment = require('moment');
 const { v4: uuidv4 } = require('uuid');
 const util = require("../api/util.js");
 const connectToDatabase = require('../db');
const ItemService = require('../utils/log.js');
 
 exports.handler = async (event) => {
     try {
       
        const dbstatus = await connectToDatabase();
        let item = JSON.parse(event.body).Item;
 
        
         console.log("##",event.headers)
         item.user_id = util.getUserId(event.headers);
         item.user_name = util.getUserName(event.headers);
         item.note_id =item.user_id+':'+uuidv4()
         item.timestamp = moment().unix();
         item.expires = moment().add(9, 'days').unix();
         console.log("EEE", item);
         await ItemService.createItem(item);
         //await ItemService.saveResponse(item);
 
         return {
             statusCode: 200,
             headers: util.getResponseHeaders(),
             body: JSON.stringify(item)
             }
 
 
     } catch (err) {
         
         console.log("Error", err)
         return {
             statusCode: err.statusCode ? err.statusCode : 500,
             headers: util.getResponseHeaders(),
             body: JSON.stringify({
                     error: err.name ? err.name : 'Exception',
                     message:err.message?err.message:"Unknown error"
                 
             })
         }
     }
 }