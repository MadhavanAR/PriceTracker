import { Button } from '@nextui-org/button'
import { Spinner } from '@nextui-org/react'
import React from 'react'

const FormSubmitButton = ({children, isLoading}) => {
  return (
    <Button
        type="submit"
        className="mt-3"
        color="primary"
        disabled={isLoading}
      >
        {isLoading ? <Spinner/> :children}
      </Button>
  )
}

export default FormSubmitButton