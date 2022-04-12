export interface ValidationErrors {
  error: {
    code: number
    fields: {
      field: string
      errors: {
        code: number
        msg?: string
      }[]
    }[]
    status: string
  }
}

export function isValidationError(statusCode: number, error?: ValidationErrors): boolean {
  return statusCode === 400 && !!error?.error.code
}

export type ErrorObject = Partial<{ [key: string]: string[] }>

export function parseValidationErrors({ error }: ValidationErrors): ErrorObject {
  const parsed_errors: ErrorObject = {}

  error.fields.forEach((field) => {
    field.errors.forEach((error) => {
      if (!error.msg) return

      if (parsed_errors[field.field]) {
        parsed_errors[field.field]?.push(error.msg)
      } else {
        parsed_errors[field.field] = [error.msg]
      }
    })
  })

  return parsed_errors
}
