import { useTranslation } from 'react-i18next'

export default function ManagerQuestion() {
  const { t } = useTranslation()

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex justify-center items-center h-[20vh]'>
        <div className='flex flex-col items-center gap-4 font-medium'>
          <p>{t('Question1')}</p>
          <p>{t('Question2')}</p>
          <p>cs.tyc.market@gmail.com</p>
        </div>
        <>
          {/* <div>
        <TableAdmin
          columns={columnsTable}
          dataSource={consultations}
          rowClassName={(record, index) => {
            return record.unSeen ? 'row-unseen' : ''
          }}
          // loading={loadingGetAllPrd}
          // pagination={false}
          // onChange={handleTableChange}
        />

        <Modal
          closeIcon={
            <CloseOutlined
              style={{
                fontSize: 16,
              }}
              onClick={closePopup}
            />
          }
          centered
          width={'50rem'}
          title={<p>{t('participationHistory')}</p>}
          footer={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: 8 }}>{suffix}</span>
              <div
                className='w-full p-1'
                style={
                  previewImage && previewImage.length > 0 ? { border: '1px solid #d9d9d9', borderRadius: '10px' } : {}
                }
              >
                <Row>
                  {previewImage &&
                    previewImage.map((prevImage, index) => (
                      <Col span={3} className='mb-2' key={index}>
                        <div className='image-full'>
                          <Image
                            preview={false}
                            style={{ borderRadius: '10px' }}
                            src={prevImage}
                            alt={`upload-image-${index}`}
                            width={50}
                            height={50}
                          />
                        </div>
                        <div
                          className='action text-center cursor-pointer'
                          style={{
                            width: '15px',
                            height: '15px',
                            position: 'absolute',
                            top: '3px',
                            right: '6px',
                          }}
                        >
                          <img src={iconDelete} alt='' onClick={() => revmoveImage(index)} />
                        </div>
                      </Col>
                    ))}
                  {messageEdit && messageEdit.content && (
                    <div className='w-full flex mb-2'>
                      <Col span={12} className='text-left'>
                        <span className='text-[#6E89E7] font-bold'>{t('editMessage')}</span>
                      </Col>
                      <Col span={12} className='text-right'>
                        <CloseOutlined
                          className='text-[#8C8C8C]'
                          style={{
                            fontSize: 14,
                          }}
                          onClick={cancelEditMessage}
                        />
                      </Col>
                    </div>
                  )}
                </Row>
                <TextArea
                  className={previewImage && previewImage.length > 0 ? 'area-border' : ''}
                  placeholder='입력하다'
                  autoSize={{ minRows: 1, maxRows: 3 }}
                  style={{ flex: 1 }}
                  value={message.msg}
                  onChange={(e) => setMessage({ ...message, msg: e.target.value })}
                />
              </div>
              <Button
                className='hover-button-qa'
                disabled={previewImage && previewImage.length == 0 && message?.msg.length == 0}
                style={{ marginLeft: 8, backgroundColor: '#E9D2A9', fontSize: '14px', fontWeight: 600 }}
                onClick={messageEdit && messageEdit.content ? editMessageWhenReply : replyMessage}
              >
                {t('letGo')}
              </Button>
            </div>
          }
          loading={loading}
          open={open}
          onCancel={() => setOpen(false)}
        >
          <div
            className={window.innerWidth <= 768 ? 'content-chat pt-4 pb-2' : 'content-chat pt-4 pl-8 pr-8 pb-2'}
            style={{ maxHeight: '500px', overflow: 'auto' }}
          >
            {consultationDetails.messages &&
              consultationDetails?.messages.map((mes, index) => (
                <div className='w-full message-chat mt-2' key={index}>
                  {userInfo?.id !== mes.senderId ? (
                    <Row className='mt-2'>
                      <Col span={2} className='text-left' style={{ minWidth: '40px' }}>
                        <Avatar
                          src={`${c.DOMAIN_IMG}${consultationDetails?.urlImageRecipient}`}
                          icon={!consultationDetails?.urlImageRecipient && <UserOutlined />}
                        />
                      </Col>
                      <Col
                        style={{ backgroundColor: '#F8F8F8', borderRadius: '10px', maxWidth: '70%' }}
                        className='p-2 pl-4 mb-2 mr-auto'
                      >
                        <div className='w-full time-line' style={{ color: '#AFAEAE', fontSize: '12px' }}>
                          {moment(mes.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                        <div className='content' style={{ fontSize: '14px', color: '#3B3B3B' }}>
                          <div
                            style={{ whiteSpace: 'pre-line' }}
                            dangerouslySetInnerHTML={{ __html: mes?.content }}
                          ></div>
                          <Row className='mt-1 text-right'>
                            <Image.PreviewGroup>
                              {mes?.consultationImages.map((img, indexImage) =>
                                indexImage <= 3 ? (
                                  <Col span={6} key={indexImage} style={{ maxWidth: '70px' }}>
                                    <Image
                                      className='p-1'
                                      width={70}
                                      height={70}
                                      style={{ borderRadius: '10px', width: '100%' }}
                                      src={`${c.DOMAIN_IMG}${img?.imageUrl}`}
                                      alt={`message-image-${indexImage}}`}
                                    />
                                  </Col>
                                ) : (
                                  <Col span={6} key={indexImage} className='p-1 flex' style={{ maxWidth: '70px' }}>
                                    {indexImage == 4 && (
                                      <div className='w-full'>
                                        <Image
                                          current={indexImage}
                                          style={{ borderRadius: '10px', width: '100%', opacity: 0.6 }}
                                          src={`${c.DOMAIN_IMG}${img?.imageUrl}`}
                                          alt={`message-image-${indexImage}}`}
                                        />
                                        <div
                                          className='image-count text-white'
                                          style={{
                                            position: 'absolute',
                                            top: '30%',
                                            left: '30%',
                                            fontSize: '14px',
                                            fontWeight: 700,
                                          }}
                                        >
                                          +{indexImage}
                                        </div>
                                      </div>
                                    )}
                                  </Col>
                                ),
                              )}
                            </Image.PreviewGroup>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <Row
                      className='mb-2'
                      onMouseOver={() => handleMouseOver(mes)}
                      onMouseOut={() => handleMouseOut(mes)}
                    >
                      {mes.isEdit && (
                        <EditOutlined
                          className='ml-auto mr-3 cursor-pointer'
                          style={{
                            fontSize: 14,
                            alignItems: 'end',
                            marginBottom: '10px',
                          }}
                          onClick={() => editMessage(mes)}
                        />
                      )}
                      <Col
                        style={{ backgroundColor: '#F7F7F1', borderRadius: '10px', maxWidth: '70%' }}
                        className={!mes.isEdit ? 'p-2 pl-4 mb-2 text-left ml-auto' : 'p-2 pl-4 mb-2 text-left'}
                      >
                        <div className='w-full time-line text-right' style={{ color: '#AFAEAE', fontSize: '12px' }}>
                          {moment(mes.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                        <div className='content' style={{ fontSize: '14px', color: '#3B3B3B' }}>
                          <div
                            style={{ whiteSpace: 'pre-line' }}
                            dangerouslySetInnerHTML={{ __html: mes?.content }}
                          ></div>
                          <Row className='mt-1 text-right'>
                            <Image.PreviewGroup>
                              {mes?.consultationImages.map((img, indexImage) =>
                                indexImage <= 3 ? (
                                  <Col span={6} key={indexImage} style={{ maxWidth: '70px', marginLeft: 'auto' }}>
                                    <Image
                                      className='p-1'
                                      width={70}
                                      height={70}
                                      style={{ borderRadius: '10px', width: '100%' }}
                                      src={`${c.DOMAIN_IMG}${img?.imageUrl}`}
                                      alt={`message-image-${indexImage}}`}
                                    />
                                  </Col>
                                ) : (
                                  <Col
                                    span={6}
                                    key={indexImage}
                                    className='p-1 flex'
                                    style={{ maxWidth: '70px', marginLeft: 'auto' }}
                                  >
                                    {indexImage == 4 && (
                                      <div className='w-full'>
                                        <Image
                                          current={indexImage}
                                          style={{ borderRadius: '10px', width: '100%', opacity: 0.6 }}
                                          src={`${c.DOMAIN_IMG}${img?.imageUrl}`}
                                          alt={`message-image-${indexImage}}`}
                                        />
                                        <div
                                          className='image-count text-white'
                                          style={{
                                            position: 'absolute',
                                            top: '30%',
                                            left: '30%',
                                            fontSize: '14px',
                                            fontWeight: 700,
                                          }}
                                        >
                                          +{indexImage - 3}
                                        </div>
                                      </div>
                                    )}
                                  </Col>
                                ),
                              )}
                            </Image.PreviewGroup>
                          </Row>
                        </div>
                      </Col>
                      <Col span={2} className='text-right' style={{ minWidth: '40px' }}>
                        <Avatar
                          src={`${c.DOMAIN_IMG}${consultationDetails?.urlImageSender}`}
                          icon={!consultationDetails?.urlImageSender && <UserOutlined />}
                        />
                      </Col>
                    </Row>
                  )}
                </div>
              ))}
          </div>
        </Modal>

        <Modal open={openModal} confirmLoading={confirmLoading} onCancel={handleCancel} footer={false} centered>
          <div>
            <div className='font-semibold text-textPrd flex flex-col justify-center items-center mt-4 gap-2'>
              <div>{t('loginText2')}</div>
            </div>
          </div>

          <div className='flex items-center justify-center gap-6 mt-8'>
            <div>
              <button
                className='font-semibold text-normal h-11 min-w-36 rounded-lg'
                style={{ border: '2px solid black' }}
                onClick={handleCancel}
              >
                {t('btnCancel')}
              </button>
            </div>
            <div>
              <button
                className='text-white bg-[#D1B584] font-semibold text-normal h-11 min-w-36 rounded-lg'
                onClick={handleOk}
              >
                {t('loginBtn')}
              </button>
            </div>
          </div>
        </Modal>
      </div> */}
        </>
      </div>
    </div>
  )
}
