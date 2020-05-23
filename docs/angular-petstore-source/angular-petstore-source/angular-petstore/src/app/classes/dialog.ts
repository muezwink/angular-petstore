export class Dialog {
    title: string;
    message: string;
    response?: string;
    constructor(title: string, message: string) {
        this.title = title;
        this.message = message;
    }
}
