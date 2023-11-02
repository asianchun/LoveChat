const InputBox = ({
  style,
  label,
  type,
  maxLength = 60,
  disabled,
  placeholder,
  value = "",
  change,
}) => {
  return (
    <div className={`flex flex-col ${style}`}>
      {label ?? <label className="font-palanquin">{label}</label>}
      <input
        className="input"
        type={type}
        maxLength={maxLength}
        required
        placeholder={placeholder}
        disabled={disabled}
        onChange={change}
        value={value}
      />
    </div>
  )
}

export default InputBox
