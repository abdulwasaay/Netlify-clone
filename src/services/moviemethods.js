import { getDatabase, ref, set, onValue, push, remove } from "firebase/database";
import { app } from "../pages/firebase-config";

const db = getDatabase(app);


export function getAlldata() {
    const data = ref(db, 'movies/');
    return data;
}

export function getById(id) {
    return new Promise((resolve, reject) => {
        const data = getAlldata();
        const arr = [];
        onValue(data, (u) => {
            for (let key in u.val()) {
                if (u.val().hasOwnProperty(key)) {
                    arr.push(u.val()[key]);
                }
            }
            resolve(arr.find((u) => u.id === id))
        }, (error) => {
            reject(error);
        });
    });
}

export function getAllMovies() {
    return new Promise((resolve, reject) => {
        const data = getAlldata();
        const arr = [];
        onValue(data, (u) => {
            for (let key in u.val()) {
                if (u.val().hasOwnProperty(key)) {
                    arr.push(u.val()[key]);
                }
            }
            resolve(arr);
        }, (error) => {
            reject(error);
        });
    })
}

export async function writeData(title, url, usermovie, id,) {
    let found = await getById(id)
    if (found) {
        throw new Error("not like");
    }
    set(ref(db, 'movies/' + id), {
        title, url, usermovie, id,
    });
}

export function deleteData(id) {
    remove(ref(db, "movies/"+ id))
}