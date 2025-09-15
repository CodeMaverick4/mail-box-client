
const Input = ({ value, type, placeholder, label, name, parentDivCss = "", onChange = () => { }, required = false }) => {
    
    return (
        <div className={`input_container ${parentDivCss}`}>
            <input type={type} name={name} value={value} onChange={onChange} placeholder={" "} />
            <span className={` input_label_pos `}>{label}{required && <span className="required-star"> * </span>}</span>
        </div>
    )
}

export default Input