import type { CustomKeywordProps } from 'lib'

export const keyword: CustomKeywordProps = {
  name: 'test',
  definition: {
    macro: () => {
      return {
        minLength: 10,
      }
    },
  },
  transformSchema(schema) {
    return {
      ...schema,
      minLength: 10,
    }
  },
}
