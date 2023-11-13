import React, { useState } from 'react';
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
                alert("Chưa chọn hình");
                return;
            }
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                formData.append("files", file);
            }
            axios.put(`http://localhost:5000/product/upload-image-product/${pid}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(result => {
                    alert(result.data.msg)
                    onClose();
                })
                .catch(err => {
                    alert(err)
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
            axios.put(`http://localhost:5000/product/update-product/${pid}`, pimage, { withCredentials: true })
                .then(result => {
                    alert(result.data.msg);
                    onClose();
                })
                .catch(err => {
                    alert(err);
                })
        }
    }
    return (
        <div className="image-upload-modal">
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