import React, { useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';

const FileUploadWall = ({ fileList, setFileList, formData, setFormData, defaultValue }) => {
  useEffect(() => {
    if (defaultValue && !fileList.length) {
      const formatted = [{
        uid: '1',
        name: defaultValue.name || defaultValue.url?.split('/').pop(),
        status: 'done',
        url: defaultValue.url,
      }];
      setFileList(formatted);
      setFormData(prev => ({ ...prev, file: formatted[0] }));
    }
  }, [defaultValue]);

  const updateFormDataFile = (file) => {
    if (file.originFileObj instanceof File) {
      const newFile = new File([file.originFileObj], file.name, {
        type: file.originFileObj.type,
      });
      setFormData(prev => ({ ...prev, file: newFile }));
    } else {
      setFormData(prev => ({ ...prev, file: { url: file.url } }));
    }
  };

  const beforeUpload = (file) => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ];
    if (!allowedTypes.includes(file.type)) {
      message.error('Format file harus xlsx, xls, atau csv');
      return false;
    }

    const newItem = {
      uid: file.uid,
      name: file.name,
      status: 'done',
      originFileObj: file,
    };

    setFileList([newItem]); // hanya 1 file
    updateFormDataFile(newItem);
    return false; // prevent upload
  };

  const handleRemove = () => {
    setFileList([]);
    setFormData(prev => ({ ...prev, file: null }));
  };

  return (
    <Upload
      fileList={fileList}
      beforeUpload={beforeUpload}
      onRemove={handleRemove}
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Upload File</Button>
    </Upload>
  );
};

export default FileUploadWall;
