import './styles.css';

import { useRef, useState } from 'react';

export default function UploadPhotoPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const isImageFile = (file: File) => file.type.startsWith('image/');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setErrorMessage('');
      setPreviewImage(null);

      const file = e.target.files?.[0];

      if (!file) {
        throw new Error('找不到圖片檔案');
      }

      // 驗證檔案類型
      if (!isImageFile(file)) {
        throw new Error('檔案類型錯誤');
      }

      // 解析檔案 Base64
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // TODO: 上傳圖片
      //
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Unknown error');
      }
    }
  };

  return (
    <div className="container-upload-photo">
      <div className="file-preview-box">
        {previewImage ? (
          <img className="preview-image" src={previewImage} alt="preview" />
        ) : (
          <span className="placeholder-text">未選擇圖片</span>
        )}
      </div>
      <div className="action-box">
        <input ref={inputRef} type="file" className="input-file" onChange={handleFileChange} />
        <button className="button-upload" onClick={handleUpload}>
          上傳圖片
        </button>
        {!!errorMessage && <span className="error-message">{errorMessage}</span>}
      </div>
    </div>
  );
}
