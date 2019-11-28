import React from 'react';
import InputMask from 'react-input-mask';
import './../scss/Modal.scss';


class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: '',
                phone: '',
                callbackType: [true, false, false, false],
                email: "",
                comment: '',
            },
            showSuccess: false,
            formErrors: {name: '',phone:''}
        };


        this.callbackTitles = [
            {title: "телефон", id: 6},
            {title: "whatsapp", id: 7},
            {title: "viber", id: 8},
            {title: "telegram", id: 9},
        ];

        this.url = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://dima.temploid.ru' : "";
        this.url += '/local/ajax/modal-form.php';

        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.drawForm = this.drawForm.bind(this);
        this.drawSuccess = this.drawSuccess.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        console.log("FORM", this.state.form);

        const {form} = this.state;

        const formErrors = {};

        formErrors.name = (form.name === '') ? 'is-error' : '';
        formErrors.phone = (form.phone === '') ? 'is-error' : '';


        if (formErrors.name === '' && formErrors.phone === ''){
            const formData = new FormData(e.target);

            formData.set('form_hidden_12', window.location.origin + window.location.pathname);
            formData.set('form_hidden_13', this.props.link);
            formData.set('WEB_FORM_ID', "2");
            formData.set('web_form_submit', "Отправить");

            fetch(this.url, {
                method: 'post',
                body: formData,
            })
                .then(res => res.json())
                .then(json => {
                    if (json.isFormNote === "Y") this.setState({showSuccess: true})
                });
        } else this.setState({formErrors})



    }

    onChangeCheckbox(index) {
        const {callbackType} = this.state.form;
        callbackType[index] = !callbackType[index];
        this.setState({form: {...this.state.form, callbackType}});
    }

    onChangeName(e) {
        this.setState({form: {...this.state.form, name: e.target.value}});
    }

    onChangePhone(e) {
        this.setState({form: {...this.state.form, phone: e.target.value}});
    }

    onChangeEmail(e) {
        this.setState({form: {...this.state.form, email: e.target.value}});
    }

    onChangeComment(e) {
        this.setState({form: {...this.state.form, comment: e.target.value}});
    }

    drawForm() {

        const {props} = this;

        const isFilled = {
            name: this.state.form.name === '' ? '' : 'is-filled',
            phone: this.state.form.phone === '' ? '' : 'is-filled',
            email: this.state.form.email === '' ? '' : 'is-filled',
            comment: this.state.form.comment === '' ? '' : 'is-filled',
        };

        return <div className="dev-modal__content">
            <div className="dev-modal__title">Взять за основу - <span>{props.name}</span></div>
            <form name="" onSubmit={this.onSubmit}>
                <div className="dev-modal__input">
                    <input type="text" name="form_text_4" className={isFilled.name +" " + this.state.formErrors.name} id="formName"
                           onChange={this.onChangeName}/>
                    <label htmlFor="formName">Как к вам обращаться</label>
                </div>
                <div className="dev-modal__input">
                    <InputMask mask={"+7 (\\999) 999-99-99"} id="formPhone" className={isFilled.phone +" " + this.state.formErrors.phone} name="form_text_5"
                               onChange={this.onChangePhone}/>
                    <label htmlFor="formPhone">Номер телефона</label>
                </div>

                <div className="dev-modal__checkbox">
                    <div className="dev-modal__checkbox-title"> Предпочтительный способ связи:</div>
                    {
                        this.state.form.callbackType.map((item, index) => <div key={index}
                                                                               className="dev-modal__checkbox-item">
                                <input type="checkbox" name="form_checkbox_GET_ANALOG_SITE__CALLBACK_TYPE[]"
                                       id={"formCallbackType_" + index} checked={item}
                                       onChange={() => this.onChangeCheckbox(index)}
                                       value={this.callbackTitles[index].id}
                                />
                                <label
                                    htmlFor={"formCallbackType_" + index}>{this.callbackTitles[index].title}</label>
                            </div>
                        )
                    }
                </div>

                <div className="dev-modal__input">
                    <input type="text" id="formEmail" className={isFilled.email} name="form_text_10"
                           onChange={this.onChangeEmail}/>
                    <label htmlFor="formEmail">email</label>
                </div>

                <div className="dev-modal__textarea">
                    <textarea type="text" id="formComment" className={isFilled.comment} name="form_textarea_11"
                              onChange={this.onChangeComment}/>
                    <label htmlFor="formComment">Комментарий</label>
                </div>

                <button className="btn btn--primary-color">Заказать</button>

            </form>
        </div>
    }

    drawSuccess() {
        return <div>Спасибо, ваша заявка принята</div>
    }

    render() {

        const content = this.state.showSuccess ? this.drawSuccess() : this.drawForm();

        return (
            <div className="dev-modal">
                <div className="dev-modal__overlay" onClick={() => this.props.showModal(false)}/>
                <div className="dev-modal__body">
                    <div className="dev-modal__close" onClick={() => this.props.showModal(false)}/>
                    {content}
                </div>
            </div>
        );
    }
}

export default Modal;