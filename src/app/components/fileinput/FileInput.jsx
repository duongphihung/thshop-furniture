'use client'
import './index.css'
import React, { useState } from "react";
import ShortUniqueId from 'short-unique-id';
import { imageDB } from "@/app/lib/firebase";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';


const FileInput = ({ setImagesURL, imagesUrl, linkFolderUpload = "products", multipleUpload = true }) => {
    const [selectedfile, SetSelectedFile] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    const createUniqueFileName = (type, file) => {
        const timeStamp = Date.now();
        return `${type}/${randomUUID()}-${timeStamp}-${file.name}`;
    };

    const helperForUPloadingImageToFirebase = async (file, fileName) => {
        try {
            const imgRef = ref(imageDB, fileName);
            const uploadImage = uploadBytesResumable(imgRef, file);

            return new Promise((resolve, reject) => {
                uploadImage.on(
                    "state_changed",
                    (snapshot) => { },
                    (error) => {
                        console.log(error);
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadImage.snapshot.ref)
                            .then((downloadUrl) => resolve(downloadUrl))
                            .catch((error) => reject(error));
                    }
                );
            });

        } catch (error) {
            console.error("Error during file upload", error);
        }
    }

    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const filesizes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const InputChange = async (e) => {
        // --For Multiple File Input
        for (let i = 0; i < e.target.files.length; i++) {
            let reader = new FileReader();
            let file = e.target.files[i];
            const fileName = createUniqueFileName(`uploads/${linkFolderUpload}`, file);
            if (e.target.files[i]) {
                const extractImageUrl = await helperForUPloadingImageToFirebase(file, fileName);
                console.log(extractImageUrl);
                setImagesURL((preValue) => {
                    return [
                        ...preValue,
                        extractImageUrl
                    ];
                });
            }

            reader.onloadend = () => {
                SetSelectedFile((preValue) => {
                    return [
                        ...preValue,
                        {
                            id: randomUUID(),
                            filename: e.target.files[i].name,
                            nameupload: fileName,
                            filetype: e.target.files[i].type,
                            fileimage: reader.result,
                            datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN').toUpperCase(),
                            filesize: filesizes(e.target.files[i].size),
                        }
                    ]
                });
            }
            if (e.target.files[i]) {
                reader.readAsDataURL(file);
            }
        }
    }

    const DeleteSelectFile = (id) => {
        const result = selectedfile.filter((data, index) => {
            if (data.id === id) {
                console.log(data.id, id);
                const desertRef = ref(imageDB, data.nameupload);
                deleteObject(desertRef).then(() => {
                    console.log("Delete successfully!");
                }).catch((error) => {
                    console.log("Delete error", error);
                });
                const image = imagesUrl.filter((data, i) => {
                    return i !== index;
                })
                setImagesURL(image);
            }
            return data.id !== id;
        });
        SetSelectedFile(result);
    }

    return (
        <div className="card mt-5">
            <div className="card-body">
                <div className="kb-data-box">
                    <div className="kb-file-upload">
                        <div className="file-upload-box">
                            <input type="file" id="fileupload" accept="image/*" className="file-upload-input" onChange={InputChange} multiple={multipleUpload} />
                            <span>Drag and drop or <span className="file-link">Choose your files</span></span>
                        </div>
                    </div>
                    <div className="kb-attach-box mb-3">
                        {
                            selectedfile.map((data, index) => {
                                const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                return (
                                    <div className="file-atc-box" key={id}>
                                        {
                                            filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                <div className="file-image"><i className="far fa-file-alt"></i></div>
                                        }
                                        <div className="file-detail">
                                            <h6>{filename}</h6>
                                            <p></p>
                                            <p><span>Size : {filesize}</span>, <span className="ml-2">Modified Time: {datetime}</span></p>
                                            <div className="file-actions">
                                                <button type="button" className="file-action-btn" onClick={() => DeleteSelectFile(id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileInput;