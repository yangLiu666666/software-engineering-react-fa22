/**
 * @jest-environment node
 */

import {
    findAllTuitsDislikedByUser,
    userDislikesTuit,
    userTogglesTuitDislikes
} from "../services/dislikes-service";
import {
    createTuit,
    deleteTuit,
    findTuitById
} from "../services/tuits-service";
import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";


const content = {tuit: 'This is a test tuit'};
let ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
};

let newUser;
let newTuit;
let uid;
let tid;

beforeAll(async() => {
    await deleteUsersByUsername(ripley.username)
    newUser = await createUser(ripley);
    uid = newUser._id;
    newTuit = await createTuit(uid, content);
    tid = newTuit._id;
})

afterAll(async () => {
    await deleteTuit(tid);
    await deleteUsersByUsername(ripley.username);
})

describe("Can dislike a tuit with REST API", () => {
    test("", async () => {
        expect(newTuit.stats.dislikes).toEqual(0);
        await userDislikesTuit(uid, tid);
        newTuit = await findTuitById(tid);
        expect(newTuit.stats.dislikes).toEqual(1);

        const dislikedTuits = await findAllTuitsDislikedByUser(uid);
        expect(dislikedTuits.length).toEqual(1);
        expect(dislikedTuits[0].tuit).toEqual(newTuit.tuit)

        await userTogglesTuitDislikes(uid, tid);
        newTuit = await findTuitById(tid);
        expect(newTuit.stats.dislikes).toEqual(0);
    });

});