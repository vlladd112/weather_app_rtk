

export function FormRadioChange ({ eventHandler, type, title, option1, option2 }) {
    return (
        <form id={type} className='option-form'>
            <div className='form-title'>{title}</div>
            <div className='options-wrapper'>
            <div className='option-item'>
                <input type='radio' name={type} id={option1} value={option1} defaultChecked onChange={(e) => {eventHandler(e)}}/><label>{option1}</label>
            </div>
            <div className='option-item'>
                <input type='radio' name={type} id={option2} value={option2} onChange={(e) => {eventHandler(e)}}/><label>{option2}</label>
            </div>
            </div>
        </form>
    );
}