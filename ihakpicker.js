// @flow
import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	TouchableHighlight,
	Dimensions,
	Modal,
	Animated,
	Picker,
	Platform
} from "react-native";

const SUPPORTED_ORIENTATIONS = [
	"portrait",
	"portrait-upside-down",
	"landscape",
	"landscape-left",
	"landscape-right"
];

type Props = {};

export default class IHAKPicker extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			slideUpAnimation: new Animated.Value(0),
			selectedValue: props.selectedItem.value
		};

		//
		this.selectedIndex = 0;
		this.selectedItem = props.selectedItem;

		this.setModalVisible = this.setModalVisible.bind(this);
		this._onPressMask = this._onPressMask.bind(this);
		this._onPressCancel = this._onPressCancel.bind(this);
		this._onPressConfirm = this._onPressConfirm.bind(this);
		this._slidePicker = this._slidePicker.bind(this);
		this._onValueChange = this._onValueChange.bind(this);
	}

	setModalVisible(visible) {
		this.setState({
			modalVisible: visible,
			selectedValue: this.props.selectedItem.value
		});
		this._slidePicker(visible);
	}

	getTitleElement() {
		const { pickerTitle, placeholder, customStyles } = this.props;

		if (!pickerTitle && placeholder) {
			return (
				<Text
					style={[
						styles.placeholderText,
						customStyles.placeholderText
					]}
				>
					{placeholder}
				</Text>
			);
		}
		return (
			<Text style={[styles.titleText, customStyles.titleText]}>
				{pickerTitle}
			</Text>
		);
	}

	_slidePicker(visible) {
		this.state.slideUpAnimation.setValue(0);
		Animated.timing(this.state.slideUpAnimation, {
			toValue: 1,
			duration: 300
		}).start();
	}

	_resetPickerDataOnDismiss() {
		const { data, selectedItem } = this.props;
		this.setState({ selectedValue: selectedItem.value });
		this.selectedItem = selectedItem;
		this.selectedIndex = data
			.map(item => item.value)
			.indexOf(this.selectedItem.value);
	}

	_onPressCancel() {
		this.setModalVisible(!this.state.modalVisible);
		this._resetPickerDataOnDismiss();
		if (typeof this.props.onPressCancel === "function") {
			this.props.onPressCancel();
		}
	}

	_onPressConfirm() {
		console.log("On press confirm called...");
		if (Platform.OS === "ios") {
			this.setModalVisible(!this.state.modalVisible);
		}

		if (typeof this.props.onPressConfirm === "function") {
			console.log(
				"Calling this.props.onPressConfirm with index: " +
					this.selectedIndex +
					" item: " +
					this.selectedItem
			);

			console.log("this.state.selectedValue: ", this.state.selectedValue);
			this.props.onPressConfirm(this.selectedIndex, this.selectedItem);
		}
	}

	_onPressMask() {
		this.setModalVisible(!this.state.modalVisible);
		this._resetPickerDataOnDismiss();
		if (typeof this.props.onPressMask === "function") {
			this.props.onPressMask();
		}
	}

	_onValueChange(itemValue, itemIndex) {
		const { data } = this.props;
		this.setState({
			selectedValue: itemValue
		});

		this.selectedItem = data[itemIndex];
		this.selectedIndex = itemIndex;

		console.log("called onvalue change");
		if (Platform.OS === "android") {
			console.log(
				"platform is android. Calling onPressConfirm manually."
			);
			this._onPressConfirm();
		}
	}

	render() {
		const {
			placeholder,
			data,
			androidPickerMode,
			customStyles,
			androidDialogPrompt,
			confirmButtonTitle,
			cancelButtonTitle
		} = this.props;
		const bottomMargin = this.state.slideUpAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: [-200, 0]
		});

		let pickerItems = [];
		for (var i = 0; i < data.length; i++) {
			pickerItems.push(
				<Picker.Item
					key={data[i].value}
					label={data[i].label}
					value={data[i].value}
				/>
			);
		}

		return (
			<View style={[styles.container, customStyles.container]}>
				{Platform.OS === "ios" && (
					<View style={[styles.pickerField]}>
						<Modal
							animationType="fade"
							transparent={true}
							visible={this.state.modalVisible}
							supportedOrientations={SUPPORTED_ORIENTATIONS}
						>
							<TouchableWithoutFeedback
								onPress={this._onPressMask}
							>
								<View style={styles.pickerMask}>
									<TouchableWithoutFeedback>
										<Animated.View
											style={{
												marginBottom: bottomMargin,
												flex: 1,
												backgroundColor: "#456789"
											}}
										>
											<View
												style={styles.toolbarContainer}
											>
												<View style={styles.toolBar}>
													<TouchableOpacity
														style={[
															styles.cancelButton,
															customStyles.cancelButton
														]}
														onPress={
															this._onPressCancel
														}
													>
														<Text
															style={[
																styles.cancelButtonText,
																customStyles.cancelButtonText
															]}
														>
															{cancelButtonTitle}
														</Text>
													</TouchableOpacity>
													<TouchableOpacity
														style={[
															styles.confirmButton,
															customStyles.confirmButton
														]}
														onPress={
															this._onPressConfirm
														}
													>
														<Text
															style={[
																styles.confirmButtonText,
																customStyles.confirmButtonText
															]}
														>
															{confirmButtonTitle}
														</Text>
													</TouchableOpacity>
												</View>
												<View
													style={styles.separator}
												/>
												<Picker
													style={{ height: 200 }}
													selectedValue={
														this.state.selectedValue
													}
													onValueChange={(
														itemValue,
														itemIndex
													) =>
														this._onValueChange(
															itemValue,
															itemIndex
														)
													}
												>
													{pickerItems}
												</Picker>
											</View>
										</Animated.View>
									</TouchableWithoutFeedback>
								</View>
							</TouchableWithoutFeedback>
						</Modal>

						<TouchableOpacity
							onPress={() => {
								this.setModalVisible(true);
							}}
						>
							{this.getTitleElement()}
						</TouchableOpacity>
					</View>
				)}

				{Platform.OS === "android" && (
					<Picker
						style={[styles.androidPicker, styles.androidPicker]}
						mode={androidPickerMode}
						prompt={androidDialogPrompt}
						enabled={true}
						selectedValue={this.state.selectedValue}
						onValueChange={(itemValue, itemIndex) =>
							this._onValueChange(itemValue, itemIndex)
						}
					>
						{pickerItems}
					</Picker>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "center"
	},
	pickerField: {},
	androidPicker: {
		flex: 1,
		alignItems: "center",
		color: "#000"
	},
	titleText: {
		textAlign: "center"
	},
	placeholderText: {
		color: "#c9c9c9",
		textAlign: "center"
	},
	pickerMask: {
		flex: 1,
		alignItems: "flex-end",
		flexDirection: "row",
		backgroundColor: "#00000077"
	},
	toolBar: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#FFF"
	},
	cancelButton: {
		padding: 10,
		paddingTop: 5,
		paddingBottom: 5,
		margin: 10,
		backgroundColor: "#FFF"
	},
	confirmButton: {
		padding: 10,
		paddingTop: 5,
		paddingBottom: 5,
		margin: 10,
		backgroundColor: "#FFF"
	},
	cancelButtonText: {
		backgroundColor: "#FFF",
		fontSize: 16,
		color: "#666"
	},
	confirmButtonText: {
		backgroundColor: "#FFF",
		fontSize: 16,
		color: "#429DFC"
	},
	toolbarContainer: {
		backgroundColor: "#FFF"
	},
	separator: {
		height: 0.5,
		backgroundColor: "#6666"
	}
});

IHAKPicker.defaultProps = {
	customStyles: {},
	androidPickerMode: "dropdown",
	androidDialogPrompt: "",
	confirmButtonTitle: "Confirm",
	cancelButtonTitle: "Cancel"
};
