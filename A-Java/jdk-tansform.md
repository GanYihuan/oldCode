# 
open ~/.bash_profile


# 
source ~/.bash_profile


# 
export JAVA_6_HOME=/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
export JAVA_7_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_80.jdk/Contents/Home
export JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_144.jdk/Contents/Home


alias jdk8='export JAVA_HOME=$JAVA_8_HOME'
alias jdk7='export JAVA_HOME=$JAVA_7_HOME'
alias jdk6='export JAVA_HOME=$JAVA_6_HOME’

export JAVA_HOME=$JAVA_7_HOME


CLASSPATH=.:$JAVA_HOME/lib/dt.jar:JAVA_HOME/lib/tools.jar
ANDROID_HOME=/Users/ganyihuan/Library/Android/sdk
PATH=$JAVA_HOME/bin:$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$GRADLE_HOME/bin:

export ANDROID_HOME
export CLASSPATH
export PATH