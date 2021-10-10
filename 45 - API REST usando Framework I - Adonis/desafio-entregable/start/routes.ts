/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'Bienvenid@ al server de Adonis JS. Sabías que Adonis era un dios griego extremadamente bello que murió muy joven?' }
})

Route.get('/products', 'ProductsController.index')

Route.post('/products/save', 'ProductsController.save')

Route.get('/products/:id', 'ProductsController.getById')

Route.delete('/products/delete/:id', 'ProductsController.delete')

Route.put('/products/update/:id', 'ProductsController.update')
