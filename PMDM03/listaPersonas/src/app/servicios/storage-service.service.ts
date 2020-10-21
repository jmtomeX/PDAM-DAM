import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';



const { Storage } = Plugins;

@Injectable({
    providedIn: 'root',
})

export class StorageServiceService {

    constructor() { }

    async setString(key: string, value: string) {
        await Storage.set({ key, value });
    }

    async getString(key: string): Promise<{ value: any }> {
        return await Storage.get({ key });
    }

    // añadir al storage datos
    async setObject(key: string, value: any) {
        await Storage.set({ key, value: JSON.stringify(value) });
    }

    async getObject(key: string): Promise<{ value: any }> {
        const ret = await Storage.get({ key });
        return JSON.parse(ret.value);
    }

    async removeItem(key: string) {
        await Storage.remove({ key });
    }
    async clear() {
        await Storage.clear();
    }
}
