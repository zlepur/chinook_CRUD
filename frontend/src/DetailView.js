import ListView from "./ListView";

export default class DetailView extends ListView {
    setTableData(response) {
        this.setState({
            data: [response.data]
        });
    }
}
