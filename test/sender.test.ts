import { SenderStarn } from "../index"

describe('is it possible to create a new sender', () => {
    let sender: SenderStarn

    beforeAll(() => {
        sender = new SenderStarn({ connection: {
            port: 2020,
            host: "localhost",
            
        }, 
        typeMessage: 'string'
    })
    })

    it('validate if sender properties exist', () => {
        expect(sender).toHaveProperty("connection")
        expect(sender).toHaveProperty("data")
    })

    it('validate if is possible send message', () => {
        expect(sender.sendMessage("A", "Hello A")).toBe(true)
    })
})