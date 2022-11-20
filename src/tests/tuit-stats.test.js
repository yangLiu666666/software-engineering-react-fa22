import {act, create} from 'react-test-renderer';
import TuitStats from "../components/tuits/tuit-stats";
import * as likesService from "../services/likes-service";
import * as dislikesService from "../services/dislikes-service"

const MOCKED_TUIT = {tuit:"Test Tuit Stats", stats:{likes:2, dislikes:8}};

let tuitStats;

const likeTuit = (tuit) => {
    act(() => {
        tuit.stats.likes++;
        tuitStats.update(
            <TuitStats
                tuit={tuit}
                likeTuit={() => {}}
            />)
    })
}

const dislikeTuit = (tuit) => {
    act(() => {
        tuit.stats.dislikes++;
        tuitStats.update(
            <TuitStats
                tuit={tuit}
                dislikeTuit={() => {}}
            />)
    })
}

describe('stats render correctly', () => {
    test("Initial Stats of Tuit", () => {

    act(() => {
        tuitStats = create(
            <TuitStats tuit={MOCKED_TUIT} likeTuit={likeTuit} dislikeTuit={dislikeTuit}/>
        );
    })

    const root = tuitStats.root;
    // eslint-disable-next-line testing-library/await-async-query
    const likeButton = root.findByProps({className: 'ttr-stats-likes'});
    const likesCounter = likeButton.props.children;

    // eslint-disable-next-line testing-library/await-async-query
    const dislikeButton = root.findByProps({className: 'ttr-stats-dislikes'})
    const dislikesCounter = dislikeButton.props.children;

    expect(likesCounter.length).toBe(3);
    expect(likesCounter[0]).toBeFalsy();
    expect(likesCounter[2]).toBe(2);

    expect(dislikesCounter.length).toBe(3);
    expect(dislikesCounter[0]).toBeFalsy();
    expect(dislikesCounter[2]).toBe(8);

});
    test("Click like button", () => {

        act(() => {
            tuitStats = create(
                <TuitStats tuit={MOCKED_TUIT} likeTuit={likeTuit} dislikeTuit={dislikeTuit}/>
            );
        })

        let root = tuitStats.root;
        // eslint-disable-next-line testing-library/await-async-query
        let likeButton = root.findByProps({className: 'ttr-stats-likes'});
        let likesCounter = likeButton.props.children;

        // eslint-disable-next-line testing-library/await-async-query
        let dislikeButton = root.findByProps({className: 'ttr-stats-dislikes'})
        let dislikesCounter = dislikeButton.props.children;

        act(() => {
            likeButton.props.onClick();
        })

        root = tuitStats.root;
        // eslint-disable-next-line testing-library/await-async-query
        likeButton = root.findByProps({className: 'ttr-stats-likes'});
        likesCounter = likeButton.props.children;

        // eslint-disable-next-line testing-library/await-async-query
        dislikeButton = root.findByProps({className: 'ttr-stats-dislikes'})
        dislikesCounter = dislikeButton.props.children;

        expect(likesCounter[0]).toBeFalsy();
        expect(likesCounter[2]).toBe(3);

        expect(dislikesCounter[0]).toBeFalsy();
        expect(dislikesCounter[2]).toBe(8);


    });

    test("Click dislike button", () => {

        act(() => {
            tuitStats = create(
                <TuitStats tuit={MOCKED_TUIT} likeTuit={likeTuit} dislikeTuit={dislikeTuit}/>
            );
        })

        let root = tuitStats.root;
        // eslint-disable-next-line testing-library/await-async-query
        let likeButton = root.findByProps({className: 'ttr-stats-likes'});
        let likesCounter = likeButton.props.children;

        // eslint-disable-next-line testing-library/await-async-query
        let dislikeButton = root.findByProps({className: 'ttr-stats-dislikes'})
        let dislikesCounter = dislikeButton.props.children;


        act(() => {
            dislikeButton.props.onClick()
        })

        root = tuitStats.root;
        // eslint-disable-next-line testing-library/await-async-query
        likeButton = root.findByProps({className: 'ttr-stats-likes'});
        likesCounter = likeButton.props.children;

        // eslint-disable-next-line testing-library/await-async-query
        dislikeButton = root.findByProps({className: 'ttr-stats-dislikes'})
        dislikesCounter = dislikeButton.props.children;

        expect(likesCounter[0]).toBeFalsy();
        expect(likesCounter[2]).toBe(3);

        expect(dislikesCounter[0]).toBeFalsy();
        expect(dislikesCounter[2]).toBe(9);

    });


})