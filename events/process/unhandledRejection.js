module.exports = (client, err) => {

    client.log("PROCESS", err.stack);
    console.log(err.stack);

};