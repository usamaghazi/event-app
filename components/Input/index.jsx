
import { Label,InputText } from './Styles'

const Input= ({
    label,
    placeholder,
    value,
    onChangeText,
    multiline = false,
    isInValid = false,
    required = false,
}) => {
  return (
    <>
      <Label>
        {label}{required ? '*': ''}
      </Label>
      <InputText
      placeholder={placeholder}
      placeholderTextColor='#A9A9A9'
      onChangeText={onChangeText}
      multiline={multiline}
      value={value}
      isInValid={isInValid}
      />
    </>
  )
}

export default Input