function MostrarModal(html, haveCancel) {
    let divPopup = document.createElement("div")
    let form = document.createElement("form")
    let span = document.createElement("span")
    let ok = document.createElement("button")

    ok.innerHTML = "OK!"

    form.innerHTML = html

    divPopup.classList.add("modalpopup")
    form.classList.add("modalpopup__form")
    span.classList.add("modalpopup__form__span")
    ok.classList.add("modalpopup__form__button")

    document.body.append(divPopup)
    document.querySelector(".modalpopup").append(form)
    document.querySelector(".modalpopup__form").append(span)
    document.querySelector(".modalpopup__form__span").append(ok)

    if (haveCancel) {
        let cancel = document.createElement("button")

        cancel.innerHTML = "Cancel!"

        cancel.classList.add("modalpopup__form__button")

        document.querySelector(".modalpopup__form__span").append(cancel)
    }
}

export default MostrarModal;