import React from 'react'
import { Link } from 'react-router-dom'

const PrimaryButton = ({
  to,
  href,
  disabled = false,
  large = false,
  small = false,
  primary = false,
  outline = false,
  text = false,
  black = false,
  rounded = false,
  leftIcon: LeftIcon,
  rightIcon = null,
  leftIconClassName = '',
  rightIconClassName = '',
  onClick,
  children,
  simple,
  ...passprops
}) => {
  let Comp = 'button'
  const props = {
    onClick,
    ...passprops,
  }

  // Remove event listeners if the button is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key]
      }
    })
  }

  if (to) {
    props.to = to
    Comp = Link
  } else if (href) {
    props.href = href
    Comp = 'a'
  }

  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium focus:outline-none'

  // Size classes
  const sizeClasses = large ? 'py-3 px-6 text-lg' : small ? 'py-1 px-3 text-sm' : 'py-2 px-4 text-base'

  // Variant classes
  let variantClasses = ''
  if (primary) {
    variantClasses = 'bg-red-500 text-white'
  } else if (outline) {
    variantClasses = 'border border-red-500 text-red-500'
  } else if (text) {
    variantClasses = 'bg-[#999999] text-red-500'
  } else if (black) {
    variantClasses = 'bg-[#333333] text-white'
  } else {
    variantClasses = 'bg-[#999999] text-white'
  }

  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

  // Shape classes
  const shapeClasses = rounded ? 'rounded-full' : ''

  // Combined classes
  const classes = `${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${shapeClasses}`

  return (
    <Comp className={classes} {...props}>
      {LeftIcon && (
        <span className={`mr-2 ${leftIconClassName}`}>
          <LeftIcon />
        </span>
      )}
      <span className='title'>{children}</span>
      {rightIcon && <span className={`ml-2 ${rightIconClassName}`}>{rightIcon}</span>}
    </Comp>
  )
}

export default PrimaryButton
