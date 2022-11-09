import { Starn } from "../starn";
import { SenderStarn } from "../sender.starn";
import { ClientStarn } from "../client.starn";

const starn = new Starn({ 
    port: 2020, 
    host: "localhost", 
    topics: ["A", "B"] 
});

const sender = new SenderStarn( { connection:{ port: 2020, host: "localhost"} } )

sender.sendMessage("A", "Joao");
sender.sendMessage("B", "Hello, Orelha");
sender.sendMessage("B", "Hello, Orelha");

const client = new ClientStarn({
    port: 2020,
    host: "localhost"
})

client.getMessage("A", data => data)
client.getMessage("B", data => data)

