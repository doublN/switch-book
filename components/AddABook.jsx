import { View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'

const InputText = (props) =>{
    const {onChangeText, value} = props;
    return (
        <View>
            <Text>Add A Book</Text>
            <TextInput 
                onChangeText={onChangeText}
                value={value} />
        </View>
    )
}

export default function AddABook() {
    const [searchText, setSearchText] = useState("");
    return (
        <View>
            <InputText value={searchText}
                onChangeText={setSearchText}
            />
        </View>
    )
}