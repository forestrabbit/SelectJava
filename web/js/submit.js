function submitRoot() {
    let checkboxes = document.querySelectorAll('[name="rootValue"]')
    let roots = []
    for (let i of checkboxes) {
        if (i.checked) {
            roots = roots.concat(i.value)
        }
    }
    fetch('/api/javaroots', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(roots)
    }).then(ignored => {
        alert('提交成功')
    }).catch(err => {
        alert('提交失败')
    })
    inInit = false
}

function deleteRoot() {
    let checkboxes = document.querySelectorAll('[name="selectedRoot"]')
    let roots = []
    for (let i of checkboxes) {
        if (i.checked) {
            roots = roots.concat(i.value)
        }
    }
    fetch('/api/javaroots', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(roots)
    }).then(ignored => {
        alert('提交成功')
    }).catch(err => {
        alert('提交失败')
    })
    addSelectedRoots()
}

function submitJdk() {
    let radios = document.querySelectorAll('[name="jdkValue"]')
    let jdk = ''
    for (let i of radios) {
        if (i.checked) {
            jdk = i.value
            break
        }
    }
    fetch('/api/javahome', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jdk)
    }).then(ignored => {
        alert('提交成功')
    }).catch(err => {
        alert('提交失败')
    })
}