import { View, Text } from 'react-native'
import React from 'react';
import SelectList from "react-native-dropdown-select-list";

const FormDropdownStyleFCL = ({label}) => {
    const [selected, setSelected] = React.useState('');
    const data = [
        {value:'GP'},
        {value:'RF'},
        {value:'FR'},
        {value:'OT'},
        {value:'HC'},
    ];
    
  return (
    <View style={{paddingHorizontal:20, paddingVertical: 4, flex:1, minWidth:180}}>
        <Text style={{fontSize:18, fontWeight:'bold', marginBottom:5}}>{label}</Text>
      <SelectList setSelected={setSelected} data={data}  />
    </View>
  )
}

export default FormDropdownStyleFCL