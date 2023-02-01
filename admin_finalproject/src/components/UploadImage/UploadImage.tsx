import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/configStore'
import { uploadRoomImageApi } from '../../redux/roomReducer/roomReducer'
import './uploadImage.css'
import { style } from '../../assets/data/styleCardModal'
import InputFileImage from './InputFileImage'
type Props = {
    show: boolean,
    handleClose: () => void,
    image: string,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    id: number,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const UploadImage = ({ show, handleClose, image, setImage, id, setShow }: Props) => {
    const dispatch: AppDispatch = useDispatch()
    const [fileSelected, setFileSelected] = React.useState<File>() // also tried <string | Blob>

    const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
    
        if (!fileList) return;
    
        setFileSelected(fileList[0]);
    
        if (e.target.files?.length) {
          let reader = new FileReader();
          reader.onload = function (e) {
            setImage(reader.result as string);
          }
          reader.readAsDataURL(e.target.files[0]);
        }
      };
    

      const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        if (fileSelected) {
          dispatch(uploadRoomImageApi(id, fileSelected))
        }
      };


    const handleCloseCard = () => setShow(false);


    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className='search-card-grid' >
                <>
                    <div className="preview">
                        <img id="img-preview" src={image} />
                        <input
                            accept="image/*"
                            id="file-input"
                            name="photo"
                            type="file"
                            multiple={false}
                            onChange={handleImageChange}
                        />
                        <label htmlFor="file-input">Upload Image</label>
                    </div>

                </>
                {/* <InputFileImage image={image} setImage={setImage}/> */}
                <div className='preview-button'>
                    <button onClick={uploadFile} className='uploadButton'>Change</button>
                    <button onClick={handleCloseCard} className='closeButton'>Close</button>
                </div>
            </Box>
        </Modal>
    )
}

export default UploadImage