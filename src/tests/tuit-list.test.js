import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  // "alice", "bob", "charlie"
    {username: 'alice', password: "alice123", email: "alice@gmail.com", _id:'123'},
    {username: 'bob', password: "bob123", email: "bob@gmail.com", _id:'234'},
    {username: 'charlie', password: "charlie123", email: "bob@gmail.com", _id:'345'}
];

const MOCKED_TUITS = [
  // "alice's tuit", "bob's tuit", "charlie's tuit"
    {tuit:"alice's tuit", postedBy:MOCKED_USERS[0]._id, _id:'321'},
    {tuit:"bob's tuit", PostedBy:MOCKED_USERS[1]._id, _id:'432' },
    {tuit:"charlie's tuit", PostedBY:MOCKED_USERS[2]._id, _id:'543'}
];

test('tuit list renders static tuit array', () => {
  // TODO: implement this
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>);
      const linkElement = screen.getByText(/alice's tuit/i);
      expect(linkElement).toBeInTheDocument();

});

// test('tuit list renders async', async () => {
//   // TODO: implement this -- Please See tuit-list-async.test
//   const tuits = await findAllTuits();
//   render(
//       <HashRouter>
//         <Tuits tuits={tuits}/>
//       </HashRouter>
//   );
//   const linkedElement = screen.getByText(/Harry Potter World/i);
//   expect(linkedElement).toBeInTheDocument();
//
// })

test('tuit list renders mocked', async () => {
  // TODO: implement this
  axios.get.mockImplementation(() =>
      Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);

  const tuit = screen.getByText(/alice's tuit/i);
  expect(tuit).toBeInTheDocument();
});
