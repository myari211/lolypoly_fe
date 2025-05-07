import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Modal, Image, Checkbox } from 'antd';

const ImageUploadWall = ({ fileList, setFileList, formData, setFormData, defaultValue }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => setPreviewImage(reader.result);
    } else {
      setPreviewImage(file.url || file.thumbUrl);
    }
    setPreviewVisible(true);
  };

  const updateFormDataImages = (files) => {
    const uploadedFiles = files
      .filter(file => file.originFileObj instanceof File)
      .map(file => {
        const fileWithShow = new File([file.originFileObj], file.originFileObj.name, {
          type: file.originFileObj.type,
        });
        fileWithShow.show = file.show || 0;
        return fileWithShow;
      });

    setFormData(prev => ({
      ...prev,
      image: uploadedFiles,
    }));
  };

  const handleChange = ({ fileList: newFileList }) => {
    const cleanedList = newFileList.map(file => ({
      ...file,
      show: file.show || 0,
    }));

    setFileList(cleanedList);
    updateFormDataImages(cleanedList);
  };

  const handleCheckboxChange = (uid, checked) => {
    const updated = fileList.map(file => ({
      ...file,
      show: file.uid === uid ? (checked ? 1 : 0) : 0,
    }));

    setFileList(updated);
    updateFormDataImages(updated);
  };

  const isAnyChecked = fileList.some(file => file.show === 1);

  const beforeUpload = (file) => {
    const newItem = {
      uid: file.uid,
      name: file.name,
      status: 'done',
      originFileObj: file,
      show: 0,
    };
    const updatedList = [...fileList, newItem];
    handleChange({ fileList: updatedList });
    return false; // Prevent default upload
  };

  return (
    <>
      <Upload
        listType="picture"
        fileList={fileList}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        itemRender={(originNode, file) => {
          const isChecked = file.show === 1;
          const isDisabled = !isChecked && isAnyChecked;

          return (
            <div style={{ position: 'relative' }}>
              {originNode}
              <div style={{ textAlign: 'center', marginTop: 4 }}>
                <Checkbox
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={(e) => handleCheckboxChange(file.uid, e.target.checked)}
                >
                  Show
                </Checkbox>
              </div>
            </div>
          );
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <Image alt="preview" src={previewImage} style={{ width: '100%' }} />
      </Modal>
    </>
  );
};

export default ImageUploadWall;
