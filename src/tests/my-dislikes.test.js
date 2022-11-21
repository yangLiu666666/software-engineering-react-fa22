import MyDislikes from "../components/profile/my-dislikes";
import {act, create} from 'react-test-renderer';
import Tuits from "../components/tuits";


test(
    'dislike screen render', () => {
        let dislike;

        act(() => {
            dislike = create(
                <MyDislikes />
            )
        });

        const root = dislike.root;
        // eslint-disable-next-line testing-library/await-async-query
        const ttrTuits = root.findAllByProps({className:"ttr-tuits"});
        expect(ttrTuits).toBeTruthy();
    }
)


