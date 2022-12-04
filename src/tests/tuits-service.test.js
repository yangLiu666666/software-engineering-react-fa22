import {
    createTuit,
    deleteTuit,
    findTuitById,
    findAllTuits,
    findTuitsByUser
} from "../services/tuits-service";

import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

describe('can create tuit with REST API', () => {
  // TODO: implement this
    const user = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuit to insert
    const tuit = {
        tuit: 'I am looking for an internship and coop for next spring and summer.'
    }

    let tuitId;
    // setup test before running test
    beforeAll(() => {
        // remove any/all tuits to make sure we create it in the test
        return deleteUsersByUsername(user.username);
    })

    // clean up after test runs
    afterAll( () =>{
        // remove any data we created
        return deleteTuit(tuitId);
    })

    test('can create tuit with REST API', async () => {
        const newUser = await createUser(user);
        const newTuit = await createTuit(newUser._id, tuit);
        tuitId = newTuit._id;
        expect(newTuit.postedBy).toEqual(newUser._id);
        expect(newTuit.tuit).toEqual(tuit.tuit);
    })
});

describe('can delete tuit with REST API', () => {
  // TODO: implement this
    const user = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const alert = {
        tuit: 'Hello World!'
    }

    let tuitId;

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(user.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteTuit(tuitId);
    })

    test('can delete tuit wtih REST API', async () => {
        const newUser = await createUser(user);
        const newTuit = await createTuit(newUser._id, alert);
        tuitId = newTuit._id;
        expect(newTuit.postedBy).toEqual(newUser._id);
        expect(newTuit.tuit).toEqual(alert.tuit);

        const status = await deleteTuit(newTuit._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
    const user = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const tuit = {
        tuit: 'Do you have any opportunities for internship? I am looking for an internship for next summer, please help me.'
    }
    let tuitId;

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(user.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteTuit(tuitId);
    })

    test('can retrieve a tuit by their primary key with REST API', async () => {
        const newUser = await createUser(user);
        const newTuit = await createTuit(newUser._id, tuit);
        tuitId = newTuit._id;
        expect(newTuit.postedBy).toEqual(newUser._id);
        expect(newTuit.tuit).toEqual(tuit.tuit);

        const existTuit = await findTuitById(newTuit._id);
        expect(existTuit.postedBy).toEqual(newUser);
        expect(existTuit.tuit).toEqual(tuit.tuit);
    })
});

const user = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
};

let newUser;

beforeAll(async() => {
    newUser = await createUser(user);

})

afterAll(() => {
    return deleteUsersByUsername(user.username);
})


describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this

  //   const user = {
  //       username: 'ellenripley',
  //       password: 'lv426',
  //       email: 'ellenripley@aliens.com'
  //   };

    const tuitLists = [
        "Hello World!", "Welcome to CS5610.", "I love professor Jose."
    ];

    // let userId;

    beforeAll(() => {
            return Promise.all(tuitLists.map(tuit =>
                        createTuit(newUser._id, {tuit: tuit})
                ));
        }
    );

    afterAll( async () =>{
            const addTuits = await findTuitByUser(newUser._id);
            return Promise.all(addTuits.map(tuit =>
                deleteTuit(tuit._id)));
        }
    );

    test('can retrieve all tuits with REST API', async () => {
        // const newUser = await createUser(user);
        // userId = newUser._id;
        const tuits = await findAllTuits();

        expect(tuits.length).toBeGreaterThanOrEqual(tuitLists.length);
        // let's check each tuit we add
        const addTuit = tuits.filter(
            tuit => tuitLists.indexOf(tuit.tuit) >= 0);

        expect(addTuit.length).toBeGreaterThanOrEqual(tuitLists.length);
        // compare the actual tuit in database with the tuit we sent
        addTuit.forEach(tuit => {
            const tuitContent = tuitLists.find(
                (tuitContent) => tuitContent === tuit.tuit
            );
            expect(tuit.tuit).toEqual(tuitContent);
            expect(tuit.postedBy).toEqual(newUser)
        });
    })
});