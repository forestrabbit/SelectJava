from bottle import *
from JdkManager import *
import json, os

jdkManager = JdkManager()

'''
The api /file and /file/:path return children directories in a directory,
browser need to remember the history directory
'''
@route('/file')
def handler():
    return json.dumps([x for x in os.listdir('/') if os.path.isdir('/' + x)])

@route('/file/:path')
def handler(path):
    path = path.replace('&', '/')
    return json.dumps([x for x in os.listdir('/' + path) if os.path.isdir('/' + path + '/' + x)])

@route('/javaroots')
def handler():
    return json.dumps(jdkManager.getJavaRoots())

@route('/javaroots', method = 'post')
def handler():
    jdkManager.setJavaRoots('set', request.json)

@route('/javaroots', method = 'delete')
def handler():
    jdkManager.setJavaRoots('del', request.json)

@route('/jdk')
def handle():
    return json.dumps(jdkManager.findJdk())

'''
Require a string data in json which means the selected javaHome
'''
@route('/javahome', method = 'put')
def handler():
    javaHomePath = request.json
    if jdkManager.isJdkDirectory(javaHomePath):
        if os.name == 'nt':
            javaHomePath = javaHomePath.replace('/', '\\')
            res = os.system('setx "JAVA_HOME" "' + javaHomePath + '"')
            if res == 0:
                return json.dumps(True)
    return json.dumps(False)

run(host = 'localhost', port = 8080)