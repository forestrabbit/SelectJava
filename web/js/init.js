function firstInUse() {
    if (inInit) {
        return
    }
    inInit = true
    fetch('/api/javaroots')
        .then(resp => resp.json())
        .then(json => {
            if (json.length === 0) {
                document.querySelector('nav').style = 'display: none;'
                addRoot()
                alert('Welcome to use Java Manager, Please Select your Java Root first')
            } else {
                document.querySelector('nav').style = 'display: block;'
                inInit = false
            }
        })
}