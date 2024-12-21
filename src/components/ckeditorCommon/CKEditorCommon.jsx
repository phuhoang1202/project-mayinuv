import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

class MyUploadAdapter {
  constructor(loader, saveTemporaryUpload) {
    this.loader = loader
    this.saveTemporaryUpload = saveTemporaryUpload
  }

  upload() {
    return this.loader.file.then((file) => {
      const fileReader = new FileReader()

      return new Promise((resolve, reject) => {
        fileReader.onload = () => {
          // Lưu file dưới dạng blob vào bộ nhớ tạm thời
          this.saveTemporaryUpload({
            file,
            url: fileReader.result,
          })
          resolve({ default: fileReader.result })
        }
        fileReader.onerror = (error) => reject(error)
        fileReader.readAsDataURL(file)
      })
    })
  }

  abort() {
    // Xử lý khi upload bị hủy nếu cần
  }
}

const CKEditorCommon = () => {
  const [editorData, setEditorData] = useState()
  const [temporaryUploads, setTemporaryUploads] = useState([])

  // Lưu trữ upload tạm thời
  function saveTemporaryUpload(upload) {
    setTemporaryUploads((prev) => [...prev, upload])
  }

  // Plugin CKEditor cho upload
  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader, saveTemporaryUpload)
    }
  }
  const setDataEditorData = (prevData, url) => {
    // Regex base64
    const base64Pattern = /src="data:image\/[a-zA-Z]+;base64,[^"]+"/g

    // Replace base64 images with your desired image URL
    return prevData.replace(base64Pattern, (match) => {
      return match.replace(/data:image\/[a-zA-Z]+;base64,[^"]+/, url)
    })
  }
  // Xử lý submit form
  function handleSubmit() {
    let contentCopy = ''
    const uploadPromises = temporaryUploads.map((upload) => {
      const formData = new FormData()
      formData.append('upload', upload.file)
      contentCopy = setDataEditorData(
        editorData,
        'https://www.pngitem.com/pimgs/m/249-2492291_banner-image-24-hours-ambulance-service-png-transparent.png',
      )
      // return fetch('/upload-endpoint', {
      //   method: 'POST',
      //   body: formData,
      // })
      //   .then((response) => {
      //     if (!response.ok) throw new Error('Upload failed');
      //     return response.json();
      //   })
      //   .then((data) => {
      //     // Thay thế URL blob bằng URL thực
      //     setEditorData((prevData) =>
      //       prevData.replace(upload.url, data.url)
      //     );
      //   });
    })

    // Xử lý submit với dữ liệu cuối cùng
    Promise.all(uploadPromises)
      .then(() => {
        console.log('replace src: ', contentCopy)
        const payload = { content: editorData }
        return fetch('/submit-endpoint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      })
      .then(() => {
        console.log('Form submitted successfully')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={{
          extraPlugins: [CustomUploadAdapterPlugin],
        }}
        data={editorData}
        onChange={(event, editor) => {
          setEditorData(editor.getData())
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default CKEditorCommon
