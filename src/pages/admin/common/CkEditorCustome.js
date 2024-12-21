import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Form } from 'antd'

const CkEditorCustome = (props) => {
  //   function uploadAdapter(loader) {
  //     return {
  //       upload: () => {
  //         return new Promise(async (resolve, reject) => {
  //           try {
  //             const file = await loader.file;
  //             const storageRef = ref(storage, `dental-america/${file.name}`);
  //             const uploadTask = uploadBytes(storageRef, file);
  //             uploadTask
  //               .then(() => {
  //                 return getDownloadURL(storageRef);
  //               })
  //               .then((images) => {
  //                 resolve({
  //                   default: images,
  //                 });
  //               });
  //           } catch (error) {
  //             reject("Hello");
  //           }
  //         });
  //       },
  //       abort: () => {},
  //     };
  //   }

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return uploadAdapter(loader)
    }
  }
  return (
    <Form.Item
      label={props?.label || 'Nội dung'}
      rules={[
        {
          required: false,
        },
      ]}
    >
      <CKEditor
        config={{
          extraPlugins: [uploadPlugin],
        }}
        name='data'
        editor={ClassicEditor}
        data={props?.description}
        onReady={(editor) => console.log('Editor is ready to use!', editor)}
        onChange={(event, editor) => props.setContent(event, editor)}
        onBlur={(editor) => console.log('Blur.', editor)}
        onFocus={(editor) => console.log('Focus.', editor)}
      />
    </Form.Item>
  )
}
export default CkEditorCustome
