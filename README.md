# IHAKPicker
Custom react-native picker component for iOS and Android.

## Description
This component used react-native's default picker component. 
Additionally, it displays an overlay, animates the picker view and provide confirm and cancel options in iOS. 

In Android, it provides a simple dropdown menu with different customization options.

Supports separate customizations for iOS and Android. For customization options please refer usage section.

## Supported versions
- Requires ```React-Native``` ```v.0.54.0``` or greater.
- Tested on ```v.0.54.0```
- Should work on lower versions as well.

## Installation
Installation can be done via npm or yarn.

```shell
npm i ihakpicker --save
```

```shell
yarn add ihakpicker
```

## Usage
```js
import IHAKPicker from "ihakpicker";
```

```jsx
<IHAKPicker
            placeholder={"Select"}
            confirmButtonTitle="Yess"
            cancelButtonTitle="Nooo"
            androidPickerMode="dialog"
            androidDialogPrompt="Select"
            pickerTitle={this.state.pickerTitle}
            data={this.data}
            selectedItem={this.state.selectedItem}
            onPressConfirm={this._iHAKPickerOnPressConfirm}
            onPressCancel={this._iHAKPickerOnPressCancel}
            customStyles={{
              container: {
                borderWidth: 1,
                borderColor: "#666",
                margin: 5
              },
              placeholderText: {},
              titleText: {},
              confirmButtonText: {
                color: "#0FF",
                fontSize: 20
              },
              cancelButtonText: {
                color: "#378324",
                fontWeight: "bold"
              },
              confirmButton: {
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#458908"
              },
              cancelButton: {
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#458908"
              }
            }}
          />
```

For further implementational details see example implementation in ```App.js```. Also check default props and style object in 
```ihakpicker.js```.

## Example

| iOS | Android |
|---|---|
| ![iOS example screenshot 1](https://github.com/ihak/IHAKPicker/blob/master/ios_1.png) | ![Android example screenshot 1](https://github.com/ihak/IHAKPicker/blob/master/android_1.png) |
|![iOS example screenshot 1](https://github.com/ihak/IHAKPicker/blob/master/ios_2.png) | ![Android example screenshot 2](https://github.com/ihak/IHAKPicker/blob/master/android_2.png) |

## License
MIT.

## Author
Hassan Ahmed Khan <hassandotahmed@gmail.com>
