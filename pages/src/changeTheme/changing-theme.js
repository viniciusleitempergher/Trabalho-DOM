let toggleThemeButton = document.querySelector("#togglemode-input")
let toggleThemeTxt = document.querySelector("#togglemode-txt")
let rootStyle = document.documentElement.style

toggleThemeButton.addEventListener("click", (e) => {
  if (toggleThemeButton.checked) {
    toggleThemeTxt.textContent = "Toggle Dark"

    rootStyle.setProperty("--cor-cinza-escuro", "rgb(240, 240, 240)")
    rootStyle.setProperty("--cor-cinza", "#444")
    rootStyle.setProperty("--cor-cinza-claro", "#fff")
    rootStyle.setProperty("--cor-branco", "#444")
    rootStyle.setProperty("--cor-modalpopup-input", "rgb(240, 240, 240)")
    
  } else { 
    toggleThemeTxt.textContent = "Toggle Light"

    rootStyle.setProperty("--cor-cinza-escuro", "")
    rootStyle.setProperty("--cor-cinza", "")
    rootStyle.setProperty("--cor-cinza-claro", "")
    rootStyle.setProperty("--cor-branco", "")
    rootStyle.setProperty("--cor-modalpopup-input", "")
  }
})

window.addEventListener("load", (e) => {
  if (!localStorage.getItem("theme")) return

  if (localStorage.getItem("theme") == "light") {
    toggleThemeButton.click()
  }
}) 

window.addEventListener("beforeunload", (e) => {
  if (toggleThemeButton.checked) {
    localStorage.setItem("theme", "light")
    return
  }
  localStorage.setItem("theme", "dark")
})