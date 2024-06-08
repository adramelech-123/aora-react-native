# React Native

## 1. Setup

### Install Expo
Instead of using the latest setup which ships with typescript, we want to use a blank template which allows us to use basic Javascript:

```bash
npx create-expo-app@latest ./ --template blank
```
### Install Dependencies
Now we setup the dependencies we need:

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

### Setup Entry Point
We then configure our `package.json` file to include the following setup:

```json
{
  "main": "expo-router/entry"
}

```

Delete the `App.js` file and create an `app` folder to include a `_layout.jsx` file which will contain our entry point for the app.

### Modify Project Configuration

Now add a deep-linking scheme in the `app.json` config file as follows (NB: You can name your scheme anyhow): 

```json
{
  "scheme": "your-app-scheme"
}
```

### Run Expo

```bash
npx expo start -c
```

## 2. Application

Now we can create a homepage/home route by creating an `index.jsx` file in the `app` directory. Just like NextJS we can use file based routing in this version of React Native. The `_layout.jsx` will be present for all our routes.

Modify the `_layout.jsx` file to render child components/route in this case the contents from `index.jsx`:

```js
import {Slot} from 'expo-router'

const RootLayout = () => {
  return (
    <Slot/>
  );
};
export default RootLayout;

```

Another way to render the index screen is to use `Stack` from `expo-router` as follows:

```js
import {Stack} from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
    </Stack>
  );
};
export default RootLayout;
```
