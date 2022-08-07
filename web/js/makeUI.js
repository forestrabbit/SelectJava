function addRoot() {
    document.querySelector('header').textContent = 'Add Java Roots'
    let mainArea = document.querySelector('.main>ul')
    mainArea.innerHTML = ''
    if (sessionStorage.getItem('fileHistory') === null) {
        sessionStorage.setItem('fileHistory', '')
    }
    let fileUrl = ''
    let history = sessionStorage.getItem('fileHistory')
    if (history === '') {
        fileUrl = '/api/file'
    } else {
        fileUrl = '/api/file/' + history
        history = history + '&'
    }
    fetch(fileUrl)
        .then(resp => resp.json())
        .then(files => {
            files = files.concat('parent directory')
            make(files, mainArea, history)
        })
        .catch(ignored => {
            make(['parent directory'], mainArea, history)
        })
}

function addJdk() {
    document.querySelector('header').textContent = 'Search and select jdk in your computer'
    let mainArea = document.querySelector('.main>ul')
    mainArea.innerHTML = ''
    fetch('/api/jdk')
        .then(resp => resp.json())
        .then(jdks => {
            for (let jdk of jdks) {
                let li = document.createElement('li')
                let span = document.createElement('span')
                let checkBox = document.createElement('input')
                checkBox.type = 'radio'
                checkBox.name = 'jdkValue'
                checkBox.value = jdk
                span.textContent = jdk
                li.appendChild(span)
                li.appendChild(checkBox)
                mainArea.appendChild(li)
            }
            document.querySelector('.main>.button').removeEventListener('click', submitRoot, false)
            document.querySelector('.main>.button').removeEventListener('click', deleteRoot, false)
            document.querySelector('.main>.button').addEventListener('click', submitJdk, false)
        })
}

function addSelectedRoots() {
    document.querySelector('header').textContent = 'Delete your selected Java Root'
    let mainArea = document.querySelector('.main>ul')
    mainArea.innerHTML = ''
    fetch('/api/javaroots')
        .then(resp => resp.json())
        .then(roots => {
            for (let root of roots) {
                let li = document.createElement('li')
                let span = document.createElement('span')
                let checkBox = document.createElement('input')
                checkBox.type = 'checkBox'
                checkBox.name = 'selectedRoot'
                checkBox.value = root
                span.textContent = root
                li.appendChild(span)
                li.appendChild(checkBox)
                mainArea.appendChild(li)
            }
            document.querySelector('.main>.button').removeEventListener('click', submitRoot, false)
            document.querySelector('.main>.button').addEventListener('click', deleteRoot, false)
            document.querySelector('.main>.button').removeEventListener('click', submitJdk, false)
        })
}

function make(files, mainArea, history) {
    for (let file of files) {
        let li = document.createElement('li')
        let span = document.createElement('span')
        let checkBox = document.createElement('input')
        checkBox.type = 'checkbox'
        checkBox.name = 'rootValue'
        checkBox.value = history + file
        span.textContent = file
        span.addEventListener('click', function () {
            if (span.textContent === 'parent directory') {
                history = history.substring(0, history.length - 1)
                if (history.indexOf('&') != -1) {
                    let temp = history.split('&')
                    history = ''
                    for (let i = 0; i < temp.length - 1; i++) {
                        history = history + temp[i]
                        if (i != temp.length - 2) {
                            history += '&'
                        }
                    }
                } else {
                    history = ''
                }
                sessionStorage.setItem('fileHistory', history)
            } else {
                sessionStorage.setItem('fileHistory', history + span.textContent)
            }
            addRoot()
        }, false)
        if (span.textContent === 'parent directory') {
            span.style = 'display: block;'
        }
        li.appendChild(span)
        if (span.textContent != 'parent directory') {
            li.appendChild(checkBox)
        } else {
            li.style = 'display: list-item;'
        }
        mainArea.appendChild(li)
    }
    document.querySelector('.main>.button').removeEventListener('click', submitJdk, false)
    document.querySelector('.main>.button').removeEventListener('click', deleteRoot, false)
    document.querySelector('.main>.button').addEventListener('click', submitRoot, false)
}