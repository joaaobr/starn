import { Starn } from "../index"

describe('is it possible to create a new starn', () => {
    let starn: Starn

    beforeAll(() => {
        starn = new Starn({
            port: 2020,
            host: "localhost",
            topics: ["A", "B", "C"]
        })
    })

    it('validate if Starn properties exist', () => {
        expect(starn).toHaveProperty("port")
        expect(starn).toHaveProperty("host")
        expect(starn).toHaveProperty("event")
        expect(starn).toHaveProperty("socket")
        expect(starn).toHaveProperty("topics")
        expect(starn).toHaveProperty("data")
    })

    it("validate if properties have their true values", () => {
        expect(starn.port).toStrictEqual(2020)
        expect(starn.host).toStrictEqual("localhost")
        expect(starn.topics).toStrictEqual(["A", "B", "C"])
    })
})