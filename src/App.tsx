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
        {stories.map(story => <div key={story.id}>
            <b>{story.title}&nbsp;&nbsp;&nbsp;</b>
            {story.url &&
                <a href={story.url}>link</a>
            }
            {story.text &&
                <div dangerouslySetInnerHTML={{__html: story.text.substring(0, 1000)}}></div>
            }
            <br/><br/>
            <div style={{fontSize: '13px'}}>comments:</div>
            {story.comments && story.comments.map(comment => (
                <div dangerouslySetInnerHTML={{__html: comment.text.substring(0, 1000)}}></div>
            ))}
            <br/>
            <hr/>
        </div>)}
    </div>;
}
