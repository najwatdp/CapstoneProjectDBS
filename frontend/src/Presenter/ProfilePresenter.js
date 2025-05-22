import Cookie from "../Model/accessCookie";

export default class ProfilePresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

}