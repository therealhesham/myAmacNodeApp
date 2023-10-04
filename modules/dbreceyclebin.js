const { mongoosetransaction } = require("./storepreview");


let options = {
    timeZone: 'Egypt',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  },
  formatter = new Intl.DateTimeFormat([], options);




const recyclebin = mongoosetransaction.model("importanttrash",new mongoosetransaction.Schema({

type:"string",
date:"string",
user:"string",
imageurl:"string",
transaction:"object"


}))

module.exports.recyclebin=recyclebin