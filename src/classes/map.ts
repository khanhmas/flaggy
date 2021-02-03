export class CountryMap {
    static observers: Array<(value: string) => void> = [];

    static subscribe(observer: (value: string) => void): void {
        CountryMap.observers.push(observer);
    }

    static unsubscribeAll(): void {
        CountryMap.observers = [];
    }

    static notify(value: string): void {
        CountryMap.observers.forEach((observer: (value: string) => void) => {
            observer(value);
        });
    }
}