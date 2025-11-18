export class AboutPresenter {
    constructor(config) {
        this.config = config;
        this.languagePresenter = null;
    }

    setLanguagePresenter(languagePresenter) {
        this.languagePresenter = languagePresenter;
    }

    getLanguagePresenter() {
        return this.languagePresenter;
    }

    getConfig() {
        return this.config;
    }
}
