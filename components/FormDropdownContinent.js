import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react';
import SelectList from 'react-native-dropdown-select-list';


const FormDropdownContinent = ({label}) => {
    const [selected, setSelected] = React.useState("");
    const data = [
        {value:'Châu Á'},
        {key:'2',value:'Châu Âu'},
        {key:'3',value:'Châu Phi'},
        {key:'4',value:'Châu Mỹ'},
        {key:'5',value:'Châu Đại Đương'},
    ];
    
  return (
    <View style={{paddingHorizontal:20, paddingVertical: 4, flex:1, minWidth:180}}>
        <Text style={{fontSize:18, fontWeight:'bold', marginBottom:5}}>{label}</Text>
      <SelectList setSelected={setSelected} data={data}  />
      <Text>{selected}</Text>
    </View>
  )
}

export default FormDropdownContinent