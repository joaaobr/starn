export class DataStarn {
    typesEquals(data: any, type: string) {
        if(typeof(data) != type) {
            throw new Error(`TypeError: Type of ${data} is different ${type}`)
        }
    }

    objectToString(data: Object): string {
        return JSON.stringify(data)
    }

    stringToArray(data: Buffer) {
            return data
            .toString()
            .split('\n')
    }
}