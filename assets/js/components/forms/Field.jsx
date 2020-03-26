import React from 'react';

// 1 - name
// 2 - label
// 3 - value
// 4 - onchange
// 5 - placeholder
// 6 - type
// 7 - error

const Field = ({name, label, value, onChange, placeholder, type = "text", error}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className={"form-control " + (error && " is-invalid") }

            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
};

export default Field;