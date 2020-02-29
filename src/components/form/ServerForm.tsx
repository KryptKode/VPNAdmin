import React, { useState } from 'react';

import ServerFormInput, { FormType } from './ServerFormInput';

import Server from '../../interfaces/Server';
import { hasKey } from '../../utils/hasKey';

interface ServerFormProps {
    serverId?: string,
    server?: Server,
    uploadServer: (server: Server, isNew: boolean) => void,
    deleteServer: (serverId: string) => void,
    loading?: boolean
}

export interface FormElement {
    id: string
    label: string,
    formType: FormType,
    value: string,
    type?: string,
    error?: boolean,
}
export interface FormBuilder {
    username: FormElement,
    password: FormElement,
    serverName: FormElement,
    serverCountry: FormElement,
    serverIp: FormElement,
    config: FormElement,
}

const serverFormBuilder: FormBuilder = {
    username: {
        id: "username",
        label: 'Username',
        formType: FormType.INPUT,
        value: '',
        type: 'text',
    },
    password: {
        id: "password",
        label: 'Password',
        formType: FormType.INPUT,
        value: '',
        type: 'password',
    },
    serverName: {
        id: "serverName",
        label: 'Server Name',
        formType: FormType.INPUT,
        value: '',
        type: 'text',
    },
    serverCountry: {
        id: "serverCountry",
        label: 'Server Country',
        formType: FormType.COUNTRY,
        value: '',
    },
    serverIp: {
        id: "serverIp",
        label: 'Server Address',
        formType: FormType.INPUT,
        value: '',
        type: 'text',
    },
    config: {
        id: "config",
        label: 'Config',
        formType: FormType.TEXTAREA,
        value: '',
    }
}

const getDefaultFormElements = (serverId: string | undefined, server: Server | undefined) => {
    var defaultFormElements;
    if (serverId && server) {
        const clonedFormElements = Object.assign({}, serverFormBuilder);
        Object.keys(server).forEach(key => {
            if (hasKey(clonedFormElements, key)) {
                const formElement = clonedFormElements[key]
                formElement.value = server[key]
            }
        })
        defaultFormElements = clonedFormElements

    } else {
        defaultFormElements = serverFormBuilder
    }

    return defaultFormElements
}



const ServerForm = ({ serverId, server, uploadServer, deleteServer, loading }: ServerFormProps) => {
    const [formElements, setFormElements] = useState(getDefaultFormElements(serverId, server))
    
    const isNew = !(serverId && server)

    const handleChange = (id: string, value: string) => {
        const clonedFormElements = Object.assign({}, formElements);
        if (hasKey(clonedFormElements, id)) {

            const formElement = clonedFormElements[id]
            const clonedElement = {
                ...formElement,
                value
            }
            clonedFormElements[id] = clonedElement
            setFormElements(clonedFormElements);
        }
    }


    const isValidForm = () => {
        var valid = false;
        const values = Object.values(formElements) as Array<FormElement>

        for (let item of values) {
            valid = item.value !== ""
            if (!valid) {
                break;
            }
        }
        return valid
    }

    const showError = () => {
        const clonedFormElements = Object.assign({}, formElements)
        Object.keys(clonedFormElements).forEach(key => {
            if (hasKey(clonedFormElements, key)) {
                const formElement = clonedFormElements[key]
                formElement.error = formElement.value === ''
                setFormElements(clonedFormElements)
            }
        });
    }

    const clearErrors = () => {
        const clonedFormElements = Object.assign({}, formElements)
        Object.keys(clonedFormElements).forEach(key => {
            if (hasKey(clonedFormElements, key)) {
                const formElement = clonedFormElements[key]
                formElement.error = false
                setFormElements(clonedFormElements)
            }
        });
    }

    const getServer = () => {
        let newServer: Server = {
            config: formElements.config.value,
            username: formElements.username.value,
            password: formElements.password.value,
            serverName: formElements.serverName.value,
            serverCountry: formElements.serverCountry.value,
            serverIp: formElements.serverIp.value,
        }

        if (isNew) {
            if(server)
            newServer.id = server.id
        }
        return newServer
    }

    const handleSave = () => {
        clearErrors()
        if (isValidForm()) {
            uploadServer(getServer(), isNew)
        } else {
            showError()
        }
    }

    const handleDelete = () => {
        if (serverId) {
            deleteServer(serverId)
        }
    }

    return (
        <div className='server-form'>
            {Object.values(formElements).map((item) => {
                return <ServerFormInput id={item.id} key={item.id} type={item.type} label={item.label} value={item.value} onChange={handleChange} formType={item.formType} error={item.error} />
            })}

            <div className='server-form-buttons'>
                <button disabled={loading} className='btn' onClick={handleSave}>Save</button>
                {!isNew && <button disabled={loading} className='btn-delete' onClick={handleDelete}>Delete</button>}
            </div>
        </div>
    );
};

export default ServerForm;