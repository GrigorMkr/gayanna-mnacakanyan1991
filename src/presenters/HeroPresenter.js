export class HeroPresenter {
    constructor(config, navigationPresenter) {
        this.config = config;
        this.navigationPresenter = navigationPresenter;
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

    navigateTo(route) {
        if (this.navigationPresenter) {
            this.navigationPresenter.navigateTo(route);
        }
    }
}
