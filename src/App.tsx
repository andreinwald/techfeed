import {useEffect, useState} from "react";
import DateReceiver, {Story} from "./DateReceiver";

export const App = () => {
    let [stories, setStories] = useState<Story[]>([]);
    useEffect(() => {
        (new DateReceiver()).receive().then(stories => setStories(stories));
    }, []);

    if (!stories.length) {
        return <>loading ...</>;
    }

    return <div className={'wrapper'}>
        {stories.map(story => <>
            <div><b>{story.title}</b></div>
            {story.url &&
                <>{story.url}</>
            }
            {story.text &&
                <div dangerouslySetInnerHTML={{__html: story.text}}></div>
            }
            <hr/>
        </>)}
    </div>;
}
