import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import './UploadModal.css';
const UploadModal = ({ pid, onClose }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (fileList) => {
        setSelectedFiles(fileList)
    };

    const handleUpload = async () => {
        try {
            if (selectedFiles.length === 0) {
                toast("Chưa chọn hình");
                return;
            }
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                formData.append("files", file);
            }
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/product/upload-image-product/${pid}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(result => {
                    toast('Cập nhật ảnh thành công')
                    onClose();
                })
                .catch(err => {
                    toast(err)
                });

        } catch (error) {
            console.error('Có lỗi xảy ra: ', error.message);
        }
    };
    const handleRemove = () => {
        console.log(pid)
        const pimage = {
            pimage: []
        };
        if (window.confirm("Bạn có chắc muốn xóa ảnh sản phẩm này?") === true) {
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/product/update-product/${pid}`, pimage, { withCredentials: true })
                .then(result => {
                    toast(result.data.msg);
                    onClose();
                })
                .catch(err => {
                    toast(err);
                })
        }
    }
    return (
        <div className="image-upload-modal">
            {/* <ToastContainer /> */}
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h1>Thêm hình ảnh sản phẩm</h1>

                <div className="upload-btn-wrapper">
                    <div className='image'>
                        <input type="file" multiple accept="image/*" onChange={(event) => {
                            const fileList = event.target.files;
                            handleFileChange(fileList);
                        }} />
                    </div>
                </div>
                {selectedFiles.length > 0
                    ? <button onClick={handleUpload}>Tải lên</button>
                    : <button onClick={handleRemove}>Xóa ảnh của sản phẩm này</button>
                }
            </div>
        </div>
    );
};

export default UploadModal;