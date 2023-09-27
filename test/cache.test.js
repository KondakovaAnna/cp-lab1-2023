import {Cache} from "../src/cache";

test('it fails 😒', () => {
    expect(false).toBe(true);
});
test('defaul for get value is null 😶', () =>{
    let cache = new Cache();
    let expected = null;
    let actual = cache.get_value("anykey");
    expect(actual).toBe(expected);
});
test('view on empty cache returns empty list 🤭', () =>{
    let cache = new Cache();
    let expected = [];
    let actual = cache.view();
    expect(actual).toEqual(expected);
});
test('default calls_allowed is 1 🤗', () =>{
    let cache = new Cache();
    let expected = [["key", 1, 1]];
    cache.set_value("key",1);
    let actual = cache.view();
    expect(actual).toEqual(expected);
});
test('invalid number of calls_allowed raises error 🤫', () =>{
    let cache = new Cache();
    let lamb = function() {
        cache.set_value("key",1,-1)
    }
    expect(lamb).toThrow(Error);
});
test('set_value with calls allowed working fine 😅', () =>{
    let cache = new Cache();
    let number_of_calls = 3;
    let key = "key"
    let value = 1;
    cache.set_value(key, value, number_of_calls);
    
    let expected = [[key, value, number_of_calls]];
    let actual = cache.view();

    expect(actual).toEqual(expected);
});
test('calls_allowed decrements on get call 🤯', () =>{
    let cache = new Cache();
    let number_of_calls = 3;
    let key = "key"
    let value = 1;
    cache.set_value(key, value, number_of_calls);

    let expected = [[key, value, number_of_calls-1]];


    let actual_value = cache.get_value(key);
    let expected_value = value;
    expect(actual_value).toBe(expected_value);

    let actual = cache.view();
    expect(actual).toEqual(expected);
});
test('if number of calls more than limit - returns null 🧐', () =>{
    let cache = new Cache();
    let number_of_calls = 2;
    let key = "key"
    let value = 1;
    cache.set_value(key, value, number_of_calls);
    for (let i = 0; i < number_of_calls; i++) {
        expect(cache.get_value(key)).toBe(value)
    }
    expect(cache.get_value(key)).toBe(null)
});
test('if number of calls more than limit - returns null 🧐', () =>{
    let cache = new Cache();
    let number_of_calls = 2;
    let key = "key"
    let value = 1;
    cache.set_value(key, value, number_of_calls);
    for (let i = 0; i < number_of_calls; i++) {
        expect(cache.get_value(key)).toBe(value)
    }
    expect(cache.get_value(key)).toBe(null)
    expect(cache.view()).toEqual([])
});
test('multiple entries view format 😲', () =>{
    let cache = new Cache();
    let number_of_calls = 2;
    let key1 = "key"
    let key2 = "key2"
    let value = 1;
    cache.set_value(key1, value, number_of_calls);
    cache.set_value(key2, value, number_of_calls);
    
    let expected = [[key1, value, number_of_calls], [key2, value, number_of_calls]]
    expect(cache.view()).toEqual(expected)
});