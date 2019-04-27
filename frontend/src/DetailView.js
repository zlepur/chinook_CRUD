import ListView from "./ListView";

export default class DetailView extends ListView {
    setData(response) {
        this.setState({
            data: [response.data]
        });
    }
}
