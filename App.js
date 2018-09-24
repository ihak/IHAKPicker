/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import IHAKPicker from "./ihakpicker";

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.data = [
      {
        label: "JavaScript",
        value: "js"
      },
      {
        label: "C++",
        value: "cpp"
      },
      {
        label: "Swift",
        value: "swift"
      },
      {
        label: "HTML",
        value: "html"
      },
      {
        label: "Java",
        value: "java"
      },
      {
        label: "Objective C",
        value: "m"
      }
    ];

    this.state = {
      pickerTitle: "",
      selectedItem: this.data[0]
    };

    this._iHAKPickerOnPressConfirm = this._iHAKPickerOnPressConfirm.bind(this);
    this._iHAKPickerOnPressCancel = this._iHAKPickerOnPressCancel.bind(this);
  }

  _iHAKPickerOnPressConfirm(selectedIndex, selectedItem) {
    this.setState({
      pickerTitle: selectedItem.label,
      selectedItem: selectedItem
    });
  }

  _iHAKPickerOnPressCancel() {
    console.log("On press cancel");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Language :</Text>
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  row: {
    flexDirection: "row",
    justifyContent: "center"
  },
  label: {
    textAlign: "center",
    margin: 10
  }
});
