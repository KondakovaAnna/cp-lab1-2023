class Cache {
    constructor() {
        this.internal = new Map();
    }
    set_value(key, value, calls_limit = 1) {
        if (calls_limit <= 0){
            throw new Error("limit can't be less then 1");
        }
        this.internal.set(key, [value, calls_limit]);
    }
    get_value(key){
        let a = this.internal.get(key);
        if (a == null || a[1] == 0){
            this.internal.delete(key);
            return null;
        }
        this.internal.set(key, [a[0], a[1]-1]);
        return a[0];
    }
    view(){
        let arr = [];
        for (let [k, v] of this.internal) {
            arr.push([k, ...v]);
        }
        return arr;
    }
}

export {Cache}