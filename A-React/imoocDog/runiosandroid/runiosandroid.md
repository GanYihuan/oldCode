Android


Run react-native link to link the react-native-video library.

Or if you have trouble, make the following additions to the given files manually:

android/settings.gradle

include ':react-native-video'
project(':react-native-video').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-video/android')
android/app/build.gradle

dependencies {
   ...
   compile project(':react-native-video')
}
MainApplication.java

On top, where imports are:

import com.brentvatne.react.ReactVideoPackage;
Add the ReactVideoPackage class to your list of exported packages.

@Override
protected List<ReactPackage> getPackages() {
    return Arrays.asList(
            new MainReactPackage(),
            new ReactVideoPackage()
    );
}