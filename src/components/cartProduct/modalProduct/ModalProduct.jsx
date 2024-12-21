import React from 'react'
import IconClose from '@assets/images/IconClose.svg'

export default function ModalProduct({ cartData, productAttribute, setOpenModalIndex }) {
  const handleCloseModal = () => {
    setOpenModalIndex(null)
  }

  // Get the product's attribute models and the selected product's attributes
  const selectedItem = cartData.find((item) => item.id === productAttribute.cartItemId)
  const selectedAttributes = productAttribute.productSku.attributes || []

  return (
    <div
      className='absolute top-5 bg-white z-50 px-10 py-6 w-[559px] rounded-lg'
      style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
    >
      <button onClick={handleCloseModal} className='absolute top-2 right-2'>
        <img src={IconClose} alt='icon' />
      </button>
      {selectedItem && selectedItem.product?.productAttributeModels ? (
        selectedItem.product.productAttributeModels.map((modal, indexModal) => {
          return (
            <div key={indexModal}>
              <div className='text-[#3B3B3B] text-normal font-bold'>{modal.type}</div>
              <div className='flex gap-4 items-center'>
                {modal.modelList.map((e, i) => {
                  // Check if the attribute of the current type is present in the selected product's attributes
                  const isAttributeActive = selectedAttributes.some(
                    (attr) => attr.id === e.id && attr.type === modal.type,
                  )

                  return (
                    <div key={i}>
                      <div className='mt-6 relative'>
                        <div
                          className='h-11 w-[89px] rounded-lg flex justify-center items-center'
                          style={{
                            border: '1px solid #D3D2D2',
                            backgroundColor: isAttributeActive ? '#3B3B3B' : '#FFF', // Active background color
                            color: isAttributeActive ? '#FFF' : '#3B3B3B', // Active text color
                            cursor: isAttributeActive ? 'not-allowed' : 'pointer', // Disable cursor if active
                          }}
                        >
                          {e.attributeName}
                        </div>

                        {indexModal === 0 && isAttributeActive && (
                          <div className='font-medium text-min bg-[#3B3B3B] min-w-20 text-white rounded-full h-5 absolute -top-6 right-0 flex justify-center items-center px-2'>
                            {productAttribute.quantityOrder}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })
      ) : (
        <div className='flex justify-center items-center text-bigPrdName font-bold'>Trống</div>
      )}
    </div>
  )
}
