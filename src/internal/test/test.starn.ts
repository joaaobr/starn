import { Starn } from "../starn";
import { SenderStarn } from "../sender.starn";
import { ClientStarn } from "../client.starn";

const starn = new Starn({ 
    port: 2020, 
    host: "localhost", 
    topics: ["A", "B"],
});

const sender = new SenderStarn( {  
    connection: {
        port: 2020,
        host: "localhost",
    }
});

sender.sendMessage("A", "Hello A");
sender.sendMessage("B", "Hello B");

const client = new ClientStarn({
    port: 2020,
    host: "localhost",
});

client.getMessage("A", data => console.log(data));
client.getMessage("B", data => console.log(data));