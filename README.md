Before running make sure to have react native cli installed along with org.gradle.java.home varipointed at java jdk and local.properties sdk.dir pointed 
Run instructions for Android:
    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd "nba-fantasy-team-creator/nbaFantasyTeamCreator" &&  npx react-native run-android
  
  Run instructions for iOS:
    • cd "nba-fantasy-team-creator/nbaFantasyTeamCreator" && react-native run-ios
    - or -
    • Open nbaFantasyTeamCreator/ios/nbaFantasyTeamCreator.xcworkspace in Xcode or run "xed -b ios"
    • Hit the Run button

    Issues: 
    1. Due to time restraints components were not optimized and designed to utilize props.
    2. Android not having default image prop in debug mode. I spent a fair amount of unecessary time trying to figure out a solution with out using any type of add library. IOS has a default avatar with images fail from URL.

    Improvements:
    1. UI design. The goal was to have one screen and at the most I had to make use of modals to create a more cohesive experience.
    2. Breaking down component file structure. Having all components nested in app.js was not the goal.
    2. Unit testing. Unfortunately due to time and figuring out how I would parse and filter data I did not get to do any unit testing coverage on functionality.