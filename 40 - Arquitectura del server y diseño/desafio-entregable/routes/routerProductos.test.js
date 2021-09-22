const url = "http://localhost:8081"
const request = require('supertest')(url);
const chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = require('chai').expect;
const faker = require('faker');
const passport = require('passport');

describe('Get All', () => {
    it('Should return all products', async () => {
        let response = await request.get('/api/productos/listar');
        expect(response.status).to.eql(200);
        expect(response.body).to.not.undefined;
    })
})

describe('Get 1 product by ID', () => {
    it('Should return 1 product by ID', async () => {
        let response = await request.get('/api/productos/listar/2');

        expect(response.status).to.eql(200);
        expect(response.body).to.not.undefined;
        expect(response.body.id).to.eql(2);
        expect(response.body).to.have.all.keys('title', 'price', 'thumbnail', 'id')
    })
})

describe('Post 1 product', () => {
    it('Should post a product to database', (done) => {

        let title = faker.commerce.productName();
        let price = faker.commerce.price();
        let thumbnail = faker.image.food();
        let product = { title, price, thumbnail };
        chai.request(url)
            .post('/api/productos/guardar')
            .send(product)
            .end((error, response) => {
                expect(response.status).to.be.eql(200);
                expect(error).to.be.null;
                done();
            })

    })
})

describe('Delete 1 product by ID', () => {
    it("Should delete 1 product from database by its ID", async () => {
        const response = await request.delete('/api/productos/borrar/19');
        expect(response.status).to.be.eql(200);
        response.body === 1 ? console.log("Producto con id 19 borrado"): console.log("No existe producto con ese id");
    })
})

describe('Update 1 product by ID', () => {
    it("Should update 1 product by ID", async () => {
        let title = faker.commerce.productName();
        let price = faker.commerce.price();
        let thumbnail = faker.image.food();
        let product = { title, price, thumbnail };
        const response = await request.put('/api/productos/actualizar/20').send(product);
        console.log(response.body);
        expect(response.status).to.be.eql(200);
    })
})