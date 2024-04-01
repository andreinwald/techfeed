async function request(url: string, {cache = 'default', headers = {}} = {}) {
    // @ts-ignore
    let response = await fetch(url, {cache, headers});
    return response.json();
}

export type Story = {
    id: number;
    title: string;
    url?: string;
    text?: string;
    comments: { text: string }[],
    openGraph: {
        image: string,
        description: string,
        title: string
    }
}


export default class DateReceiver {
    public async receive() {
        let top: number[] = await request('https://hacker-news.firebaseio.com/v0/topstories.json');
        top = top.slice(0, 50);
        let topStories: Story[] = await Promise.all(top.map(async (storyId) => {
                let story = await request(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`, {cache: 'force-cache'});
                if (story['kids']) {
                    let comments = [];
                    comments.push(story['kids'][0]);
                    story.comments = await Promise.all(comments.map(commentId => request(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`, {cache: 'force-cache'})));
                }
                if (story.url) {
                    story.openGraph = await request('https://api.linkpreview.net/?q=' + story.url, {
                        cache: 'force-cache',
                        headers: {
                            'X-Linkpreview-Api-Key': '8a3e9e0325b30e47eb1ff057cbec6f7c',
                        }
                    });
                }
                return story;
            }
        ));
        return topStories;
    }
}
