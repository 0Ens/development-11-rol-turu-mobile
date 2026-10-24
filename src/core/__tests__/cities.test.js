import { addCity, removeCity } from "../cities"

const ankara = {id:1, name:"Ankara"};
const izmir = {id:2, name:"İzmir"};

test("yeni sehri listenin sonuna ekler", () => {
    expect(addCity([ankara],izmir)).toEqual([ankara, izmir]);
})

test("ayni id'li sehri ikinci kez ekleme", () => {
    expect(addCity([ankara], ankara)).toEqual([ankara]);
})

test("verilen id'li sehri listeden cikart", () => {
    const list = [ankara, izmir]
    expect(removeCity(list, izmir.id)).toEqual([ankara]);
})