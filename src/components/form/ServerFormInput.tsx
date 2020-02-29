import React from 'react';
import {CountryDropdown} from 'react-country-region-selector';

interface ServerFormInputProps {
    id: string
    label: string,
    type: string,
    value: string,
    formType?: FormType,
    error?:boolean
    onChange: (id:string, newValue: string) => void,
}

export enum FormType {
    INPUT, TEXTAREA, COUNTRY
}

const ServerFormInput = ({ label, type, id, value, onChange, formType = FormType.INPUT, error}: ServerFormInputProps) => {


    return (
        <div className="server-form-group">
            <label htmlFor={label}>{label}</label>
            {formType === FormType.INPUT && <input
                className="server-form-input"
                type={type}
                id={id}
                value={value}
                onChange={(event) => onChange(id, event.target.value)} />}

            {formType === FormType.TEXTAREA && <textarea
                className="server-text-area"
                id={id}
                value={value}
                onChange={(event) => onChange(id, event.target.value)} />}
            {formType === FormType.COUNTRY && <CountryDropdown
                classes="server-country-picker"
                id={id}
                valueType="short"
                value={value}
                onChange={(value) => onChange(id, value)} />}

            {error && <p className='server-error'>{`The ${label} field is required`}</p>}
        </div>
    );
};

export default ServerFormInput;