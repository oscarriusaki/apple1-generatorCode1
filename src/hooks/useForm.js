import React, { useState } from 'react'

export const useForm = (initialForm = {}) => {

    const [inputForm, setInputForm] = useState(initialForm);

    const onInputChange = ({target}) => {
        const { name, value } = target;
        setInputForm({
            ...inputForm,
            [name]: value,
        });
    }
    const onInputChange2 = ({target}) => {
        const { name, value } = target;
        setInputForm({
            ...inputForm,
            [name]: value,
        });
    }
    const onInputChange3 = ({target}, name) => {
        const { value } = target;
        setInputForm({
            ...inputForm,
            [name]: value,
        });
    }

    const onReset = () => {
        setInputForm(initialForm);
    }

    const activeCode = (value) => {
        setInputForm({
            ...inputForm,
            active: value
        })
    }
   

    return {
        ...inputForm,
        inputForm,
        onInputChange,
        onInputChange2,
        onReset,
        activeCode,
        onInputChange3,
    }
}
