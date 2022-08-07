
'''
The java_roots is a list string, system supports more than 1 java_root path.
The program search jdk from java_roots' element java_root. The jdk directory must contains a bin directory, and a java and a javac in the bin directory,
else it will not be identified to a JAVA_HOME.
The java_root must split by '/'.
if java_roots is empty, system will set it when you use it.
'''
java_roots = ['/Program Files/Java']