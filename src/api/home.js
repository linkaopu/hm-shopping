import request from '@/utils/request'

export const getHomeDataReq = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
