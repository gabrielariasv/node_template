import Router from 'koa-router'
import getHealth from './health/health'
import promotion from './ecommerce/ecommerce'

const router = new Router()

router.get('/health', getHealth)

router.post('/api/get-promotions', promotion.checkcart)

export default router
