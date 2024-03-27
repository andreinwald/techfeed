async function request(url: string) {
    let response = await fetch(url);
    return response.json();
}

export type Story = {
    id: number;
    title: string;
    url?: string;
    text?: string;
}


export default class DateReceiver {
    public async receive() {
        let top: number[] = await request('https://hacker-news.firebaseio.com/v0/topstories.json');
        top = top.slice(0, 10);
        let topStories: Story[] = await Promise.all(top.map(storyId => {
                return request(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`);
            }
        ));
        return topStories;
    }
}
