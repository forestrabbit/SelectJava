from conf.search_root import *
import os, os.path

class JdkManager(object):
    def isJdkDirectory(self, jdkPath):
        if os.path.isdir(jdkPath) and 'bin' in os.listdir(jdkPath):
            binDir = jdkPath + '/bin'
            isJre = False
            isJdk = False
            if os.path.isdir(binDir):
                binFiles = os.listdir(binDir)
                for binFile in binFiles:
                    if binFile.split('.')[0] == 'javac' and os.path.isfile(binDir + '/' + binFile):
                        isJdk = True
                    elif binFile.split('.')[0] == 'java' and os.path.isfile(binDir + '/' + binFile):
                        isJre = True
            return isJre and isJdk

    def findJdk(self):
        javaHome = []
        global java_roots
        for java_root in java_roots:
            jdkList = [x for x in os.listdir(java_root)]
            if not java_root.endswith('/'):
                java_root += '/'
            for jdkDir in jdkList:
                jdkDir = java_root + jdkDir
                if self.isJdkDirectory(jdkDir):
                    javaHome.append(jdkDir)
        return javaHome

    def getJavaRoots(self):
        return java_roots

    def __setJavaRoots(self, tup):
        for ele in tup:
            if isinstance(ele, list):
                self.__setJavaRoots(ele)
            else:
                ele = ele.replace('&', '/')
                if not ele.startswith('/'):
                    ele = '/' + ele
                java_roots.append(ele)

    def __removeJavaRoots(self, tup):
        for ele in tup:
            if isinstance(ele, list):
                self.__removeJavaRoots(ele)
            else:
                ele = ele.replace('&', '/')
                if not ele.startswith('/'):
                    ele = '/' + ele
                java_roots.remove(ele)

    def setJavaRoots(self, method, *args):
        comment = """
'''
The java_roots is a list string, system supports more than 1 java_root path.
The program search jdk from java_roots' element java_root. The jdk directory must contains a bin directory, and a java and a javac in the bin directory,
else it will not be identified to a JAVA_HOME.
The java_root must split by '/'.
if java_roots is empty, system will set it when you use it.
'''
"""
        ans = 'java_roots = ['
        if method == 'set':
            self.__setJavaRoots(args)
            global java_roots
            java_roots = list(set(java_roots))
        else:
            self.__removeJavaRoots(args)
        for i in range(len(java_roots)):
            data = java_roots[i]
            ans += "'" + data + "'"
            if i != len(java_roots) - 1:
                ans += ', '
        ans += ']'
        with open('conf/search_root.py', 'w') as f:
            f.write(comment + ans)