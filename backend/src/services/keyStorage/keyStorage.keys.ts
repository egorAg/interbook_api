export namespace KeyStorageKeys {
    const make = (key: string, value: string) => {
        return `${key}_${value}`
    }

    export const SPACE_INVITE = (token: string) => {
        return make('SPACE_INVITE', token)
    }
}