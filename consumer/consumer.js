
const amqp = require('amqplib/callback_api');
const { Connection } = require('amqplib/lib/connection');
amqp.connect(`amqp://localhost`,(err, connection)=>{
    if(err){
        throw err;
    }
    connection.createChannel((err, channel)=>{
        if(err){
            throw err;
        }
        let queueName = "Publisher";
        channel.assertQueue(queueName,{
            durable: false
        });
        channel.consume(queueName,(msg)=>{
            console.log(`Received : ${msg.content.toString()}`);
            channel.ack(msg);
        })
    })
})