import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const TestComponent = () => {
  const [count, setCount] = useState(0);
  const [textFields, setTextFields] = useState([]);

  const incrementCount = () => {
    setCount(count + 1);
    setTextFields(prevTextFields => [...prevTextFields, '']);
  };

  const handleChangeText = (text, index) => {
    setTextFields(prevTextFields => {
      const updatedTextFields = [...prevTextFields];
      updatedTextFields[index] = text;
      return updatedTextFields;
    });
  };

  const renderTextFields = () => {
    return textFields.map((textField, index) => (
      <TextInput
        key={index}
        style={styles.textField}
        value={textField}
        onChangeText={text => handleChangeText(text, index)}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>React Native Test Component</Text>
      <Text>Count: {count}</Text>
      {renderTextFields()}
      <Button title="+" onPress={incrementCount} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textField: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
};

export default TestComponent;
