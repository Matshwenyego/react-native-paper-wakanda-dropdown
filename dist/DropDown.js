import { ScrollView, View } from "react-native";
import { Menu, TextInput, TouchableRipple, useTheme } from "react-native-paper";
import { BlurView } from 'react-native-wakanda-blur';
import React, { forwardRef, useEffect, useState } from "react";
const DropDown = forwardRef((props, ref) => {
    const activeTheme = useTheme();
    const { 
        visible, 
        onDismiss, 
        showDropDown, 
        value, 
        setValue, 
        activeColor, 
        mode, 
        label, 
        placeholder, 
        inputProps, 
        list, 
        dropDownContainerMaxHeight, 
        theme, 
        containerStyle,
        underlineColor, 
        inputStyle, 
        contentStyle, 
        blurEnabled,
        blurStyles, 
        blurType, 
        blurAmount, 
        blurRadius, 
    } = props;
    const [displayValue, setDisplayValue] = useState("");
    const [inputLayout, setInputLayout] = useState({
        height: 0,
        width: 0,
        x: 0,
        y: 0,
    });

    const onLayout = (event) => {
        setInputLayout(event.nativeEvent.layout);
    };

    useEffect(() => {
        const _label = list.find((_) => _.value === value)?.label;
        if (_label) {
            setDisplayValue(_label);
        }
    }, [list, value]);

    return (
        <Menu 
            contentStyle={contentStyle} 
            visible={visible} 
            onDismiss={onDismiss} 
            theme={theme} 
            anchor={
                <TouchableRipple ref={ref} onPress={showDropDown} onLayout={onLayout}>
                    <View pointerEvents={"none"} style={containerStyle}>
                        <TextInput 
                            value={displayValue} 
                            underlineColor={underlineColor} 
                            mode={mode} 
                            label={label} 
                            placeholder={placeholder} 
                            pointerEvents={"none"} 
                            theme={theme} 
                            {...inputProps} 
                            style={[{
                                backgroundColor: '#FFFFFF',
                                textAlignVertical: 'top',
                                textAlign: 'left',
                                paddingHorizontal: 0,
                            },inputStyle]}
                        />
                    </View>
                </TouchableRipple>} 
            style={{
                maxWidth: inputLayout?.width,
                width: inputLayout?.width,
                marginTop: inputLayout?.height
            }}
        >
        {blurEnabled ? (
            <BlurView 
                borderRadius={blurRadius} 
                blurAmount={blurAmount} 
                blurType={blurType} 
                style={[blurStyles, { maxHeight: dropDownContainerMaxHeight || 200 }]}>
                <ScrollView style={{ maxHeight: dropDownContainerMaxHeight || 200 }}>
                    {list.map((_item, _index) => (
                    <Menu.Item 
                        key={_index} 
                        theme={theme} 
                        titleStyle={{
                            color: value === _item.value 
                            ? activeColor || (theme || activeTheme).colors.primary
                            : (theme || activeTheme).colors.text
                        }} 
                        onPress={() => {
                            setValue(_item.value);
                            if (onDismiss) {
                                onDismiss();
                            }
                        }} 
                        title={_item.custom || _item.label} 
                        style={{ width: inputLayout?.width }}
                    />))}
                </ScrollView>
            </BlurView>
        ) : (
            <ScrollView style={{ maxHeight: dropDownContainerMaxHeight || 200 }}>
                {list.map((_item, _index) => (
                    <Menu.Item 
                        key={_index} 
                        theme={theme} 
                        titleStyle={{
                            color: value === _item.value
                            ? activeColor || (theme || activeTheme).colors.primary
                            : (theme || activeTheme).colors.text,
                        }} 
                        onPress={() => {
                            setValue(_item.value);
                            if (onDismiss) {
                                onDismiss();
                            }
                        }} 
                        title={_item.custom || _item.label} 
                        style={{ width: inputLayout?.width }}
                    />))}
            </ScrollView>
        )}
      </Menu>);
});
export default DropDown;
