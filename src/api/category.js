import request from '@/utils/request'

export const getCategoryDataReq = () => {
  return request.get('/category/list')
}
