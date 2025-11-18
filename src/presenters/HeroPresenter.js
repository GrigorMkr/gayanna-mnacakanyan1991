export class HeroPresenter {
    constructor(config, navigationPresenter) {
        this.config = config;
        this.navigationPresenter = navigationPresenter;
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
