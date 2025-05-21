
export default class RegisterPresenter {

    #model;
    #view;

    constructor({ model, view }) {
        this.#model = model;
        this.#view = view;
    }

    async Register(name, email, password, confirmPassword) {
        this.#view.setLoading(true);

        if (password !== confirmPassword) {
            this.#view.setMessage("confirm password tidak valid");
            this.#view.setLoading(false);

            return;
        }
        try {
            const data = {
                name: name,
                email: email,
                password: password,
                confPassword: confirmPassword
            }
            const res = await this.#model.Register(data);
            if (res.status === "success") {
                this.#view.navigate("/login");
            }
        } catch (err) {
            console.log(err);
        } finally {
            this.#view.setLoading(false);
        }
    }
    Next(name, email) {
        if (name === '' || null) {
            console.log("Mohon untuk tidak mengkosongkan name");
            return;
        }
        if (email === '' || null) {
            console.log("Mohon untuk tidak mengkosongkan email");
            return;
        }

        this.#view.setLoading(true);
        this.#view.setDisable(true);

        setTimeout(() => {
            this.#view.setActive(false);
            this.#view.setLoading(false);
        }, 500);
    }
}