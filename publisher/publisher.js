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
        let message = "Testing for Nodejs RabbitMQ";
        channel.assertQueue(queueName,{
            durable: false
        });
        channel.sendToQueue(queueName,Buffer.from(message));
        setTimeout(()=>{
            connection.close();
        },1000);
    })
})