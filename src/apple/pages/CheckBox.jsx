import React from 'react'

export const CheckBox = React.forwardRef(({indeterminate, ...rest}, ref) => {

    const defaultRef = React.useRef()
    const resolveRef = ref || defaultRef;

    React.useEffect(( ) => {
        resolveRef.current.indeterminate = indeterminate
    }, [resolveRef, indeterminate]);

  return (
    <>
        <input type="checkbox" ref = {resolveRef} {...rest} />
    </>
  )
}
)