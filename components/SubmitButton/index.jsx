import { View, Text } from 'react-native'
import React from 'react'
import { Button, ButtonText } from './Styles'

const SubmitButton= ({
    titleText,
    onPress
}) => {
  return (
    <Button
    onPress={onPress}>
        <ButtonText>
            {titleText}
        </ButtonText>
    </Button>
  )
}

export default SubmitButton