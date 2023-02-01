import React, { useCallback, useState } from 'react'
import './uploadImage.css'

type Props = {
    image: string | undefined,
    setImage: React.Dispatch<React.SetStateAction<string>>,
}

const InputFileImage = ({ image, setImage }: Props) => {

    const handleUploadImage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            let reader = new FileReader();
            reader.onload = function (e) {
                setImage(reader.result as string);
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }, [])

    return (
        <div className="preview">
            <img id="img-preview" src={image} />
            <input onChange={handleUploadImage} name='file' accept="image/*" type="file" id="file-input" />
            <label htmlFor="file-input">Upload Image</label>
        </div>
    )
}

export default InputFileImage