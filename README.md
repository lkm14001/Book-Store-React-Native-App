# Book-Store-React-Native-App

# Tools Used - React Native, Redux Toolkit, Ui Kitten, MongoDB Realm

API Used for Books Data - http://gutendex.com/books

1. Added AppProvider and UserProvider to authenticate using the authentication methods provided by the Realm App Services.
2. Created Redux Slices for getting books data from API and books Categories
3. Created Realm Object Models for collection schemas in mongoDB
4. Some CRUD operations for writing the data into Realm DB. 

# If u want to work on this 
# Clone this repository using git clone <rep url>
# run `npm i` 
# run `npm start` - to start the metro bundler 
# press `a` - to start in android simulator
# press `i` - to start in IOS simulator (need mac OS)


# Project Structure 

```bash
├───.bundle
├───android
│   ├───.gradle
│   │   ├───7.5.1
│   │   │   ├───checksums
│   │   │   ├───dependencies-accessors
│   │   │   ├───executionHistory
│   │   │   ├───fileChanges
│   │   │   ├───fileHashes
│   │   │   └───vcsMetadata
│   │   ├───buildOutputCleanup
│   │   └───vcs-1
│   ├───app
│   │   └───src
│   │       ├───debug
│   │       │   └───java
│   │       │       └───com
│   │       │           └───bookstore
│   │       ├───main
│   │       │   ├───java
│   │       │   │   └───com
│   │       │   │       └───bookstore
│   │       │   └───res
│   │       │       ├───drawable
│   │       │       ├───mipmap-hdpi
│   │       │       ├───mipmap-mdpi
│   │       │       ├───mipmap-xhdpi
│   │       │       ├───mipmap-xxhdpi
│   │       │       ├───mipmap-xxxhdpi
│   │       │       └───values
│   │       └───release
│   │           └───java
│   │               └───com
│   │                   └───bookstore
│   └───gradle
│       └───wrapper
├───ios
│   ├───bookStore
│   │   └───Images.xcassets
│   │       └───AppIcon.appiconset
│   ├───bookStore.xcodeproj
│   │   └───xcshareddata
│   │       └───xcschemes
│   └───bookStoreTests
├───src
│   ├───assets
│   │   └───icons
│   ├───components
│   │   ├───Home
│   │   │   └───Screens
│   │   ├───Layout
│   │   ├───Library
│   │   ├───Login
│   │   ├───Registration
│   │   ├───Shop
│   │   └───WebView
│   ├───navigation
│   │   ├───Header
│   │   ├───Stack
│   │   ├───Tabs
│   │   │   ├───CustomBottomTab
│   │   │   └───TabBarIcon
│   │   └───TopTabs
│   ├───realm
│   │   ├───context
│   │   └───models
│   └───redux
│       ├───hooks
│       ├───slices
│       │   └───BookSlice
│       └───store
└───__tests__
```

What this App can do ?
1. User Login and Register Screen.
2. User can add Favorites and bookmarks, which will be added into the mongoDB Realm Database.
3. User can buy the books - add to cart and then checkout - payment gateway is yet to be added.
4. User can view the book in the browser (WebView) to read the book. 
