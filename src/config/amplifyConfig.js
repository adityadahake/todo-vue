export const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AMPLIFY_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_AMPLIFY_USER_POOL_CLIENT_ID,
      identityPoolId: import.meta.env.VITE_AMPLIFY_IDENTITY_POOL_ID,
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code',
      userAttributes: {
        email: {
          required: true,
        },
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
}
