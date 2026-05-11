import request from '@/utils/request'

export const getPic = () => {
  return request.get('/captcha/image')
}

export const getSmsCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

export const loginReq = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  }, {
    headers: {
      platform: 'H5'
    }
  }
  )
}
