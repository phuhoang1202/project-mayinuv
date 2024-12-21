import React from 'react'
import IconKakaotalk2 from '@assets/images/IconKakaotalk2.svg'
import DefaultAvatar from '@assets/images/DefaultAvatar.svg'
import IconError from '@assets/images/IconError.svg'

export default function Logout() {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='lg:w-[624px] w-full mt-6'>
        <div className='flex items-center justify-between pb-2' style={{ borderBottom: '1px solid #EFEFEF' }}>
          <div className='flex items-center gap-3'>
            <div>
              <img src={DefaultAvatar} alt='avatar' />
            </div>
            <div>
              <div>진선미</div>
              <div>회원등급</div>
            </div>
          </div>

          <div>
            <img src={IconKakaotalk2} alt='icon' />
          </div>
        </div>

        <div className='flex items-start gap-2 mt-4'>
          <div>
            <img src={IconError} alt='icon' />
          </div>
          <div className='text-[#F14646] font-medium text-small'>
            회원탈퇴시 서비스 이용 혜택을 누릴 수 없습니다. 회원탈퇴시 보유하고 있는 혜택은 모두 사라집니다. 사라진
            정보와 혜택은 재가입해도 복구되지 않습니다.
          </div>
        </div>

        <div className='mt-8 flex flex-col gap-4 text-normal font-medium'>
          <h3 className='font-bold text-textPrd text-[#3B3B3B]'>탈퇴 사유 (중복 체크 가능)</h3>

          <div className='flex items-center gap-2'>
            <div>
              <input type='radio' />
            </div>
            <div>원하는 상품이 부족해서</div>
          </div>

          <div className='flex items-center gap-2'>
            <div>
              <input type='radio' />
            </div>
            <div>상품 업데이트가 안되어서</div>
          </div>

          <div className='flex items-center gap-2'>
            <div>
              <input type='radio' />
            </div>
            <div>서비스 속도가 느려서</div>
          </div>

          <div className='flex items-center gap-2'>
            <div>
              <input type='radio' />
            </div>
            <div>접속불량이 싫어서</div>
          </div>

          <div className='flex items-center gap-2'>
            <div>
              <input type='radio' />
            </div>
            <div>아이디를 변경하기 위해서</div>
          </div>

          <div className='flex items-center gap-2'>
            <div>
              <input type='radio' />
            </div>
            <div>이용방법이 어려워서</div>
          </div>

          <div className='flex items-center gap-2'>
            <div>
              <input type='radio' />
            </div>
            <div>불친절하므로</div>
          </div>

          <div>
            <div>다른</div>
            <textarea
              placeholder='탈퇴 사유를 기재해주세요. (50자)'
              className='p-3 rounded-lg w-full mt-1 min-h-20'
              style={{ border: '1px solid #D3D2D2' }}
            ></textarea>
          </div>

          <div className='mt-8'>
            <p className='text-[#6E89E7]'>전달하신 의견으로 더 좋은 서비스로 거듭나겠습니다.</p>
          </div>

          <div className='mt-12 flex items-center justify-between '>
            <div>
              <button className='bg-[#D1B584] text-white font-semibold text-normal flex justify-center items-center w-[405px] h-11 rounded-lg'>
                다시 서비스 이용하기
              </button>
            </div>
            <div>
              <button
                className='font-medium text-normal flex justify-center items-center w-[187px] h-11 rounded-lg'
                style={{ border: '2px solid black' }}
              >
                탈퇴하기
              </button>
            </div>
          </div>

          <div className='flex items-start gap-2 mt-6'>
            <div>
              <img src={IconError} alt='icon' />
            </div>
            <div className='text-[#F14646] font-medium text-small'>
              상품 배송중이거나 입금 이슈가 있을 경우 회원탈퇴가 불가능합니다
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
